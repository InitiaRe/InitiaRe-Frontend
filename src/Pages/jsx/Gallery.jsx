import React from "react";
import gallerycss from "../css/gallery.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PDFViewer from "../../Components/PDFViewer.js";

function IOSBlankPage() {
  return (
    <div className={gallerycss["ios-blank-page"]}>
      <h1>
        Unfortunately, all iOS's browsers are incompatible with the site's pdf-viewing capability. 
        Please use an Android or Windows/Linux device to view our /gallery section
      </h1>
    </div>
  );
}
export default function GalleryJSX() {
  return (
    <>
      <SearchBox />;
      {/* <IOSBlankPage /> */}
    </>
  );
}

function FilterButton() {
  return (
    <div className={gallerycss["filter-caption"]}>
      <img
        src="/Images/Filter.svg"
        alt="filter icon"
        className={gallerycss["filter-logo"]}
      />
      <div className={gallerycss["filter-by-text-2"]}>Filter</div>
    </div>
  );
}

function FilterBox({ categories, setCategories }) {
  const [isShown, setShown] = useState(false);
  const handleFilterToggle = () => {
    if (isShown) {
      setShown(false);
    } else setShown(true);
  };

  return (
    <div
      className={`${gallerycss["filter-wrap"]} ${
        isShown ? gallerycss.shown : gallerycss.hidden
      }`}
    >
      <div className={gallerycss["filter-box"]}>
        <FilterButton />
        <div className={gallerycss["filter-area"]}>
          <div className={gallerycss["fields"]}>
            <h5>Research Area</h5>
            <div className={gallerycss["natural-sciences"]}>
              <FilterItem
                name="Natural Sciences"
                c_id={"NS"}
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
                c_id={"SS"}
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
      <div
        className={gallerycss["filter-pop-out"]}
        onClick={handleFilterToggle}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}
function FilterItem(props) {
  function handleChange(e) {
    let { value, checked } = e.target;

    if (checked) {
      if (value === "NS") {
        let newList = props.categories;
        newList.push("1");
        newList.push("2");
        newList.push("3");
        newList.push("4");
        newList.push("5");
        newList.push("6");
        props.setCategories(newList);
      } else if (value === "SS") {
        let newList = props.categories;
        newList.push("7");
        newList.push("8");
        newList.push("9");
        newList.push("10");
        newList.push("11");
        props.setCategories(newList);
      } else {
        let newList = props.categories;
        newList.push(value);
        props.setCategories(newList);
      }
    } else if (!checked) {
      if (value === "NS") {
        const newList = props.categories.filter((c) => {
          return (
            c !== "1" &&
            c !== "2" &&
            c !== "3" &&
            c !== "4" &&
            c !== "5" &&
            c !== "6"
          );
        });
        props.setCategories(newList);
      } else if (value === "SS") {
        const newList = props.categories.filter((c) => {
          return (
            c !== "7" && c !== "8" && c !== "9" && c !== "10" && c !== "11"
          );
        });
        props.setCategories(newList);
      } else {
        const newList = props.categories.filter((c) => c !== value);
        props.setCategories(newList);
      }
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
        <div className={gallerycss["filter-checkbox-text"]}>{props.name}</div>
      </label>
    </li>
  );
}

function SearchBox() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const fetchTitleAndCategories = async () => {
    let categoryString = "";
    for (let i = 0; i < categories.length; i++) {
      categoryString = categoryString + categories[i] + ",";
    }

    if (search !== "" || categories.length !== 0) {
      const res = await fetch(
        `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles?Page=1&Size=12&type_id=4${
          search !== "" ? "&title=" + search : ""
        }${
          categories.length !== 0 ? "&category_ids=".concat(categoryString) : ""
        }`
      );
      const data = await res.json();
      const total = data?.res.Total;
      setPageCount(Math.ceil(total / 12));
      setItems(data.res?.Records);
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
  const searchHandler = async () => {
    if (search !== "" || categories.length !== 0) {
      await fetchTitleAndCategories();
    }
  };
  const typeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={gallerycss["page-wrapper"]}>
      <div className={gallerycss["filter-outer-wrap"]}>
        <FilterBox categories={categories} setCategories={setCategories} />
      </div>
      <div className={gallerycss["search-box"]}>
        <div className={gallerycss["search-bar"]}>
          <input
            type="text"
            className={gallerycss["search-input"]}
            placeholder="Search articles, research papers, authors and more"
            onChange={typeHandler}
          />
          <button
            className={`${gallerycss["search-button"]} ${
              search !== "" || categories.length !== 0
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
    let categoryString = "";
    for (let i = 0; i < categories.length; i++) {
      categoryString = categoryString + categories[i] + ",";
    }
    const res = await fetch(
      `https://production-initiare-f7a455f351a3.herokuapp.com/api/v1/articles?Page=${page}&Size=12&type_id=4${
        search !== "" ? "&title=" + search : ""
      }${categories.length !== 0 ? "&category_ids=" + categoryString : ""}`
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
      <div
        className={`row g-0 ${gallerycss["card-row"]}`}
        style={{ justifyContent: "space-between" }}
      >
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
          containerClassName={`pagination justify-content-center ${gallerycss.pagination}`}
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
    <div key={itemID} className={`${gallerycss["individual-card"]}`}>
      <div className={gallerycss["total-wrap"]}>
        <div className={gallerycss["first-part"]}>
          <Link
            to={`/gallery/` + itemID}
            style={{ height: "100%", width: "100%" }}
          >
            <div className={gallerycss["pdf-wrap"]}>
              <PDFViewer
                blobDownloadLink={itemPPC}
                className={gallerycss["the-pdf"]}
              />
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
