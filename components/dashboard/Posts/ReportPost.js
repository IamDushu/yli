import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reportPostData, toggleModals } from "store/actions";
import Image from "next/image";
/******************** 
@purpose :  Report Post 
@Parameter : {}
@Author : YLIWAY
******************/
function ReportPost() {
  const dispatch = useDispatch();
  const { reportPostId } = useSelector((state) => state.post);
  const [reason, setReason] = useState("");

  const submitHandler = () => {
    dispatch(reportPostData({ id: reportPostId, reason }));
    dispatch(toggleModals({ reportpost: false }));
  };
  const reasons = [
    {
      id: 1,
      name: "Bullying",
      contents: ["Bullying ", "Bullying directed at me", "Bullying directed at someone else"],
    },
    {
      id: 2,
      name: "Harassment",
      contents: ["Harassment 1", "Harassment 2"],
    },
    {
      id: 3,
      name: "Hate Speech",
      contents: ["Hate Speech 1"],
    },
    {
      id: 4,
      name: "Violence",
      contents: ["Bullying ", "Bullying directed at me", "Bullying directed at someone else"],
    },
    {
      id: 5,
      name: "Graphic Content",
      contents: ["Harassment 1", "Harassment 2"],
    },
    {
      id: 6,
      name: "Suicide and Self harm",
      contents: ["Hate Speech 1"],
    },
  ];

  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [note, setNote] = useState("");
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [isReasonsVisible, setIsReasonsVisible] = useState(true);

  const handleReasonClick = (reasonId) => {
    setSelectedReason(reasonId);
    setSelectedContent(null);
    setNote("");
    setIsTextAreaVisible(false);
    setIsReasonsVisible(false);
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setIsTextAreaVisible(true);
  };

  const handleBackButtonClick = () => {
    if (isTextAreaVisible) {
      // If the textarea is visible, go back to showing content
      setIsTextAreaVisible(false);
    } else if (selectedContent !== null) {
      // If content is selected, go back to showing reasons
      setSelectedContent(null);
    } else if (selectedReason !== null) {
      // If a reason is selected, go back to showing all reasons
      setIsReasonsVisible(true);
      setSelectedReason(null);
    }
  };
  return (
      <div className="reporting-post">
        <div className="back-button">
          {selectedReason !== null ||
          selectedContent !== null ||
          isTextAreaVisible ? (
            <Image
              width={30}
              height={30}
              src="/assets/images/posts/back.svg"
              onClick={handleBackButtonClick}
              />
          ) : null}
        </div>
        
        <div className="reasons">
        <div className="report-post-header">
              <h5>{selectedReason !== null && !isTextAreaVisible ? 
              (reasons[selectedReason - 1].name): isTextAreaVisible ? "Do you want to add a note in reporting the post":"Select a problem"}</h5>              
              <Image              
              className="report-post-icon"
              width={30}
              height={30}
              src="/assets/images/posts/close.svg"
              onClick={() => {
                dispatch(toggleModals({ reportpost: false }));
                }}
            />
              </div>
              <div style={{borderBottom:"1px solid #000",width:"117%",marginLeft:"-9%"}}></div>
          {isReasonsVisible && (
            <div>          
              <h5 style={{color:"#6750A4", marginTop:"15px"}}>Reasons</h5>
              <ul>
                {reasons.map((reason) => (
                  <>
                  <li
                    key={reason.id}
                    onClick={() => handleReasonClick(reason.id)}
                    className={selectedReason === reason.id ? "active" : ""}
                    style={{display:"flex",justifyContent:"space-between"}}
                  >
                    <span>
                    {reason.name}
                    </span>
                  <svg width="5" height="11" viewBox="0 0 5 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 10.5L5 5.5L0 0.5V10.5Z" fill="#6750A4"/>
</svg>
                  </li>

                  </>
                ))}
              </ul>
            </div>
          )}
          {selectedReason !== null && !isTextAreaVisible && (
            <div>
              <ul>
                {reasons[selectedReason - 1].contents.map((content, index) => (
                  <li
                    key={index}
                    onClick={() => handleContentClick(content)}
                    className={selectedContent === content ? "active" : ""}
                  >
                    {content}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isTextAreaVisible && (
            <div>
              <textarea
                placeholder="Add your note here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    // <Form >
    //   <div className="px-3">
    //     <h3 className="font-20 font-weight-semibold text-secondary mb-3">
    //       Are you report this post?
    //     </h3>
    //     <h5 className="font-14 font-weight-normal text-black">
    //       Reason (Optional)
    //     </h5>

    //     <textarea
    //       className="form-control mb-3"
    //       onChange={(e) => setReason(e.target.value)}
    //     />
    //     </div>
    //     <div className="text-center d-flex justify-content-between border-top-dark px-3 pt-3">
    //       <Button
    //         variant="btn  font-weight-semibold btn-sm text-uppercase py-12 mr-3 btn-dark "
    //         onClick={() => dispatch(toggleModals({ reportpost: false }))}
    //       >
    //         Back
    //       </Button>
    //       <Button
    //         variant="btn btn-info btn-sm font-weight-semibold text-uppercase py-12 ml-3 "
    //         onClick={() => submitHandler()}
    //       >
    //         Submit
    //       </Button>
    //     </div>

    // </Form>
  );
}

export default ReportPost;
