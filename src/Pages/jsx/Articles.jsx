import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import articlescss from "../css/articles.module.css";

export default function ArticlesJSX() {
  return <SearchBox />;
}

function FilterBox({ categories, setCategories }) {
  return (
    <div className={articlescss["filter-box"]}>
      <div className={articlescss["filter-caption"]}>
        <img
          src="/Images/Filter.svg"
          alt="logo"
          className={articlescss["filter-logo"]}
        />
        <span>FILTER BY</span>
      </div>
      <div className={articlescss["filter-area"]}>
        <div className={articlescss["fields"]}>
          <h5>Research Area</h5>
          <div className={articlescss["natural-sciences"]}>
            <FilterItem
              name="Natural Sciences"
              style={{ fontWeight: "700", fontSize: "1em" }}
              c_id={"1,2,3,4,5,6"}
              categories={categories}
              setCategories={setCategories}
            />
            <ul className={articlescss["sublist1"]}>
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
          <div className={articlescss["social-sciences"]}>
            <FilterItem
              name="Social Sciences"
              style={{ fontWeight: "700", fontSize: "1em" }}
              c_id={"7,8,9,10,11"}
              categories={categories}
              setCategories={setCategories}
            />
            <ul className={articlescss["sublist1"]}>
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
        {/* <div className={`${articlescss["header"]} ${articlescss["status"]}`}>
          <h2>Status</h2>
          <ul className={articlescss["sublist2"]}>
            <FilterItem name="Non-reviewed" />
            <FilterItem name="Peer-reviewed" />
            <FilterItem name="Specialist-reviewed" />
          </ul>
        </div>
        <div
          className={`${articlescss["header"]} ${articlescss["date-published"]}`}
        >
          <h2>Date Published</h2>
          <ul className={articlescss["sublist2"]}>
            <FilterItem name="2023" />
            <FilterItem name="2022" />
          </ul>
        </div>
        <div className={`${articlescss["header"]} ${articlescss["language"]}`}>
          <h2>Language</h2>
          <ul className={articlescss["sublist2"]}>
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
      className={`${articlescss["no-list-style"]} ${articlescss["sub-list-items"]}`}
      style={props.style}
    >
      <label htmlFor={props.name}>
        <input
          type="checkbox"
          id={props.name}
          className={`${articlescss[`filter-checkbox`]}`}
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
  const fetchTitleAndCategories = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/v1/articles/approved-article?Page=1&Size=12${
        search !== "" ? "&title=" + search : ""
      }${categories !== "" ? "&category_ids=" + categories : ""}`,
    );
    const data = await res.json();
    return data;
  };

  const typeHandler = (e) => {
    setSearch(e.target.value);
  };

  const clickHandler = async () => {
    if (search !== "" || categories !== "") {
      const searchedItems = await fetchTitleAndCategories();
      setItems(searchedItems.res.Records);
    }
  };
  return (
    <div className={articlescss["page-wrapper"]}>
      <FilterBox categories={categories} setCategories={setCategories} />

      <div className={articlescss["search-box"]}>
        <div className={articlescss["search-bar"]}>
          <input
            type="text"
            className={articlescss["search-input"]}
            placeholder="Search articles, research papers, authors and more"
            onChange={typeHandler}
          />
          <button
            className={articlescss["search-button"]}
            onClick={clickHandler}
          ></button>
        </div>
        {/* <SearchBox/> */}
        <Paginate
          search={search}
          items={items}
          setItems={setItems}
          categories={categories}
        />
      </div>
    </div>
  );
}

function Paginate({ search, items, setItems, categories }) {
  const prev = <FontAwesomeIcon icon={faArrowLeft} />;
  const next = <FontAwesomeIcon icon={faArrowRight} />;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getArticlesUponLoad = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/v1/articles/approved-article?Page=1&Size=12`,
      );
      const data = await res.json();
      const total = data.res.Total;
      console.log(total);
      setPageCount(Math.ceil(total / 12));
      setItems(data.res.Records);
    };

    getArticlesUponLoad();
    /*this is essentially a one time use method that loads everytime the page reloads*/
  }, []);

  const fetchPageArticles = async (page) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/v1/articles/approved-article?Page=${page}&Size=12${
        search !== "" ? "&title=" + search : ""
      }${categories !== "" ? "&category_ids=" + categories : ""}`,
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (input) => {
    const page = input.selected + 1;
    const pageServer = await fetchPageArticles(page);
    setItems(pageServer.res.Records);
  };

  return (
    <div className={articlescss["search-results"]}>
      <div className="my-2 flex flex-col gap-2">
        {items.map((item) => {
          return <ArticleTile key={item.id} article={item} />;
        })}
      </div>
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
  );
}

function ArticleTile({ article }) {
  return (
    <div className="rounded-sm p-2 shadow-sm">
      <h3 className="text-base font-medium">{article.title}</h3>
    </div>
  );
}
