import propTypes from 'prop-types';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../indexedDB';
import JobCard from "./JobCard";


const EmployerJobItems = (props) => {

    // props
    const { job, loggedInUser } = props;

    const applicationCount = useLiveQuery(
        () => db.appliedjob.where({ jobid: job.id }).count(),
    );

    return (
        <JobCard
            title={job.job_title}
            description={job.job_description}
            requirements={job.job_requirements}
            companyName={job.job_company_name}
            contactInfo={job.job_contact_info}
            salary={job.job_salary_per_hour}
            pageUrl={`/employer/myjob/${job.id}`}
            linkText='View Applications >'
            userRole={loggedInUser.role}
            applicationCount={applicationCount}
        />
    )

}

EmployerJobItems.propTypes = {
    job: propTypes.object,
    loggedInUser: propTypes.loggedInUser,
};

export default EmployerJobItems;
