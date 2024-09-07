import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from '../styles/job-card.module.css';

const JobCard = (props) => {

    // props
    const {
        title,
        description,
        requirements,
        companyName,
        contactInfo,
        salary,
        pageUrl,
        linkText,
        applyJob,
        userRole,
        applicationCount,
        isAppliedJob = false,
    } = props;

    const salaryInDollar = () => {
        return salary ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(salary) : 0;
    }

    return (
        <div className={styles.job_card}>
            <div className={styles.job_card_wrapper}>
                <div className={styles.job_card_info_wrapper}>
                    <h1 className={styles.job_card_title}>{title}</h1>
                    <p className={styles.job_card_description}>{description}</p>
                    <div className={styles.job_info_container}>
                        <div className={styles.job_info_wrapper}>
                            <p className={styles.job_info_title}>Requirements</p>
                            <p className={styles.job_info_description}>{requirements}</p>
                        </div>
                        <div className={styles.job_info_wrapper}>
                            <p className={styles.job_info_title}>Company Name</p>
                            <p className={styles.job_info_description}>{companyName}</p>
                        </div>
                        <div className={styles.job_info_wrapper}>
                            <p className={styles.job_info_title}>Contact Info</p>
                            <p className={styles.job_info_description}>{contactInfo}</p>
                        </div>
                        <div className={styles.job_info_wrapper}>
                            <p className={styles.job_info_title}>Salary (per hour)</p>
                            <p className={styles.job_info_description}>{salaryInDollar()}</p>
                        </div>
                        {
                            userRole === 'employer' &&
                            <div className={styles.job_info_wrapper}>
                                <p className={styles.job_info_title}>Application Count</p>
                                <p className={styles.job_info_description}>{applicationCount}</p>
                            </div>
                        }
                    </div>
                    {
                        userRole === 'employer' &&
                        <Link to={pageUrl} className={styles.job_info_link}>{linkText}</Link>
                    }
                </div>
                {
                    userRole === 'freelancer' &&
                    <button
                        onClick={applyJob}
                        className={styles.job_apply_btn}
                        disabled={isAppliedJob}
                    >
                        {isAppliedJob ? 'Applied' : 'Apply'}
                    </button>
                }
            </div>
        </div>
    )
}

JobCard.propTypes = {
    title: propTypes.string,
    description: propTypes.string,
    requirements: propTypes.string,
    companyName: propTypes.string,
    contactInfo: propTypes.string,
    pageUrl: propTypes.string,
    linkText: propTypes.string,
    salary: propTypes.any,
    userRole: propTypes.string,
    applyJob: propTypes.func,
    isAppliedJob: propTypes.bool,
    applicationCount: propTypes.number,
}

export default JobCard;
