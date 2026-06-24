import styles from './OrdersPage.module.css'
import Layout from '../Layout'
import { useEffect, useState } from 'react'
import { getOrders, cancelOrder } from '../../apiRequest'
import { orderStatusTranslations } from '../../constants/variables'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import toast from 'react-hot-toast';

const OrdersPage = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders().then(data => setOrders(data))
    }, [])

    const handleClickCancel = async (orderId) => {
        
        const response = await cancelOrder(orderId)
        if (response) {
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId
                        ? { ...order, status: 'Cancelled' }
                        : order));
            toast.success('Заказ отменен');
        }

        else {
            toast.error('Не удалось отменить заказ');
        }
    }

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
                                    <span>
                                        Сумма заказа: <b>{order.totalAmount} {order.currency}</b>
                                    </span>
                                    <div className={styles.orderProducts}>
                                        <span>Товары:</span>
                                        {
                                            order.items?.map((product, index) => (
                                                <span key={index} className={styles.product}>{product.productName}</span>
                                            ))
                                        }
                                    </div>
                                    <span>
                                        Статус: <b>{orderStatusTranslations[order.status] || order.status}</b>
                                    </span>
                                    <span>
                                        Дата создания: <b>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</b>
                                    </span>
                                    {
                                        order.status != 'Cancelled' &&
                                        <ButtonComponent
                                            className={styles.cancelBtn}
                                            onClick={() => handleClickCancel(order.id)}
                                        >
                                            Отменить заказ
                                        </ButtonComponent>
                                    }
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