import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleModals } from "store/actions";
import { getAllProfession } from "store/actions/growth";
import { showMessageNotification } from "utils";

const ExploreMoreModal = ({ selectProfessionFunction, selectedProfession }) => {
  const [allProfessions, setAllProfessions] = useState([]);
  const [searchTxt, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    element: {},
    elementId: selectedProfession?.value || "",
    label: selectedProfession?.label || "",
  });

  const dispatch = useDispatch();

  useEffect(async () => {
    const result = await getAllProfession(searchTxt);
    setAllProfessions(result);
  }, [searchTxt]);

  const handleChange = (element, value, elementId) => {
    setSelectedValue({
      element,
      label: value,
      elementId,
    });
  };

  return (
    <>
      <Modal.Body className="p-4">
        <div className="common-searchbar">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder="Search profession by title..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
        {allProfessions.map((element, index) => {
          if (element?.list?.length > 0) {
            return (
              <div className="mt-4 all-professions" key={index}>
                <ul className="list-unstyled">
                  {element?.list?.map((item, i) => (
                    <li
                      key={i}
                      className={
                        parseInt(selectedValue?.elementId) === item.id &&
                        "active"
                      }
                    >
                      <Form.Check
                        type="radio"
                        id={item.id}
                        label={item?.name}
                        onClick={(e) =>
                          handleChange(element, e.target.value, e.target.id)
                        }
                        name="profession"
                        value={item?.name}
                        checked={parseInt(selectedValue?.elementId) === item.id}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
      </Modal.Body>
      <Modal.Footer className="border-geyser border-top d-flex modal-footer">
        <Button
          variant="outline-dark"
          onClick={() =>
            dispatch(toggleModals({ exploremoreprofessions: false }))
          }
          className="font-weight-semibold ml-auto"
        >
          Cancel
        </Button>
        <Button
          variant="info"
          onClick={() => {
            if (Object.keys(selectedValue?.element).length > 0) {
              selectProfessionFunction(
                {
                  label: selectedValue?.element?.professionFieldName,
                  value: selectedValue?.element?.parent_id,
                },
                selectedValue?.label,
                selectedValue?.elementId
              );
              dispatch(toggleModals({ exploremoreprofessions: false }));
            } else {
              showMessageNotification("Please select a profession");
            }
          }}
          className="font-weight-semibold px-30"
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ExploreMoreModal;
