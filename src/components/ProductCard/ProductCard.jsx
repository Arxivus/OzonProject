import styles from './ProductCard.module.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import noImage from '../../assets/images/noimage.png'
import { useState } from 'react'

const ProductCard = ({ product, onClick }) => {

    const [isAdded, setIsAdded] = useState(false)

    const handleButtonClick = (e) => {
        e.stopPropagation();

        const localCart = sessionStorage.getItem('cart');
        let cart = localCart ? JSON.parse(localCart) : [];

        cart.push(product);
        sessionStorage.setItem('cart', JSON.stringify(cart));
        setIsAdded(true)

        console.log('Товар добавлен в корзину');
    };

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
                        {product.price}р
                    </p>
                </div>
                {
                    isAdded ?
                        <ButtonComponent
                            disabled={true}
                            className={styles.cardBtn}
                            onClick={handleButtonClick}
                        >
                            Добавлен
                        </ButtonComponent>
                        :
                        <ButtonComponent
                            className={styles.cardBtn}
                            onClick={handleButtonClick}
                        >
                            В корзину
                        </ButtonComponent>
                }
            </div>
        </div>
    )
}

export default ProductCard