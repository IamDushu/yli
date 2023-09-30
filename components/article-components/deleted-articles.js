import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DraftCardUi } from "components/add-post-ui/draft-card-ui";
import { AssistChips } from "components/assist-chips";
import { getDeletedArticles } from "store/actions/article";

const DeletedArticleListing = () => {
  const [lang] = useTranslation("language");
  const [articleList, setArticleList] = useState([]);
  const [pagesize, setPagesize] = useState(10);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getDeletedArticles({
      page: 1,
      pagesize,
    }).then((data) => {
      setArticleList(data?.rows);
      setTotal(data?.total);
    });
  }, [pagesize]);
  return (
    <div className="article-published-container">
      <div className="published-article-heading">Deleted</div>
      {articleList?.map((article, index) => {
        return (
          <DraftCardUi article={article} key={index} isFromDeleted={true} />
        );
      })}
      {total > articleList?.length && (
        <div className="flex-row-center">
          <AssistChips
            iconName="addIcon"
            border="none"
            color="#48464A"
            label={lang("COMMON.LOAD_MORE")}
            handleClick={() => {
              setPagesize((prev) => prev + 10);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default DeletedArticleListing;
