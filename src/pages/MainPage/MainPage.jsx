import styles from './MainPage.module.css'
import selectStyles from '../../customStyles/select-styles'
import Layout from '../Layout'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchComponent from '../../components/SearchComponent/SearchComponent'
import { useState, useMemo, useEffect, useRef } from 'react'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import Select from 'react-select';
import SingleValue from 'react-select';
import AboutProductCard from '../../components/AboutProductCard/AboutProductCard'
import { getCategories, getProducts } from '../../apiRequest'
import toast from 'react-hot-toast';

const MainPage = () => {

    const [productShown, setProductShown] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    const [filters, setFilters] = useState({ name: '', category: '', price: [] });
    const [categories, setCategories] = useState([])
    const [filtered, setFiltered] = useState([])

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef(null);

    // Добавление товаров в локальное хранилище (корзину)

    const [cart, setCart] = useState(() => {
        const saved = sessionStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const inCart = (productId) => {
        return cart.find(item => item.id === productId);
    };

    const addToCart = (product) => {

        if (!inCart(product.id)) {
            setCart([...cart, product])
            toast.success('Товар добавлен в корзину');
        }
    }

    // Подгрузка товаров в каталог

    const loadMoreProducts = async (currentPage) => {
        if (loading || (!hasNext && page > 1)) return;

        setLoading(true);
        try {
            const data = await getProducts(currentPage, 20);

            if (data.items.length > 0) {
                setProducts(prev => [...prev, ...data.items]);
                setTotalPages(data.totalPages);
                setHasNext(data.hasNext);
            }

        } catch (err) {
            toast.error('Ошибка загрузки товаров');

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNext && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasNext, loading]);

    useEffect(() => {
        if (page === 1 && products.length === 0) {
            loadMoreProducts(1);
        } else if (page > 1) {
            loadMoreProducts(page);
        }
    }, [page]);


    // Получение категорий и фильтрация товаров

    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products]);

    const handleQueryChange = (name) => { setFilters(prev => ({ ...prev, name: name || '' })) };

    const handleCategoryChange = (category) => { setFilters(prev => ({ ...prev, category: category?.value || '' })) };

    const handlePriceChange = (value, position) => {
        const numValue = value === '' ? undefined : Number(value);

        setFilters(prev => {
            const currentPrice = prev.price || [undefined, undefined]
            let newPrice = []

            if (position === 'start') {
                newPrice = [numValue, currentPrice[1]]
            } else { newPrice = [currentPrice[0], numValue] }

            if (newPrice[0] === undefined && newPrice[1] === undefined) { return { ...prev, price: [] } }

            return { ...prev, price: newPrice }
        });
    };

    const filterProducts = () => {
        if (!products) setFiltered([]);

        setFiltered(
            products.filter((product) =>
                (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
                (!filters.category || product.category === filters.category) &&
                (!filters.price.length || (product.price >= filters.price[0] && product.price <= filters.price[1]))
            ))
    }

    const changeModalVisibility = () => {
        setModalVisible(modalVisible === true ? false : true)
    }

    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <SearchComponent
                    onChange={(e) => handleQueryChange(e.target.value)}
                    btnOnClick={filterProducts}
                >
                </SearchComponent>
                <div className={styles.filters}>
                    <div className={styles.selectFilter}>
                        <label for='category'>Категория:</label>
                        <Select
                            id='category'
                            options={categories}
                            styles={selectStyles}
                            onChange={handleCategoryChange}
                            placeholder=''
                        ></Select>
                    </div>
                    <div className={styles.inputFilter}>
                        <label for='priceStart'>Цена от:</label>
                        <input
                            id='priceStart'
                            type='number'

                            onChange={(e) => handlePriceChange(e.target.value, 'start')}
                            placeholder=''
                        ></input>
                    </div>
                    <div className={styles.inputFilter}>
                        <label for='priceEnd'>до:</label>
                        <input
                            id='priceEnd'
                            type='number'

                            onChange={(e) => handlePriceChange(e.target.value, 'end')}
                            placeholder=''>
                        </input>
                    </div>
                </div>
                <div className={styles.productsList}>
                    {
                        filtered.length != 0 ? filtered.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onClick={() => {
                                    changeModalVisibility()
                                    setProductShown(product)
                                }}
                                inCart={inCart(product.id)}
                                addToCart={addToCart}
                            ></ProductCard>
                        )) : <div className='noDataText'>Товары не найдены...</div>
                    }
                </div>

                <div ref={loaderRef}>
                    {
                        loading && <div className='noDataText'>Загрузка товаров...</div>
                    }
                </div>

                {
                    modalVisible && <ModalWindow
                        visible={modalVisible}
                        changeVisibility={changeModalVisibility}
                    >
                        <AboutProductCard
                            product={productShown}
                            inCart={inCart(productShown.id)}
                            addToCart={addToCart}
                        ></AboutProductCard>
                    </ModalWindow>
                }
            </div>
        </Layout>
    )
}

export default MainPage