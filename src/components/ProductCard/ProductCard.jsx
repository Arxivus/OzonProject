import styles from './ProductCard.module.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import noImage from '../../assets/images/noimage.png'
import { useState, useEffect } from 'react'

const ProductCard = ({ product, onClick }) => {

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
        <div
            onClick={onClick}
            className={styles.card}
        >
            <img className={styles.cardImg} src={
                product.imageUrl || noImage
            } />
            <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>
                        {product.name}
                    </span>
                    <p className={styles.cardPrice}>
                        {product.price} {product.currency}
                    </p>
                </div>
                <ButtonComponent
                    disabled={isAdded}
                    className={styles.cardBtn}
                    onClick={handleButtonClick}
                >
                    {isAdded ? 'Добавлен' : 'В корзину'}
                </ButtonComponent>
            </div>
        </div>
    )
}

export default ProductCard