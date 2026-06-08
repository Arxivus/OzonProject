import styles from './BasketPage.module.css'
import Layout from '../Layout'
import OrderCard from '../../components/OrderCard/OrderCard'
import { useState } from 'react'

const BasketPage = ({ }) => {

    const [orderedProducts, setOrderedProducts] = useState([{ name: 'Велосипед Stels', price: '12500', category: 'Спорт и отдых'}])
    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <div></div>
                <div className={styles.orderProducts}>
                    <h2>Корзина</h2>
                    <div>
                        {
                            orderedProducts?.map( (product, index) => (
                                <OrderCard
                                    product={product}
                                ></OrderCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default BasketPage