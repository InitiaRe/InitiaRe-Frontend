import React from 'react';
import admincss from '../css/admin.module.css';
import {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


export default function AdminJSX(){
    return(
        <div className={admincss['page-wrapper']}>
            <FilterBox />          
            <SearchBox />
        </div>
    )
}

function FilterItem(props){
    return (
        <li className={`${admincss["no-list-style"]} ${admincss['sub-list-items']}`} style={props.style} >
            <label for={props.name}>
                <input type="checkbox" id={props.name} className={`${admincss[`filter-checkbox`]}`}/> 
                {props.name}
            </label>
        </li>
    )
}

function FilterBox(){
   return(
   <div className={admincss['filter-box']}>
        <div className={admincss["filter-caption"]}>FILTER BY</div>
            <div className={admincss["filter-area"]}>
                <div className={admincss["fields"]}>
                    <h2>Research Area</h2>
                    <div className={admincss["natural-sciences"]} >
                    <FilterItem name="Natural Sciences" style={{fontWeight:"700", fontSize: "1.2em"}} />
                            <ul className={admincss["sublist1"]}>
                                <FilterItem name="Life Sciences" />
                                <FilterItem name="Physical Sciences" />
                                <FilterItem name="Earth Sciences" />
                                <FilterItem name="Medical and Health" />
                                <FilterItem name="Mathematics" />
                                <FilterItem name="Formal Sciences" />
                            </ul>

                    </div>
                    <div className={admincss["social-sciences"]}>
                    <FilterItem name="Social Sciences" style={{fontWeight:"700", fontSize: "1.2em"}} />
                            <ul className={admincss["sublist1"]}>
                                <FilterItem name="Social Studies" />
                                <FilterItem name="Humanities" />
                            </ul>
                        </div>
                    </div>
                    <div className={`${admincss["header"]} ${admincss["status"]}`}>
                        <h2>Status</h2>
                        <ul className={admincss["sublist2"]}>
                            <FilterItem name="Non-reviewed"/>
                            <FilterItem name="Peer-reviewed"/>
                            <FilterItem name="Specialist-reviewed"/>
                        </ul>
                        
                    </div>
                    <div className={`${admincss["header"]} ${admincss["date-published"]}`}>
                        <h2>Date Published</h2>
                        <ul className={admincss["sublist2"]}>
                            <FilterItem name="2023" />
                            <FilterItem name="2022" />
                        </ul>   
                    </div>
                    <div className={`${admincss["header"]} ${admincss["language"]}`}>
                        <h2>Language</h2>
                        <ul className={admincss["sublist2"]}>
                            <FilterItem name="English" />
                            <FilterItem name="Vietnamese" />
                        </ul>
                    </div>
                </div>
    </div>
    )
}

function SearchBox(){   
    // const [search, setSearch] = useState('');
    return(
        <div className={admincss["search-box"]}>
            <div className={admincss["search-bar"]}>
                <input type="text" className={admincss['search']} placeholder="Search articles, research papers, authors and more"/>   
                {/* i was gonna add a button here, but the styling made it impossible to idgaf anymore  */}
            </div>
            <Paginate />
        </div> 
    )
}

function Paginate(){
    const prev = <FontAwesomeIcon icon={faArrowLeft}/>
    const next = <FontAwesomeIcon icon={faArrowRight}/>

    const [items, setItems] = useState([])
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        const getArticles = async () => {
            const res = await fetch(`https://initiare-website-2603191647bb.herokuapp.com/api/v1/articles?Page=1&Size=12`)
            const data = await res.json()
            const total = data.res.Total
            console.log(total)
            setPageCount(Math.ceil(total/12)) 
            setItems(data.res.Records)
        }
        getArticles()
        /*this is essentially a one time use method that loads everytime the page reloads*/
    }, [])


    const fetchPageArticles = async (page) => {
         
        const res = await fetch(`https://initiare-website-2603191647bb.herokuapp.com/api/v1/articles?Page=${page}&Size=12`)
        const data = await res.json()
        return data
    }

    const handlePageClick = async (input) => {
        const page = input.selected + 1;
        const pageServer = await fetchPageArticles(page)
        setItems(pageServer.res.Records)
    }
    return(
        <div className={admincss["search-results"]}>
            <div className="row m-2">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="shadow-sm w-100" style={{ minHeight: 225}}>
                <div className="card-body" style={{ zIndex:'1'}}>
                  <h5 className="card-title text-center h2" style={{ zIndex:'1'}}>Id :{item.id} </h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.content}
                  </h6>
                  <p className="card-text" style={{ zIndex:'1'}}>{item.title}</p>
                  <p className="card-text" style={{ zIndex:'1'}}>{item.category_id}</p>
                </div>
              </div>
            </div>
          );
        })}
            <ReactPaginate 
            previousLabel = {prev}
            nextLabel = {next} 
            breakLabel = {'...'}
            pageCount = {pageCount}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            />
        </div>
        </div>
    )
}