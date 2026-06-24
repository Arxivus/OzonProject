import { ADDRESS, API_PATH } from './constants/variables'
import axios from 'axios'
import { categoryTranslations } from './constants/variables';


const getProducts = async (page, pageSize = 20) => {
    try {
        const request = await axios.get(`http://${ADDRESS}:5000/${API_PATH}/products`,
            { params: { page, pageSize } }
        );

        if (request.status === 200 && request.data.items.length > 0) {
            console.log(request.data);

            return {
                items: request.data.items,
                totalPages: request.data.totalPages,
                hasNext: request.data.hasNext
            };
        }

        return { items: [], totalPages: 0, hasNext: false };

    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        return { items: [], totalPages: 0, hasNext: false };
    }
};

const getCategories = async () => {
    try {
        const request = await axios.get(`http://${ADDRESS}:5000/${API_PATH}/products/categories`);

        if (request.status === 200 && request.data.length > 0) {
            const data = request.data

            const categories = [
                { label: 'Все категории', value: '' },
                ...data.map(category => ({
                    label: categoryTranslations[category] || category,
                    value: category
                }))
            ];
            return categories;
        }

        return [];

    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        return [];
    }
}

const getOrders = async () => {
    try {
        const request = await axios.get(`http://${ADDRESS}:5010/${API_PATH}/orders`);

        if (request.status === 200) {
            console.log(request.data);
            return request.data.items;
        }

        return [];

    } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        return [];
    }
}

const postOrder = async (order) => {
    try {
        const response = await axios.post(`http://${ADDRESS}:5010/${API_PATH}/orders`,
            order,
            { headers: { 'Content-Type': 'application/json', } }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
    }

    catch (error) {
        console.error('Не удалось создать заказ:', error);
        return;
    }
}

const payForOrder = async (orderId) => {
    try {
        const response = await axios.post(`http://${ADDRESS}:5010/${API_PATH}/orders/${orderId}/pay`,
            orderId,
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
    }

    catch (error) {
        console.error('Оплата не прошла:', error);
        return;
    }
}

const cancelOrder = async (orderId) => {
    try {
        const response = await axios.post(`http://${ADDRESS}:5010/${API_PATH}/orders/${orderId}/cancel`,
            { reason: "some reason" },
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
    }

    catch (error) {
        console.error('Заказ не отменен:', error);
        return;
    }
}

export {
    getProducts,
    getCategories,
    getOrders,
    postOrder,
    payForOrder,
    cancelOrder
}