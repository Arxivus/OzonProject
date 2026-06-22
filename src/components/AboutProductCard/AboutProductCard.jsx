import ButtonComponent from '../ButtonComponent/ButtonComponent'
import BasketIcon from '../../assets/images/basket.svg?react'
import styles from './AboutProductCard.module.css'
import noImage from '../../assets/images/noimage.png'
import { categoryTranslations } from '../../constants/variables'
import { useState, useEffect } from 'react'

const AboutProductCard = ({ product }) => {

    const [isAdded, setIsAdded] = useState(false)
    useEffect(() => {
        const localCart = sessionStorage.getItem('cart');
        let cart = localCart ? JSON.parse(localCart) : [];
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) setIsAdded(true)

    }, [])

    const handleButtonClick = (e) => {
        e.stopPropagation();
        const localCart = sessionStorage.getItem('cart');
        let cart = localCart ? JSON.parse(localCart) : [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (!existingProduct) {

            cart.push(product);
            sessionStorage.setItem('cart', JSON.stringify(cart));

            console.log('Товар добавлен в корзину');   
        }

        setIsAdded(true)
    }

    return (
        <div className={styles.productCard}>
            <div className={styles.product}>
                <img src={product.imageUrl || noImage} />
                <div className={styles.productInfo}>
                    <span>{product.name}</span>
                    <p>{product.price} {product.currency}</p>
                    <ButtonComponent
                        disabled={isAdded}
                        icon={<BasketIcon />}
                        className={styles.basketBtn}
                        onClick={handleButtonClick}
                    >
                        {isAdded ? 'Добавлен в корзину' : 'Добавить в корзину'}
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