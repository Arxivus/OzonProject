import styles from './CartPage.module.css'
import Layout from '../Layout'
import OrderCard from '../../components/OrderCard/OrderCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { postOrder } from '../../apiRequest'
import toast from 'react-hot-toast';

const CartPage = ({ }) => {

    const [orderedProducts, setOrderedProducts] = useState([])
    const [orderSum, setOrderSum] = useState(0)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        shippingAddress: ''
    });

    useEffect(() => {
        const cartData = sessionStorage.getItem('cart');

        if (!cartData) return

        let cartProducts = JSON.parse(cartData)
        setOrderedProducts(cartProducts)
        console.log(cartProducts);
    }, [])


    useEffect(() => {
        const totalPrice = orderedProducts.reduce((sum, product) => sum + product.price, 0);
        setOrderSum(totalPrice.toFixed(2))

    }, [orderedProducts])

    const removeFromCart = (productId) => {
        const updatedCart = orderedProducts.filter(item => item.id !== productId);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));

        setOrderedProducts(updatedCart)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        handleClickOrder();
    };


    const handleClickOrder = async (e) => {
        const orderData = JSON.stringify(
            {
                customer: formData,
                items: orderedProducts.map(product => ({ id: product.id, quantity: 1 }))
            })
        console.log(orderData);
        const response = await postOrder(orderData)

        if (response) {
            sessionStorage.setItem('cart', JSON.stringify([]));
            toast.success('Заказ оформлен!')
            navigate('/orders')
        }

        else {
            toast.error('Не удалось создать заказ');
        }
    }

    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <div className={styles.orderProducts}>
                    <h2>Корзина</h2>
                    <div className={styles.orderCards}>
                        {
                            orderedProducts.length != 0 ? orderedProducts.map((product, index) => (
                                <OrderCard
                                    product={product}
                                    removeFunction={removeFromCart}
                                ></OrderCard>
                            )) : <div className='noDataText'>Корзина пуста...</div>
                        }
                    </div>
                </div>
                <form className={styles.orderForm} onSubmit={handleSubmit}>
                    <div className={styles.formFields}>
                        <div className={styles.formField}>
                            <label for='fullName'>Ваше ФИО:</label>
                            <input
                                required
                                type="text"
                                name='fullName'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='ФИО' />
                        </div>
                        <div className={styles.formField}>
                            <label for='email'>Email:</label>
                            <input
                                required
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='yourmail@mail.ru' />
                        </div>
                        <div className={styles.formField}>
                            <label for='email'>Телефон:</label>
                            <input
                                required
                                type="tel"
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+79008080111" />
                        </div>
                        <div className={styles.formField}>
                            <label for='city'>Адрес доставки:</label>
                            <input
                                required
                                type="text"
                                name='shippingAddress'
                                value={formData.shippingAddress}
                                onChange={handleChange}
                                placeholder='г. Екатеринбург, ул. Космонавтов, д. 8, кв. 4' />
                        </div>
                    </div>
                    <div className={styles.orderInfo}>
                        <div className={styles.orderSum}>
                            <span>Сумма заказа: </span>
                            <p>{orderSum}</p>
                        </div>
                        {
                            orderSum > 0 ?
                                <ButtonComponent
                                    type="submit"
                                    className={styles.orderBtn}
                                >
                                    Заказать
                                </ButtonComponent>
                                :
                                <></>
                        }
                    </div>

                </form>
            </div>
        </Layout>
    )
}

export default CartPage