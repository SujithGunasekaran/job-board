import propTypes from 'prop-types';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../indexedDB';
import styles from '../styles/job-application.module.css';

const JobApplicationItems = (props) => {

    // props
    const { userId } = props;

    const userInfo = useLiveQuery(
        () => db.users.where({ id: userId }).first(),
    );

    return (
        <>
            {
                userInfo &&
                <div className={styles.job_application_item}>
                    <div className={styles.job_application_item_info_wrapper}>
                        <div className={styles.job_application_item_info_title}>
                            Email
                        </div>
                        <div className={styles.job_application_item_info_description}>
                            {userInfo?.email ?? 'NA'}
                        </div>
                    </div>
                    <div className={styles.job_application_item_info_wrapper}>
                        <div className={styles.job_application_item_info_title}>
                            Skills
                        </div>
                        <div className={styles.job_application_item_info_description}>
                            {userInfo?.skills ?? 'NA'}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

JobApplicationItems.propTypes = {
    userId: propTypes.number,
};

export default JobApplicationItems;
