import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import TopicAdminCard from "../topic-admin-card";

const TopicDetail = () => {
  return (
    <div className="topic-details-wrapper">
      <TopicAdminCard />
      {/* description */}
      <Card
        sx={{
          borderRadius: 0,
        }}
      >
        <CardContent
          sx={{
            width: "839px",
            padding: "16px",
          }}
        >
          <div className="topic-desc-card">
            <div className="desc">Description</div>
            <div className="content">
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more
            </div>
          </div>
        </CardContent>
      </Card>
      {/* roles of conduct */}
      <Card
        sx={{
          borderRadius: 0,
        }}
      >
        <CardContent
          sx={{
            width: "839px",
            padding: "16px",
          }}
        >
          <div className="topic-role-card">
            <div className="role">Rules of conduct</div>
            <div className="content">
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum
              passages, and more
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default TopicDetail;
