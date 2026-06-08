import styles from './OrderCard.module.css'
import { useState } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import TrashIcon from '../../assets/images/trash.svg?react'
import noImage from '../../assets/images/noimage.png'

const OrderCard = ({ product }) => {

    const [count, setCount] = useState(0)

    return (
        <div className={styles.orderCard}>
            <img src={product.imageUrl || noImage} />
            <div className={styles.orderInfo}>
                <div className={styles.orderInfoBlock}>
                    <span>{product.name}</span>
                    <p>{product.price}р</p>
                    <div className={styles.productCounter}>
                        <span>Количество:</span>
                        <div className={styles.counterBtns}>
                            <button>-</button>
                            <div>{count}</div>
                            <button>+</button>
                        </div>
                    </div>
                </div>

                <ButtonComponent
                    icon={<TrashIcon />}
                    className={styles.deleteBtn}
                >
                    Удалить
                </ButtonComponent>
            </div>
        </div>
    )
}

export default OrderCard