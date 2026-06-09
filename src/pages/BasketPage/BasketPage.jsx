import styles from './BasketPage.module.css'
import Layout from '../Layout'
import OrderCard from '../../components/OrderCard/OrderCard'
import { useEffect, useState } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const BasketPage = ({ }) => {

    const [ orderedProducts, setOrderedProducts ] = useState([
        { name: 'Велосипед Stels', price: '12500', category: 'Спорт и отдых' },
        { name: 'Велосипед', price: '10000', category: 'Спорт и отдых' },
    ])
    const [ orderSum, setOrderSum ] = useState(0)

    useEffect(() => {

        const totalPrice = orderedProducts?.reduce((sum, product) => sum + Number(product.price), 0);
        setOrderSum(totalPrice)
    }, [orderedProducts])

    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <div className={styles.orderProducts}>
                    <h2>Корзина</h2>
                    <div className={styles.orderCards}>
                        {
                            orderedProducts?.map((product, index) => (
                                <OrderCard
                                    product={product}
                                ></OrderCard>
                            ))
                        }
                    </div>
                </div>
                <form className={styles.orderForm}>
                    <div className={styles.formFields}>
                        <div className={styles.formField}>
                            <label for='city'>Город:</label>
                            <input type="text" name='sity' placeholder='Екатеринбург'/>
                        </div>
                        <div className={styles.formField}>
                            <label for='city'>Адрес пункта выдачи:</label>
                            <input type="text" name='sity' placeholder='ул. Космонавтов, д. 8'/>
                        </div>
                        <div className={styles.formField}>
                            <label for='email'>Email:</label>
                            <input type="email" name='email' placeholder='yourmail@mail.ru'/>
                        </div>
                    </div>
                    <div className={styles.orderInfo}>
                        <div className={styles.orderSum}>
                            <span>Сумма заказа: </span>
                            <p>{orderSum} рублей</p>
                        </div>
                        <ButtonComponent
                            className={styles.orderBtn}
                        >
                            Заказать
                        </ButtonComponent>
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default BasketPage