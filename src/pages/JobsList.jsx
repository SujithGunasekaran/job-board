import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from "../components/Header";
import JobFilter from '../components/JobFilter';
import JobBoardItem from '../components/JobBoardItem';
import jobBoard from '../jobBoard.json';
import styles from '../styles/job-board.module.css';

const Pagination = lazy(() => import('../components/Pagination'));

const JobsList = () => {

    const [jobList, setJobList] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({
        skill: '',
        sort: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pagePerItem] = useState(10);

    const selectedPage = (currentPageNumber) => {
        setCurrentPage(currentPageNumber);
    }

    const handleFilter = (event) => {
        const { value, name } = event.target;
        setSelectedFilter((prevState) => {
            let newState = {
                ...prevState,
                [name]: value
            };
            return newState;
        });
    }

    useEffect(() => {
        /**
         * If we are dealing with large set of data.
         * We can actually use the webWorker to perform this task.
         * Which will not block the UI interaction.
        */
        let jobList = [...jobBoard];
        setCurrentPage(1);
        Object.entries(selectedFilter).forEach(([key, value]) => {
            if (key === 'skill' && value) {
                jobList = jobList.filter((job) => job.job_requirements.includes(value));
            }
            else if (key === 'sort' && value) {
                jobList.sort(
                    (a, b) => value === 'asc' ? a.job_salary_per_hour - b.job_salary_per_hour
                        : b.job_salary_per_hour - a.job_salary_per_hour
                );
            }
        });
        setJobList(jobList);
    }, [selectedFilter])

    const jobs = useMemo(() => {
        const startIndex = (currentPage - 1) * pagePerItem;
        const endIndex = startIndex + pagePerItem;
        return jobList.slice(startIndex, endIndex);
    }, [currentPage, jobList, pagePerItem]);

    return (
        <>
            <Header />
            <div className={styles.job_board_list_wrapper}>
                <div className={styles.job_board_filter_container}>
                    <JobFilter
                        selectedFilterValue={selectedFilter}
                        handleSelectChange={handleFilter}
                    />
                </div>
                {
                    jobs.length > 0 ?
                        jobs.map((job, index) => (
                            <JobBoardItem
                                key={`${job.id}_${index}`}
                                title={job.job_title}
                                description={job.job_description}
                                requirements={job.job_requirements}
                                companyName={job.job_company_name}
                                contactInfo={job.job_contact_info}
                                salary={job.job_salary_per_hour}
                                showApplyButton={true}
                            />
                        ))
                        : <div>No jobs are available...</div>
                }
                <Suspense fallback={<div>Loading...</div>}>
                    {
                        jobList.length > 10 &&
                        <div className={styles.job_list_pagination}>
                            <Pagination
                                totalLength={jobList.length}
                                currentPageNumber={currentPage}
                                itemPerPage={10}
                                pagePerSet={5}
                                selectedPage={selectedPage}
                            />
                        </div>
                    }
                </Suspense>
            </div>
        </>
    )
}

export default JobsList;
