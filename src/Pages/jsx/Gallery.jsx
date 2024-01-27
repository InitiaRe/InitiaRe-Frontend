import React from "react";
import gallerycss from "../css/gallery.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PDFViewer from "../../Components/PDFViewer.js";

export default function GalleryJSX() {
  return <SearchBox />;
}

// function FilterButton() {
//   return (
//     <div className={gallerycss['filter-button-wrap']}>
//       <div className={gallerycss['filter-button']}>
//         <img 
//           src="/Images/Filter.svg" 
//           alt="filter icon" 
//           className={gallerycss['filter-button-icon']} />
//         <div className={gallerycss['filter-by-text-1']}>
//           Filter by
//         </div>
//       </div>
//     </div>
//   )
// }

function FilterBox({ categories, setCategories }) {
  return (
    <div className={gallerycss["filter-box"]}>
      <div className={gallerycss["filter-caption"]}>
        <img
          src="/Images/Filter.svg"
          alt="filter icon"
          className={gallerycss["filter-logo"]}
        />
        <span className={gallerycss['filter-by-text-2']}>Filter by</span>
      </div>
      <div className={gallerycss["filter-area"]}>
        <div className={gallerycss["fields"]}>
          <h5>Research Area</h5>
          <div className={gallerycss["natural-sciences"]}>
            <FilterItem
              name="Natural Sciences"
              style={{ fontWeight: "700", fontSize: "1em" }}
              c_id={"1,2,3,4,5,6"}
              categories={categories}
              setCategories={setCategories}
            />
            <ul className={gallerycss["sublist1"]}>
              <FilterItem
                name="Life Sciences"
                c_id={"1"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Physical Sciences"
                c_id={"2"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Earth Sciences"
                c_id={"3"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Medical and Health"
                c_id={"4"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Mathematics"
                c_id={"5"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Formal Sciences"
                c_id={"6"}
                categories={categories}
                setCategories={setCategories}
              />
            </ul>
          </div>
          <div className={gallerycss["social-sciences"]}>
            <FilterItem
              name="Social Sciences"
              style={{ fontWeight: "700", fontSize: "1em" }}
              c_id={"7,8,9,10,11"}
              categories={categories}
              setCategories={setCategories}
            />
            <ul className={gallerycss["sublist1"]}>
              <FilterItem
                name="Social Studies"
                c_id={"7"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Economics"
                c_id={"8"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Psychology"
                c_id={"9"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Education"
                c_id={"10"}
                categories={categories}
                setCategories={setCategories}
              />
              <FilterItem
                name="Culture and Arts"
                c_id={"11"}
                categories={categories}
                setCategories={setCategories}
              />
            </ul>
          </div>
        </div>
        {/* <div className={`${gallerycss["header"]} ${gallerycss["status"]}`}>
          <h2>Status</h2>
          <ul className={gallerycss["sublist2"]}>
            <FilterItem name="Non-reviewed" />
            <FilterItem name="Peer-reviewed" />
            <FilterItem name="Specialist-reviewed" />
          </ul>
        </div>
        <div
          className={`${gallerycss["header"]} ${gallerycss["date-published"]}`}
        >
          <h2>Date Published</h2>
          <ul className={gallerycss["sublist2"]}>
            <FilterItem name="2023" />
            <FilterItem name="2022" />
          </ul>
        </div>
        <div className={`${gallerycss["header"]} ${gallerycss["language"]}`}>
          <h2>Language</h2>
          <ul className={gallerycss["sublist2"]}>
            <FilterItem name="English" />
            <FilterItem name="Vietnamese" />
          </ul>
        </div> */}
      </div>
    </div>
  );
}
function FilterItem(props) {
  function handleChange(e) {
    let { value, checked } = e.target;

    if (checked) {
      if (props.categories !== "")
        props.setCategories(props.categories + "," + value);
      else props.setCategories(value + ",");
    } else if (!checked) {
      const newCategories = props.categories.replace(value, "");
      props.setCategories(newCategories);
    }
  }
  return (
    <li
      className={`${gallerycss["no-list-style"]} ${gallerycss["sub-list-items"]}`}
      style={props.style}
    >
      <label for={props.name}>
        <input
          type="checkbox"
          id={props.name}
          className={`${gallerycss[`filter-checkbox`]}`}
          onChange={handleChange}
          value={props.c_id}
        />
        {props.name}
      </label>
    </li>
  );
}

function SearchBox() {
  const [categories, setCategories] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const fetchTitleAndCategories = async () => {
    if (search !== "" || categories !== "") {
      const res = await fetch(
        `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles?Page=1&Size=12&type_id=4${search !== "" ? "&title=" + search : ""
        }${categories !== "" ? "&category_ids=" + categories : ""}`
      );
      const data = await res.json();
      const total = data.res.Total;
      setPageCount(Math.ceil(total / 12));
      setItems(data.res.Records);
    } else {
      const res = await fetch(
        `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles?Page=1&Size=12&type_id=4`
      );
      const data = await res.json();
      const total = data.res.Total;
      setPageCount(Math.ceil(total / 12));
      setItems(data.res.Records);
    }
  };

  const typeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = async () => {
    if (search !== "" || categories !== "") {
      await fetchTitleAndCategories();
    }
  };

  return (
    <div className={gallerycss["page-wrapper"]}>
      {/* <FilterButton /> */}
      <FilterBox categories={categories} setCategories={setCategories} />

      <div className={gallerycss["search-box"]}>
        <div className={gallerycss["search-bar"]}>
          <input
            type="text"
            className={gallerycss["search-input"]}
            placeholder="Search articles, research papers, authors and more"
            onChange={typeHandler}
          />
          <button
            className={`${gallerycss["search-button"]} ${search !== "" || categories !== ""
              ? gallerycss["selectable-search-button"]
              : ""
              }`}
            onClick={searchHandler}
          >
            <img
              alt="search icon"
              src="/Images/search-icon.png"
              className={`${gallerycss["search-icon"]}`}
            />
          </button>
        </div>
        {/* <SearchBox/> */}
        <Paginate
          search={search}
          items={items}
          setItems={setItems}
          categories={categories}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
      </div>
    </div>
  );
}

function Paginate({
  search,
  items,
  setItems,
  categories,
  pageCount,
  setPageCount,
}) {
  const prev = <FontAwesomeIcon icon={faArrowLeft} />;
  const next = <FontAwesomeIcon icon={faArrowRight} />;

  useEffect(() => {
    const getArticlesUponLoad = async () => {
      const res = await fetch(
        `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles?Page=1&Size=12&type_id=4`
      );
      //remember to change later ^
      const data = await res.json();
      const total = data.res.Total;
      setPageCount(Math.ceil(total / 12));
      setItems(data.res.Records);
    };

    getArticlesUponLoad();
    /*this is essentially a one time use method that loads everytime the page reloads*/
  }, [setItems, setPageCount]);

  const fetchPageArticles = async (page) => {
    const res = await fetch(
      `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles?Page=${page}&Size=12&type_id=4${search !== "" ? "&title=" + search : ""
      }${categories !== "" ? "&category_ids=" + categories : ""}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (input) => {
    const page = input.selected + 1;
    const pageServer = await fetchPageArticles(page);
    setItems(pageServer.res.Records);
  };

  const getTenCharsInString = (inputString) => {
    let outString = "";
    for (let i = 0; i < 10; i++) {
      outString = outString + inputString[i];
    }
    return outString;
  };
  // extracts the first ten letters from a string
  // used for getting the date from the created_at time

  return (
    <div className={gallerycss["search-results"]}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        {items.map((item) => {
          return (
            <IndividualCard
              itemID={item.id}
              // itemContent={item.content}
              itemTitle={item.title}
              itemPPC={item.pre_publish_content}
              itemCategoryName={item.category_name}
              itemCreatedTime={getTenCharsInString(item.created_at)}
              itemThumbnail={item.thumbnail}
            />
          );
        })}
        <ReactPaginate
          previousLabel={prev}
          nextLabel={next}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

function IndividualCard({
  itemID,
  itemTitle,
  itemCategoryName,
  itemCreatedTime,
  itemPPC,
  itemThumbnail,
}) {
  return (
    <div
      key={itemID}
      className={`${gallerycss["individual-card"]}`} >
      <div className={gallerycss["total-wrap"]}>
        <div className={gallerycss["first-part"]}>
          <Link
            to={`/gallery/` + itemID}
            style={{ height: "100%", width: "100%" }}
          >
            <div className={gallerycss["pdf-wrap"]}>
              <PDFViewer blobDownloadLink={itemPPC} className={gallerycss['the-pdf']} />
            </div>
          </Link>
        </div>

        <div className={gallerycss["second-part"]}>
          <div className={gallerycss["research-field-text"]}>
            {itemCategoryName}
          </div>
          <div className={gallerycss["research-title-text"]}>{itemTitle}</div>
          <div className={gallerycss["second-part-third-row"]}>
            <div className={gallerycss["research-author-name"]}>
              {itemThumbnail}
            </div>
            <div className={gallerycss["date-published"]}>
              {itemCreatedTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // TODO: - Make it search the Category Name and Author Name when the user clicks on them
}
