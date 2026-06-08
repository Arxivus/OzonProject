import ButtonComponent from '../ButtonComponent/ButtonComponent'
import BasketIcon from '../../assets/images/basket.svg?react'
import styles from './AboutProductCard.module.css'
import noImage from '../../assets/images/noimage.png'

const AboutProductCard = ({ product }) => {

    return (
        <div className={styles.productCard}>
            <div className={styles.product}>
                <img src={product.imageUrl || noImage} />
                <div className={styles.productInfo}>
                    <span>{product.name}</span>
                    <p>{product.price} рублей</p>
                    <ButtonComponent
                        icon={<BasketIcon />}
                        className={styles.basketBtn}
                    >
                        Добавить в корзину
                    </ButtonComponent>
                </div>
            </div>

            <div className={styles.productTextInfo}>
                <div className={styles.productInfoField}>
                    <span>Категория: </span>
                    <p>{product.category || 'Не указана'}</p>
                </div>
                <div className={`${styles.productInfoField} ${styles.splited}`}> 
                    <span>Описание: </span>
                    <p>{product.description || 'Не указано'}</p>
                </div>
            </div>
        </div>
    )
}

export default AboutProductCard