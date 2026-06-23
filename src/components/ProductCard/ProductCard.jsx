import styles from './ProductCard.module.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import noImage from '../../assets/images/noimage.png'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const ProductCard = ({ product, onClick, inCart, addToCart }) => {

    const handleButtonClick = (e) => {
        e.stopPropagation();
        addToCart(product)
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
                    disabled={inCart}
                    className={styles.cardBtn}
                    onClick={handleButtonClick}
                >
                    {inCart ? 'Добавлен' : 'В корзину'}
                </ButtonComponent>
            </div>
        </div>
    )
}

export default ProductCard