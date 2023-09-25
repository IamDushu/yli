import React from "react";
import { Card } from "react-bootstrap";

const GrowthWelcomeSection = () => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-wrap flex-xl-nowrap">
          <div className="rounded-12 overflow-hidden flex-shrink-sm-0 flex-img-device">
            <picture>
              <source
                srcSet={"/assets/images/growth/growth-welcome.jpg"}
                type="image/png"
              />
              <img
                src={"/assets/images/growth/growth-welcome.jpg"}
                alt="Profile-Banner"
                width="403"
                height="304"
              />
            </picture>
          </div>
          <div className="growth-info pt-4 pt-xl-0 pl-xl-4">
            <p className="font-18 font-md-16 text-secondary-75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
              mperdiet vitae massa mollis. Urna duis vitae lectus rhoncus
              hendrerit neque ornare. Malesuada diam, vel curabitur sit. Neque
              enim tempor pulvinar pulvinar scelerisque enim condimentum
              pharetra vitae.
            </p>
            <p className="font-18 font-md-16 text-secondary-75">
              Consectetur adipiscing elit. Amet mperdiet vitae massa mollis.
              Urna duis vitae lectus rhoncus hendrerit neque ornare. Malesuada
              diam, vel curabitur sit. Neque enim tempor
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GrowthWelcomeSection;
