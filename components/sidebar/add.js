import React, { Fragment } from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Add = () => {
  const [lang] = useTranslation("language");

  return (
    <Fragment>
      {/* Add */}
      <Card className="followed-content-box cursor-pointer">
        <Card.Body className="p-0">
          <div
            style={{
              backgroundImage: `url("../../assets/images/dashboard/add-image.jpg")`,
            }}
            className="add-picture banner-overlay overlay-half-darkblue"
          >
            <div className="p-sidebar-add position-relative z-index-99 text-white text-center add-content">
              <h2 className="text-body-16 text-white mb-4">
                {lang("SIDE_BAR.TITLE")}
              </h2>
              <Button
                variant="primary rounded-pill btn-sm"
                onClick={() => {
                  window.open("/become-bn-room-manager");
                }}
              >
                {lang("SIDE_BAR.YLIWAY_GUIDE")}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default Add;
