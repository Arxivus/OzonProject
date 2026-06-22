import styles from './OrderCard.module.css'
import { useState } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import noImage from '../../assets/images/noimage.png'

const OrderCard = ({ product, removeFunction }) => {

    return (
        <div className={styles.orderCard}>
            <img src={product.imageUrl || noImage} />
            <div className={styles.orderInfo}>
                <div className={styles.orderInfoBlock}>
                    <span>{product.name}</span>
                    <p>{product.price} {product.currency}</p>
                </div>
                <ButtonComponent
                    icon={<svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.63365 11.0002H11.4908M2.49082 9.33358H11.6337M3.51459 4.33358H10.6096M3.51459 4.33358C3.01052 4.33358 2.75845 4.33358 2.57261 4.43435C2.40934 4.52289 2.28032 4.66383 2.20605 4.83407C2.12154 5.02777 2.14304 5.27863 2.18606 5.78052L2.85296 13.5611C2.9267 14.4213 2.96364 14.8524 3.15486 15.1779C3.32327 15.4646 3.57383 15.6942 3.87388 15.8375C4.2146 16.0002 4.64634 16.0002 5.51003 16.0002H8.61428C9.47798 16.0002 9.90981 16.0002 10.2505 15.8375C10.5506 15.6942 10.801 15.4646 10.9694 15.1779C11.1607 14.8523 11.1976 14.4216 11.2713 13.5611L11.9384 5.77917C11.9813 5.27785 12.0028 5.02766 11.9183 4.83407C11.844 4.66383 11.7151 4.52289 11.5518 4.43435C11.366 4.33358 11.1136 4.33358 10.6096 4.33358M3.51459 4.33358H2.68686C1.93721 4.33358 1.56215 4.33358 1.34418 4.17651C1.15177 4.03787 1.02765 3.82371 1.00274 3.58787C0.974488 3.3205 1.16132 2.99355 1.53379 2.34172C1.81227 1.85438 1.95151 1.61071 2.14693 1.43319C2.32163 1.27448 2.52799 1.15478 2.75246 1.08184C3.00354 1.00024 3.2841 1.00024 3.8454 1.00024H10.2789C10.8402 1.00024 11.1208 1.00024 11.3719 1.08184C11.5964 1.15478 11.8026 1.27448 11.9773 1.43319C12.1727 1.61071 12.312 1.85438 12.5904 2.34172C12.9631 2.99378 13.1497 3.32045 13.1215 3.58787C13.0966 3.82371 12.9724 4.03787 12.78 4.17651C12.562 4.33358 12.1867 4.33358 11.437 4.33358H10.6096" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    }
                    className={styles.deleteBtn}
                    onClick={() => removeFunction(product.id)}
                >
                    Удалить
                </ButtonComponent>
            </div>
        </div>
    )
}

export default OrderCard


{/* < div className = { styles.productCounter } >
                        <span>Количество:</span>
                        <div className={styles.counterBtns}>
                            <button>-</button>
                            <div>{count}</div>
                            <button>+</button>
                        </div>
                    </div > */}