import { useEffect, useState } from "react";
import './Pagination.css';

const Pagination = ({
    Component,
    data,
    dataLimit,
    pageLimit,
}) => {
    const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);

    useEffect(() => {
        setPages(Math.ceil(data.length / dataLimit));
        setCurrentPage(1);
    }, [dataLimit, data.length]);

    const nextPage = () => {
        setCurrentPage(oldPage => oldPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(oldPage => oldPage - 1);
    };

    const changePage = e => {
        setCurrentPage(Number(e.target.textContent));
    };

    const paginatedData = () => {
        const startIdx = currentPage * dataLimit - dataLimit;
        const endIdx = startIdx + dataLimit;

        return data.slice(startIdx, endIdx);
    };

    // used to show page numbers
    const getPaginationGroup = () => {
        const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit > pages ? pageLimit : pages).fill().map((_, i) => start + i + 1);
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