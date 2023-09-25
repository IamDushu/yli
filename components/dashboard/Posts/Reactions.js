import React from "react";
import { useTranslation } from "react-i18next";

/******************** 
@purpose : Used for show reaction type 
@Parameter : { eventType, handleClickEvent, counter, totalCount }
@Author : INIC
******************/
const Reactions = ({ eventType, handleClickEvent, counter, totalCount }) => {
  const [lang] = useTranslation("language");
  const reactionType = (type) => {
    if (type === "Like") {
      return (
        <i className="text-primary font-24 bx bxs-like"></i>
      );
    }

    if (type === "Celebrate") {
      return (
        <picture className="icon">
          <source
            src="/assets/images/dashboard/Celebrate.svg"
            type="image/svg"
          />
          <img
            src="/assets/images/dashboard/Celebrate.svg"
            width="24"
            height="24"
            className="img-fluid w-h-24"
          />
        </picture>
      );
    }

    if (type === "Support") {
      return (
        <picture className="icon">
          <source src="/assets/images/dashboard/Support.svg" type="image/svg" />
          <img
            src="/assets/images/dashboard/Support.svg"
            width="24"
            height="24"
            className="img-fluid w-h-24"
          />
        </picture>
      );
    }

    if (type === "Love") {
      return (
        <picture className="icon">
          <source src="/assets/images/dashboard/Love.svg" type="image/svg" />
          <img
            src="/assets/images/dashboard/Love.svg"
            width="24"
            height="24"
            className="img-fluid w-h-24"
          />
        </picture>
      );
    }

    if (type === "Insightful") {
      return (
        <picture className="icon">
          <source
            src="/assets/images/dashboard/Insightful.svg"
            type="image/svg"
          />
          <img
            src="/assets/images/dashboard/Insightful.svg"
            width="24"
            height="24"
            className="img-fluid w-h-24"
          />
        </picture>
      );
    }

    if (type === "Curious") {
      return (
        <picture className="icon">
          <source src="/assets/images/dashboard/Curious.svg" type="image/svg" />
          <img
            src="/assets/images/dashboard/Curious.svg"
            width="24"
            height="24"
            className="img-fluid w-h-24"
          />
        </picture>
      );
    }

    if (type === null || type === "") {
      return (
        <i className="bx bx-like icon reaction-icons text-secondary"></i>
      );
    }
  };
  const likeCounter = () => (
    <p className="font-12 mb-0 text-gary reaction-icon-text pl-2 mt-0">
      {totalCount}
    </p>
  );
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div className=" reaction-icons-box hover-likes-reactions p-0">
      <div
        title=""
        className="d-flex align-items-center justify-content-center mr-2"
        onClick={(e) => {
          if (eventType !== null) {
            handleClickEvent(e, null);
            reactionType(null);
          } else {
            handleClickEvent(e, "Like");
            reactionType("Like");
          }
        }}
      >
        {reactionType(eventType)}

        {counter === true ? likeCounter() : null}
      </div>
      <div className="hoverview-like-reactions">
        <div className="hoverview-like-inside shadow border border-geyser">
          <div
            className="px-2 inner-icons pointer w-45-px flex-shrink-0"
            data-toggle="tooltip"
            title={lang("DASHBOARD.POSTS.POST_FOOTER.LIKE")}
            name="like"
            onClick={(e) => handleClickEvent(e, "Like")}
          >
            <i className="text-primary font-24 bx bxs-like pt-2" undefined></i>
          </div>

          <div
            className="px-2 inner-icons pointer w-45-px flex-shrink-0"
            data-toggle="tooltip"
            title={lang("DASHBOARD.POSTS.POST_FOOTER.CELEBRATE")}
            name="Celebrate"
            onClick={(e) => handleClickEvent(e, "Celebrate")}
          >
            <picture className="icon">
              <source
                src="/assets/images/dashboard/Celebrate.svg"
                type="image/svg"
              />
              <img
                src="/assets/images/dashboard/Celebrate.svg"
                width="40"
                height="40"
                className="img-fluid"
              />
            </picture>
          </div>
          <div
            className="px-2 inner-icons pointer w-45-px flex-shrink-0"
            data-toggle="tooltip"
            title={lang("DASHBOARD.POSTS.POST_FOOTER.SUPPORT")}
            name="Support"
            onClick={(e) => handleClickEvent(e, "Support")}
          >
            <picture className="icon">
              <source
                src="/assets/images/dashboard/Support.svg"
                type="image/svg"
              />
              <img
                src="/assets/images/dashboard/Support.svg"
                width="40"
                height="40"
                className="img-fluid"
              />
            </picture>
          </div>
          <div
            className="px-2 inner-icons pointer w-45-px flex-shrink-0"
            data-toggle="tooltip"
            title={lang("DASHBOARD.POSTS.POST_FOOTER.LOVE")}
            name="Love"
            onClick={(e) => handleClickEvent(e, "Love")}
          >
            <picture className="icon">
              <source
                src="/assets/images/dashboard/Love.svg"
                type="image/svg"
              />
              <img
                src="/assets/images/dashboard/Love.svg"
                width="40"
                height="40"
                className="img-fluid"
              />
            </picture>
          </div>
          <div
            className="px-2 inner-icons pointer w-45-px flex-shrink-0"
            data-toggle="tooltip"
            title={lang("DASHBOARD.POSTS.POST_FOOTER.INSIGHTFUL")}
            name="Insightful"
            onClick={(e) => handleClickEvent(e, "Insightful")}
          >
            <picture className="icon">
              <source
                src="/assets/images/dashboard/Insightful.svg"
                type="image/svg"
              />
              <img
                src="/assets/images/dashboard/Insightful.svg"
                width="40"
                height="40"
                className="img-fluid"
              />
            </picture>
          </div>
          <div
            className="px-2 inner-icons pointer w-45-px flex-shrink-0"
            data-toggle="tooltip"
            title={lang("DASHBOARD.POSTS.POST_FOOTER.CURIOUS")}
            name="Curious"
            onClick={(e) => handleClickEvent(e, "Curious")}
          >
            <picture className="icon">
              <source
                src="/assets/images/dashboard/Curious.svg"
                type="image/svg"
              />
              <img
                src="/assets/images/dashboard/Curious.svg"
                width="40"
                height="40"
                className="img-fluid"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactions;
