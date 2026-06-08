import styles from './ProductCard.module.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import noImage from '../../assets/images/noimage.png'

const ProductCard = ({ imageUrl, name, price, onClick }) => {

    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log('Добавлен в корзину:', name);
    };

    return (
        <div
            onClick={onClick}
            className={styles.card}
        >
            <img className={styles.cardImg} src={
                imageUrl || noImage
            } />
            <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                    <span className={styles.cardTitle}>
                        {name}
                    </span>
                    <p className={styles.cardPrice}>
                        {price}р
                    </p>
                </div>
                <ButtonComponent
                    className={styles.cardBtn}
                    onClick={handleButtonClick}
                >
                    В корзину
                </ButtonComponent>
            </div>
        </div>
    )
}

export default ProductCard