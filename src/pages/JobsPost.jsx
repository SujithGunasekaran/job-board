import { useState, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useLiveQuery } from "dexie-react-hooks";
import Header from "../components/Header";
import JobBoardItem from '../components/JobBoardItem';
import Modal from '../components/Modal';
import { db } from '../indexedDB';
import styles from '../styles/job-post.module.css';

const JobForm = lazy(() => import('../components/JobForm'));

const JobsPosts = () => {

    // selector
    const { loggedInUser } = useSelector((store) => store.userReducer);

    // state
    const [showModal, setShowModal] = useState(false);

    const jobPosts = useLiveQuery(() => fetchJobPost(), []);

    const fetchJobPost = () => {
        return db.jobposts
            .where('userid')
            .equals(loggedInUser.id)
            .toArray();
    }

    const handleModal = () => {
        setShowModal((prevState) => !prevState);
    }

    const refetchJobPost = () => {
        setShowModal(false);
        fetchJobPost();
    }

    return (
        <>
            <Header />
            <div className={styles.job_post_wrapper}>
                <button
                    className={styles.job_post_add_btn}
                    onClick={handleModal}
                >
                    Add Job
                </button>
                <div className={styles.job_post_list_wrapper}>
                    {
                        (jobPosts && jobPosts.length) > 0 ?
                            jobPosts.map((job, index) => (
                                <JobBoardItem
                                    key={`${job.id}_${index}`}
                                    title={job.job_title}
                                    description={job.job_description}
                                    requirements={job.job_requirements}
                                    companyName={job.job_company_name}
                                    contactInfo={job.job_contact_info}
                                    salary={job.job_salary_per_hour}
                                    pageUrl={`/employer/myjob/${job.id}`}
                                    linkText='View Applications >'
                                    showApplyButton={false}
                                    showLink={true}
                                />
                            ))
                            : <div>No Job Poster</div>
                    }
                </div>

            </div>
            {
                showModal &&
                <Modal>
                    <Modal.Header
                        isDefault={true}
                        title={'Job Post'}
                        closeModal={handleModal}
                    >
                    </Modal.Header>
                    <Modal.Body>
                        <Suspense fallback={<div>Loading...</div>}>
                            <JobForm
                                refetchJobPost={refetchJobPost}
                            />
                        </Suspense>
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}

export default JobsPosts;
