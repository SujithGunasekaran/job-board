import propTypes from 'prop-types';
import Select from './InputComponents/Select';
import { jobBoardFilterOptions, jobBoardSortOptions } from '../constants';
import styles from '../styles/job-board-filter.module.css';

const JobFilter = (props) => {

    // props
    const {
        selectedFilterValue,
        handleSelectChange
    } = props;


    return (
        <div className={styles.job_board_filter_wrapper}>
            <div>
                <Select
                    name='skill'
                    displayName='Filter By:'
                    value={selectedFilterValue?.skill ?? ''}
                    emptyPlaceholder='Select skill'
                    options={jobBoardFilterOptions}
                    handleChange={handleSelectChange}
                />
            </div>
            <div>
                <Select
                    name='sort'
                    displayName='Sort By:'
                    value={selectedFilterValue?.sort ?? ''}
                    emptyPlaceholder='Select sort'
                    options={jobBoardSortOptions}
                    handleChange={handleSelectChange}
                />
            </div>
        </div>
    )
}

JobFilter.propTypes = {
    selectedFilterValue: propTypes.object,
    handleSelectChange: propTypes.func,
}

export default JobFilter;
