import styles from './OrderCard.module.css'
import { useState } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import TrashIcon from '../../assets/images/trash.svg?react'
import noImage from '../../assets/images/noimage.png'

const OrderCard = ({ product, removeFunction }) => {

    return (
        <div className={styles.orderCard}>
            <img src={product.imageUrl || noImage} />
            <div className={styles.orderInfo}>
                <div className={styles.orderInfoBlock}>
                    <span>{product.name}</span>
                    <p>{product.price}р</p>
                </div>
                <ButtonComponent
                    icon={<TrashIcon />}
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