import ButtonComponent from '../ButtonComponent/ButtonComponent'
import styles from './AboutProductCard.module.css'
import noImage from '../../assets/images/noimage.png'
import { categoryTranslations } from '../../constants/variables'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const AboutProductCard = ({ product, inCart, addToCart }) => {

    const handleButtonClick = (e) => {
        e.stopPropagation();
        addToCart(product)
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.product}>
                <img src={product.imageUrl || noImage} />
                <div className={styles.productInfo}>
                    <span>{product.name}</span>
                    <p>{product.price} {product.currency}</p>
                    <ButtonComponent
                        disabled={inCart}
                        icon={<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.5H1.95406C2.75573 1.5 3.15727 1.5 3.48424 1.63607C3.77252 1.75604 4.019 1.94919 4.19674 2.19411C4.398 2.47144 4.47067 2.84177 4.61573 3.58099L8.26834 22.1942L25.9027 22.1941C26.6695 22.1941 27.0541 22.1941 27.3718 22.0666C27.6524 21.954 27.8944 21.7716 28.0741 21.5398C28.2773 21.2775 28.3634 20.9265 28.5355 20.2251L28.5368 20.2201L31.192 9.39554L31.1926 9.39327C31.4536 8.3293 31.5844 7.79603 31.4407 7.37774C31.3147 7.01072 31.0495 6.69954 30.6977 6.50148C30.2964 6.27556 29.7166 6.27556 28.554 6.27556H5.73017M26.881 30.1534C25.9465 30.1534 25.189 29.4407 25.189 28.5615C25.189 27.6824 25.9465 26.9697 26.881 26.9697C27.8155 26.9697 28.5731 27.6824 28.5731 28.5615C28.5731 29.4407 27.8155 30.1534 26.881 30.1534ZM9.96035 30.1534C9.02584 30.1534 8.26828 29.4407 8.26828 28.5615C8.26828 27.6824 9.02584 26.9697 9.96035 26.9697C10.8949 26.9697 11.6524 27.6824 11.6524 28.5615C11.6524 29.4407 10.8949 30.1534 9.96035 30.1534Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        }
                        className={styles.basketBtn}
                        onClick={handleButtonClick}
                    >
                        {inCart ? 'Добавлен в корзину' : 'Добавить в корзину'}
                    </ButtonComponent>
                </div>
            </div>

            <div className={styles.productTextInfo}>
                <div className={styles.productInfoField}>
                    <span>Категория: </span>
                    <p>{categoryTranslations[product.category] || 'Не указана'}</p>
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