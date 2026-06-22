import { ADDRESS, API_PATH } from './constants/variables'
import axios from 'axios'
import { categoryTranslations } from './constants/variables';


const getProducts = async (page, pageSize = 20) => {
    try {
        const request = await axios.get(`http://${ADDRESS}:5000/${API_PATH}/products`, { params: { page, pageSize } });

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
        const request = await axios.post(`http://${ADDRESS}:5010/${API_PATH}/orders`, order);
        if (request.status === 200) {
            return true;
        }
    }

    catch (error) {
        console.error('Не удалось создать заказ:', error);
        return;
    }
}

/* const getProductsMock = async (page, pageSize = 20) => {
    const mockItems = Array.from({ length: pageSize }, (_, i) => ({
        id: `mock-${page}-${i}`,
        name: `Товар ${page * pageSize + i + 1}`,
        price: 99.99 + i,
        description: 'Тестовый товар',
        currency: 'USD'
    }));

    return {
        items: mockItems,
        totalPages: 5,
        hasNext: page < 5
    };
}; */

export {
    getProducts,
    getCategories,
    getOrders,
    postOrder,
    /* getProductsMock */
}