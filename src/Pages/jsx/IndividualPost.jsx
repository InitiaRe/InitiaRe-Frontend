import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import PDFViewer from "../../Components/PDFViewer";
import ipostcss from "./../css/ipost.module.css";

function IndividualPostJSX() {
  const { articleID } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const getArticlesUponLoad = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/v1/articles/${articleID}`,
      );
      const data = await res.json();
      setItem(data.res);
    };

    getArticlesUponLoad();
  }, [articleID]);
  return (
    <IndividualCard
      itemID={item?.id}
      itemContent={item?.content}
      itemTitle={item?.title}
      itemPPC={item?.pre_publish_content}
      itemAbstract={item?.short_brief}
      itemAuthor={item?.thumbnail}
      itemCategoryID={item?.category_id}
    />
  );
}

function IndividualCard({
  itemID,
  itemTitle,
  itemContent,
  itemPPC,
  itemAbstract,
  itemAuthor,
  itemCategoryID,
}) {
  const title = itemTitle;
  const categoryNameList = [
    "Null",
    "Life Sciences",
    "Physical Sciences",
    "Earth Sciences",
    "Medicine and Health",
    "Mathematics",
    "Formal Sciences",
    "Social Studies",
    "Economics",
    "Psychology",
    "Education",
    "Culture and Arts",
  ];

  return (
    <div className={`${ipostcss[`page-wrapper`]}`}>
      <div className={`${ipostcss[`article-title`]}`}>{title}</div>
      <div className={ipostcss["article-category"]}>
        {categoryNameList[itemCategoryID]}
      </div>
      <div className={ipostcss["article-authors"]}>{itemAuthor}</div>
      <iframe src={itemPPC} className="w-full" height="200" title={itemTitle} />
      <div className={ipostcss["click-text"]}>
        <Link to={itemPPC}>(Click to Download)</Link>
      </div>

      <p>{itemContent}</p>
    </div>
  );
}

export default IndividualPostJSX;
