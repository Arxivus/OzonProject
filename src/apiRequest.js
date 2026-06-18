import { ADDRESS, API_PATH } from './constants/variables'
import axios from 'axios'

const getProducts = async () => {
    try {
        const request = await axios.get(`http://${ADDRESS}/${API_PATH}`);

        if (request.status === 200 && request.data.length > 0) {
            return request.data;
        }

        return [];

    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        return [];
    }
}

const getCategories = async () => {
    try {
        const request = await axios.get(`http://${ADDRESS}/${API_PATH}/categories`);

        if (request.status === 200 && request.data.length > 0) {
            return request.data;
        }
        
        return [];

    } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        return [];
    }
}

const getOrders = async () => {
    try {
        const request = await axios.get(`http://${ADDRESS}/${API_PATH}/orders`);

        if (request.status === 200 && request.data.length > 0) {
            return request.data;
        }
        
        return [];

    } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        return [];
    }
}

export {
    getProducts,
    getCategories,
}