import React from "react";
import styles from '../modal/modal-overlay.module.css'
import {IModalOverlay} from './../types/components-types'

const ModalOverlay: React.FC<IModalOverlay> = ({onClose}) => {
    return (
        <div className={styles.overlayBack} onClick={onClose}></div>
    )
}
export default ModalOverlay;