import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IModal} from './../types/components-types';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

const Modal: React.FC<IModal> = ({children, onClose, title}) => {
    useEffect(() => {
        const handleClose = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleClose);

        return () => {
            document.removeEventListener('keydown', handleClose);
        };
    }, [onClose]);

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose}/>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className="text text_type_main-large">{title}</h2>
                    <div onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </div>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    );
};


export default Modal;
