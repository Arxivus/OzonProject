import styles from './OrdersPage.module.css'
import Layout from '../Layout'
import { useEffect, useState } from 'react'
import { getOrders } from '../../apiRequest'

const OrdersPage = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders().then(data => setOrders(data))
    }, [])

    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <h2>Ваши заказы</h2>
                <div className={styles.ordersList}>
                    {
                        orders.length != 0 ? orders.map((order, index) => (
                            <div key={index} className={styles.order}>
                                <h3>Заказ #{order.id}</h3>
                                <div className={styles.orderInfo}>
                                    {/* <span>
                                        Сумма заказа: <b>{order.orderSum}</b>
                                    </span> */}
                                    <span>
                                        Статус: <b>{order.status}</b>
                                    </span>
                                </div>
                            </div>
                        )) : <div className='noDataText'>У вас нет заказов</div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default OrdersPage