import { useEffect, useState } from "react";
import './Pagination.css';

const Pagination = ({
    Component,
    data,
    dataLimit,
    pageLimit,
    query,
    setQuery,
    currentPage,
    setCurrentPage,
}) => {
    const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    useEffect(() => {
        const calculatedPages = Math.ceil(data.length / dataLimit);
        const pageToSet = calculatedPages > query.page ? query.page : 1;
        // avoids setting page to bigger number than the available calculated ones
        setPages(calculatedPages);
        setCurrentPage(pageToSet);
        setQuery({ page: pageToSet });
    }, [dataLimit, data.length, setQuery, setCurrentPage, query.page]);

    const nextPage = () => {
        // setCurrentPage(oldPage => oldPage + 1);
        const next = Number(query.page) + 1;
        setCurrentPage(next);
        setQuery({ page: next });
    };

    /* 
        using query to set previous and next pages because when the "home" button is clicked 
        on the navigation and then if you want to switch pages with the next button it keeps 
        its previous state and renders it e.g. if u come back from 5th page to home and click 
        on Next page button it immediately renders page 6 which is wrong.
    */
    const previousPage = () => {
        const prev = Number(query.page) - 1;
        setCurrentPage(prev);
        setQuery({ page: prev });
    };

    const changePage = e => {
        const p = Number(e.target.textContent);
        setCurrentPage(p);
        setQuery({ page: p });
    };

    const paginatedData = () => {
        const startIdx = currentPage * dataLimit - dataLimit;
        const endIdx = startIdx + dataLimit;

        return data.slice(startIdx, endIdx);
    };

    // used to show page numbers
    const getPaginationGroup = () => {
        const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, i) => start + i + 1);
    };

    const paginationGroup = getPaginationGroup();
    // remove unnecessary page numbers
    if (paginationGroup.length > pages) {
        paginationGroup.length = pages;
    }

    return (
        <>
            <div className="wrapper">
                {paginatedData().map(p => <Component key={p._id} post={p} />)}
            </div>
            <div className="pagination">
                <button
                    onClick={previousPage}
                    className={`pagination-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    Previous
                </button>
                {paginationGroup.map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`pagination-btn ${currentPage === item ? 'pagination-active' : ''}`}
                    >
                        {item}
                    </button>
                ))}
                <button
                    onClick={nextPage}
                    className={`pagination-btn next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Pagination;