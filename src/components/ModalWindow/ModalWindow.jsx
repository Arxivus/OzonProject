import { useEffect, useState } from 'react';
import styles from './ModalWindow.module.css'


export const ModalWindow = ({ visible, children, changeVisibility }) => {

    const [status, setStatus] = useState('')

    useEffect(() => {
        if (visible) setStatus('visible')
    }, [visible])

    return (
        <div className={`${styles.modalLayout} ${status ? styles.visible : ''}`} onClick={() => {
            setStatus('')
            changeVisibility()
        }}>
            <div className={`${styles.modalContent}`} onClick={(e) => {
                e.stopPropagation()
            }}>
                {children}
                <div
                    className={styles.closeModal}
                    onClick={() => {
                        setStatus('')
                        changeVisibility()
                    }}
                >Закрыть</div>
            </div>
        </div>
    )
} 