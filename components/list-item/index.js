import PropTypes from "prop-types";
import listItemStyles from "./list-item-styles.module.scss";
import Image from "next/image";

export const ListItem = ({ icon, label = "Growth Projects" }) => {
  return (
    <div className={listItemStyles["yliway-flex-container"]}>
      <div className={listItemStyles["yliway-image1-wrapper"]}>
        <Image src={`/${icon}`} alt="Image 1" width={44} height={40} />
      </div>
      <div className={listItemStyles["yliway-label"]}>{label}</div>
      <div className={listItemStyles["yliway-img2"]}>
        <Image
          src="/assets/images/arrow_right.svg"
          alt="Image 2"
          width={24}
          height={24}
          style={{ marginRight: "16px" }}
        />
      </div>
    </div>
  );
};

ListItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
};
