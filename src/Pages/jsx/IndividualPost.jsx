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
  }, []);
  return (
    <IndividualCard
      itemID={item.id}
      itemContent={item.content}
      itemTitle={item.title}
      itemPPC={item.pre_publish_content}
    />
  );
}

function IndividualCard({ itemID, itemTitle, itemContent, itemPPC }) {
  return (
    <div key={itemID} className="col-sm-12 col-md-6 my-2">
      <div className="shadow-sm w-100" style={{ minHeight: 400 }}>
        <div className="card-body" style={{ zIndex: "1" }}>
          <h5
            className="card-title text-center h2"
            style={{ zIndex: "1" }}
            >
            Id :{itemID}{" "}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted text-center">
            {itemTitle}
          </h6>
          <p className="card-text" style={{ zIndex: "1" }}>
            {itemContent}
          </p>
        </div>
      </div>
      <div>
        {/*remember to turn the api URLs back on */}
        <PDFViewer blobDownloadLink={itemPPC} />
      </div>
    </div>
  )
}

export default IndividualPostJSX;
