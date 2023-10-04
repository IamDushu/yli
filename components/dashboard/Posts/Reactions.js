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
import { IconButton, Typography } from "@mui/material";
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
    if (!type) return <FavoriteBorderOutlinedIcon className="like-tsp" />;
    else if (type === "Fav") return <FavoriteIcon className="like-tsp" />;
    else {
      const ReactionIcon = reactionsMap[type];
      return <ReactionIcon />;
    }
  };
  const likeCounter = () => (
    <Typography variant="labelSmall">{totalCount}</Typography>
  );
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div>
      <div className="reaction-icons-box hover-likes-reactions p-0">
        <IconButton
          classes={"like-tsp"}
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

        {counter === true ? likeCounter() : null}

        <div className="hoverview-like-reactions like-tsp">
          <div className="hoverview-like-inside shadow border border-geyser like-tsp">
            {Object.keys(reactionsMap).map((key) => {
              const ReactionIcon = reactionsMap[key];
              return (
                <div
                  key={key}
                  className="px-2 inner-icons pointer w-45-px flex-shrink-0 like-tsp"
                  data-toggle="tooltip"
                  // title={lang("DASHBOARD.POSTS.POST_FOOTER.LIKE")}
                  name={key}
                  onClick={(e) => handleClickEvent(e, key)}
                >
                  <ReactionIcon />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reactions;
