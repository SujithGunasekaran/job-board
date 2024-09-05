import propTypes from 'prop-types';
import styles from '../styles/circular-loader.module.css';


const CircularLoader = ({ className }) => {
    return (
        <div className={styles.circle_loader_container}>
            <div className={`${styles.circle_loader} ${className || ''}`}></div>
        </div>
    )
}

CircularLoader.propTypes = {
    className: propTypes.string
}

export default CircularLoader;
