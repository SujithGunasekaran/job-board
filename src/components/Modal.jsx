import propTypes from 'prop-types';
import styles from '../styles/modal.module.css';

const Modal = (props) => {

    // props
    const {
        children,
    } = props;

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    );
};

Modal.Header = (props) => {

    // props
    const {
        isDefault = false,
        title,
        closeModal,
        children,
    } = props;

    if (isDefault) {
        return (
            <div className={styles.modal_header_wrapper}>
                <h2 className={styles.modal_header_title}>{title}</h2>
                <div
                    className={styles.modal_header_icon}
                    onClick={closeModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
                        <path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)"></path><path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)"></path>
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.modal_header}>
            {children}
        </div>
    )

}
Modal.Header.displayName = 'Modal.Header';

Modal.Body = (props) => {

    // props
    const { children } = props;

    return (
        <div className={styles.modal_body}>{children}</div>
    )

}
Modal.Body.displayName = 'Modal.Body';

Modal.Footer = (props) => {

    // props
    const { children } = props;

    return (
        <div className={styles.modal_footer}>{children}</div>
    )

}

Modal.Footer.displayName = 'Modal.Footer';

Modal.propTypes = {
    children: propTypes.array,
};

Modal.Header.propTypes = {
    children: propTypes.element,
    onClose: propTypes.func,
    title: propTypes.string,
    closeModal: propTypes.func,
    isDefault: propTypes.bool,
};

Modal.Body.propTypes = {
    children: propTypes.element,
};

Modal.Footer.propTypes = {
    children: propTypes.element,
};

export default Modal;
