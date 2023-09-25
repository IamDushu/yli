import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "store/actions/faq";
/******************** 
@purpose :  Used For FAQ listing
@Parameter : {}
@Author : INIC
******************/
const Faq = (props) => {
  const dispatch = useDispatch();
  const { faq } = useSelector((state) => state.faqReducer) || {};
  const [roleFaq, setRoleFaq] = useState([]);

  const [body, setBody] = useState({ page: 1, pagesize: 10, cmsType: "user" });

  /******************** 
  @purpose : Get all th FAQ's accoding to role
  @Parameter : {}
  @Author : INIC
******************/
  useEffect(() => {
    dispatch(getFaq(body));
  }, [body]);
  const faqInfoData = () => {
    if (props.role) {
      let faqData = [];
      faq &&
        faq.length > 0 &&
        faq.forEach((element) => {
          if (element.section === props.role) {
            faqData.push(element);
          }
        });
      setRoleFaq(faqData);
    } else {
      setRoleFaq(faq);
    }
  };
  useEffect(() => {
    faqInfoData();
  }, [faq]);
  /******************** 
  @purpose : Infinite Scroll
  @Parameter : {}
  @Author : INIC
******************/
  const fetchMoreFaq = () => {
    setBody({
      ...body,
      pagesize: body.pagesize + 10,
    });
  };
  return (
    <Fragment>
      <InfiniteScroll
        dataLength={
          roleFaq !== "" && roleFaq?.length > 0 ? roleFaq?.length : ""
        }
        next={fetchMoreFaq}
        hasMore={roleFaq?.length != 1000}
      >
        <div className="faq-content-box pb-4">
          <div className="container-fluid p-0">
            <Row>
              {roleFaq &&
                roleFaq.map((faqData) => (
                  <Col md={12} key={faqData.id}>
                    <div>
                      <h5 className="text-body-16">{faqData.questions}</h5>
                      <p
                        className="text-para text-body-14 font-weight-normal"
                        dangerouslySetInnerHTML={{
                          __html: faqData.answers,
                        }}
                      />
                    </div>
                    <hr />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </InfiniteScroll>
    </Fragment>
  );
};

export default Faq;
