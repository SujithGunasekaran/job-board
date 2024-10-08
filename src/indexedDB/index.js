import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
    users: '++id, email, role, github_username, skills, github_project',
    jobposts: '++id, userid, job_title, job_description, job_requirements, job_company_name, job_contact_info, job_salary_per_hour, application_count',
    appliedjob: '++id, userid, jobid'
});
