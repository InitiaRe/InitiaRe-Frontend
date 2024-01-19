import { React, useEffect, useState } from "react";
import ipostcss from "./../css/ipost.module.css";
import { useParams } from "react-router-dom";
import PDFViewer from "../../Components/PDFViewer";

function IndividualPostJSX() {
  const { articleID } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const getArticlesUponLoad = async () => {
      const res = await fetch(
        `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles/${articleID}`
      );
      const data = await res.json();
      setItem(data.res);
    };

    getArticlesUponLoad();
  }, [articleID]);
  return (
    <IndividualCard
      itemID={item.id}
      itemContent={item.content}
      itemTitle={item.title}
      itemPPC={item.pre_publish_content}
      itemAbstract={item.short_brief}
    />
  );
}

function IndividualCard({
  itemID,
  itemTitle,
  itemContent,
  itemPPC,
  itemAbstract,
}) {
  const title = itemTitle?.toUpperCase();
  
  return (
    <div className={`${ipostcss[`page-wrapper`]}`}>
      <div className={`${ipostcss[`article-title`]}`}>{title}</div>
      <a href={itemPPC}>
        <PDFViewer blobDownloadLink={itemPPC} />
      </a>
      <div className={`${ipostcss[`article-abstract`]}`}>
        <p className={`${ipostcss[`article-abstract-title`]}`}>Abstract</p>
        {itemAbstract}
      </div>
    </div>
  );
}

export default IndividualPostJSX;
