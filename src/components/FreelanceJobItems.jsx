import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../indexedDB';
import JobCard from "./JobCard";

const FreelanceJobItems = (props) => {

    // props
    const { job, loggedInUser } = props;

    const appliedJob = useLiveQuery(
        () => db.appliedjob.where({ userid: loggedInUser.id, jobid: job.id }).first(),
    );

    const applyJob = async () => {
        try {
            const { id } = loggedInUser;
            if (job?.userid) {
                await db.appliedjob.add({
                    userid: id,
                    jobid: job.id
                });
            }
            toast.success('Job Applied Successfully');
        } catch (error) {
            console.log('apply job error', error);
            toast.error('Failed to apply job');
        }
    }

    return (
        <JobCard
            title={job.job_title}
            description={job.job_description}
            requirements={job.job_requirements}
            companyName={job.job_company_name}
            contactInfo={job.job_contact_info}
            salary={job.job_salary_per_hour}
            isAppliedJob={appliedJob ? true : false}
            userRole={loggedInUser.role}
            applyJob={applyJob}
        />
    )

}

FreelanceJobItems.propTypes = {
    job: propTypes.object,
    isAppliedJob: propTypes.bool,
    loggedInUser: propTypes.object,
}


export default FreelanceJobItems;
