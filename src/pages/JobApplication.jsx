import { useState, useMemo, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../indexedDB';
import Header from "../components/Header";
import JobApplicationItems from '../components/JobApplicationItems';
import styles from '../styles/job-application.module.css';

const Pagination = lazy(() => import('../components/Pagination'));

const JobApplication = () => {

    // params
    const { jobId } = useParams();

    // state
    const [currentPage, setCurrentPage] = useState(1);
    const [pagePerItem] = useState(10);

    const jobInformation = useLiveQuery(
        () => db.jobposts.where({ id: +jobId }).first(),
    );

    const jobApplications = useLiveQuery(
        () => db.appliedjob.where({ jobid: +jobId }).toArray(),
    );

    const selectedPage = (currentPageNumber) => {
        setCurrentPage(currentPageNumber);
    }

    const paginatedApplication = useMemo(() => {
        const startIndex = (currentPage - 1) * pagePerItem;
        const endIndex = startIndex + pagePerItem;
        return jobApplications?.slice(startIndex, endIndex) ?? [];
    }, [jobApplications, currentPage, pagePerItem])

    return (
        <>
            <Header />
            {
                jobInformation &&
                <div className={styles.job_application_wrapper}>
                    <Link
                        className={styles.job_application_go_back}
                        to={'/employer/myjobs'}
                    >
                        Go Home
                    </Link>
                    <h2 className={styles.job_title}>{jobInformation.job_title}</h2>
                    <p className={styles.job_description}>{jobInformation.job_description}</p>
                    {
                        jobApplications &&
                            paginatedApplication.length > 0 ?
                            paginatedApplication.map((application) => (
                                <JobApplicationItems
                                    key={application.id}
                                    userId={application.userid}
                                />
                            )) :
                            <div>No Application...</div>
                    }
                    <Suspense fallback={<div>Loading...</div>}>
                        {
                            jobApplications &&
                            jobApplications.length > 10 &&
                            <div className={styles.job_application_pagination}>
                                <Pagination
                                    totalLength={jobApplications.length}
                                    currentPageNumber={currentPage}
                                    itemPerPage={10}
                                    pagePerSet={5}
                                    selectedPage={selectedPage}
                                />
                            </div>
                        }
                    </Suspense>
                </div>
            }
        </>
    )
}

export default JobApplication;
