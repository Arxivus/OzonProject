import styles from './OrdersPage.module.css'
import Layout from '../Layout'
import { useState } from 'react'

const OrdersPage = () => {

    const [ orders, setOrders ] = useState([
        { id: 'f47ac10b-58', orderSum: 15000, status: 'Собиратется' },
        { id: 'e32dc0wb-14', orderSum: 2500, status: 'В пути' },
        { id: 't27lc50bm78', orderSum: 3000, status: 'Доставлен' },
        
    ])

    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <h2>Корзина</h2>
                <div className={styles.ordersList}>
                    {
                        orders?.map( order => (
                            <div className={styles.order}>
                                <h3>Заказ #{order.id}</h3>
                                <div className={styles.orderInfo}>
                                    <span>
                                        Сумма заказа: <b>{order.orderSum} рублей</b>
                                    </span>
                                    <span>
                                        Статус: <b>{order.status}</b>
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default OrdersPage