/**************************************  
  @purpose : Default style for react-mentions package
  @Author : INIC
  *************************************/
export default {
  suggestions: {
    position: "absolute",
    top: 15,
    width: "calc(100% - 20px)",
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
      width: "100%",
      minHeight: 50,
      maxHeight: 150,
      overflow: "auto",
      position: "relative",
    },
    item: {
      padding: "5px 15px",
    },
  },
};
