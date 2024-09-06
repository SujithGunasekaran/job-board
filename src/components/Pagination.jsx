import { useState, useMemo, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import styles from '../styles/pagination.module.css';

const Pagination = (props) => {

    // props
    const {
        totalLength,
        itemPerPage,
        selectedPage,
        currentPageNumber,
        pagePerSet = 5
    } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPageSet, setCurrentPageSet] = useState(1);
    const [totalPageSet, setTotalPageSet] = useState(0);

    const handlePageNumberClick = useCallback((pageNumber) => {
        selectedPage(pageNumber);
    }, []);

    const nextPageSet = () => {
        setCurrentPageSet((prevState) => prevState + 1);
        const pageNumber = (currentPageSet * pagePerSet) + 1;
        selectedPage(pageNumber);
    }

    const previousPageSet = () => {
        setCurrentPageSet((prevState) => prevState - 1);
        const pageNumber = (currentPageSet - 1) * pagePerSet;
        selectedPage(pageNumber)
    }

    const nextPage = () => {
        const nextPageSet = (currentPageSet * pagePerSet) + 1;
        if ((currentPage + 1) === nextPageSet) {
            setCurrentPageSet((prevState) => prevState + 1);
        }
        selectedPage(currentPage + 1);
    }

    const previousPage = () => {
        const prevPageSet = (currentPageSet - 1) * pagePerSet;
        if ((currentPage - 1) === prevPageSet) {
            setCurrentPageSet((prevState) => prevState - 1);
        }
        selectedPage(currentPage - 1);
    }

    useEffect(() => {
        let totalPageCount = Math.floor(totalLength / itemPerPage);
        let totalPageSet = Math.ceil(totalPageCount / pagePerSet);
        setTotalPage(totalPageCount);
        setTotalPageSet(totalPageSet);
    }, [totalLength, itemPerPage, pagePerSet])


    useEffect(() => {
        setCurrentPage(currentPageNumber);
        let pageSet = Math.ceil(currentPageNumber / pagePerSet);
        setCurrentPageSet(pageSet);
    }, [currentPageNumber, pagePerSet])


    const pageItem = useMemo(() => {
        let itemList = [];
        const startIndex = ((currentPageSet - 1) * pagePerSet) + 1;
        const endIndex = ((currentPageSet - 1) * pagePerSet) + pagePerSet;
        for (let i = startIndex; i <= endIndex; i++) {
            if (i > totalPage) continue;
            itemList.push(
                <div
                    className={`${styles.pagination_number} ${currentPage === (i) ? styles.active : ''}`}
                    key={i}
                    onClick={() => handlePageNumberClick(i)}
                >
                    {i}
                </div>
            );
        }
        return itemList;
    }, [totalPage, currentPageSet, currentPage, pagePerSet, handlePageNumberClick]);

    return (
        <>
            <div className={styles.pagination_container}>
                <div className={`${styles.pagination_icon} ${currentPageSet === 1 ? styles.disabled : ''}`} onClick={() => previousPageSet()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-chevron-double-left ${styles.icon}`} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </div>
                <div className={`${styles.pagination_icon} ${currentPage === 1 ? styles.disabled : ''}`} onClick={() => previousPage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-chevron-left ${styles.icon}`} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </div>
                {pageItem ? pageItem : ''}
                <div className={`${styles.pagination_icon} ${currentPage === totalPage ? styles.disabled : ''}`} onClick={() => nextPage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-chevron-right ${styles.icon}`} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <div className={`${styles.pagination_icon} ${currentPage === totalPageSet ? styles.disabled : ''}`} onClick={() => nextPageSet()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-chevron-double-right ${styles.icon}`} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                        <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
        </>
    )

}

Pagination.propTypes = {
    totalLength: propTypes.number,
    itemPerPage: propTypes.number,
    currentPageNumber: propTypes.number,
    selectedPage: propTypes.func,
    pagePerSet: propTypes.number,
}

export default Pagination; 
