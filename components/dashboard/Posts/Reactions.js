import {
  CelebrateIcon,
  InsightIcon,
  LaughIcon,
  LikeIcon,
  LoveIcon,
  SupportIcon,
} from "icons/index";
import React from "react";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton, Tooltip } from "@mui/material";
/******************** 
@purpose : Used for show reaction type 
@Parameter : { eventType, handleClickEvent, counter, totalCount }
@Author : INIC
******************/

const reactionsMap = {
  Like: LikeIcon,
  Celebrate: CelebrateIcon,
  Support: SupportIcon,
  Love: LoveIcon,
  Insightful: InsightIcon,
  Laugh: LaughIcon,
};
const Reactions = ({ eventType, handleClickEvent, counter, totalCount }) => {
  const [lang] = useTranslation("language");
  const reactionType = (type) => {
    if (!type) return <FavoriteBorderOutlinedIcon />;
    else if (type === "Fav") return <FavoriteIcon />;
    else {
      const ReactionIcon = reactionsMap[type];
      return <ReactionIcon />;
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
    <div>
      <div className="reaction-icons-box hover-likes-reactions p-0">
        <Tooltip title={eventType}>
          <IconButton
            color="inherit"
            onClick={(e) => {
              if (eventType !== null) {
                handleClickEvent(e, null);
                reactionType(null);
              } else {
                handleClickEvent(e, "Fav");
                reactionType("Fav");
              }
            }}
          >
            {reactionType(eventType)}
          </IconButton>
        </Tooltip>
        {counter === true ? likeCounter() : null}

        <div className="hoverview-like-reactions">
          <div className="hoverview-like-inside shadow border border-geyser">
            {Object.keys(reactionsMap).map((key) => {
              const ReactionIcon = reactionsMap[key];
              return (
                <Tooltip key={key} title={key}>
                  <div
                    key={key}
                    className="px-2 inner-icons pointer w-45-px flex-shrink-0"
                    data-toggle="tooltip"
                    title={lang("DASHBOARD.POSTS.POST_FOOTER.LIKE")}
                    name={key}
                    onClick={(e) => handleClickEvent(e, key)}
                  >
                    <ReactionIcon />
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactions;
