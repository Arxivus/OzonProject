import styles from './MainPage.module.css'
import selectStyles from '../../customStyles/select-styles'
import Layout from '../Layout'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchComponent from '../../components/SearchComponent/SearchComponent'
import { useState, useMemo, useEffect } from 'react'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import Select from 'react-select';
import SingleValue from 'react-select';
import AboutProductCard from '../../components/AboutProductCard/AboutProductCard'
import { productsdata, productCategories } from '../../testData'

const MainPage = () => {

    const [productShown, setProductShown] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [filters, setFilters] = useState({ name: '', category: '', price: [] });

    const [categories, setCategories] = useState(productCategories || [])
    const [products, setProducts] = useState(productsdata || [])
    const [filtered, setFiltered] = useState([])

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

            if (position === 'start') { newPrice = [numValue, currentPrice[1]] 
            } else { newPrice = [currentPrice[0], numValue] }

            if (newPrice[0] === undefined && newPrice[1] === undefined) { return { ...prev, price: [] } }

            return { ...prev, price: newPrice }
        });
    };

    const filterProducts = () => {
        if (!products) return [];

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
                        filtered?.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onClick={() => {
                                    changeModalVisibility()
                                    setProductShown(product)
                                }}
                            ></ProductCard>
                        ))
                    }
                </div>
                {
                    modalVisible && <ModalWindow
                        visible={modalVisible}
                        changeVisibility={changeModalVisibility}
                    >
                        <AboutProductCard
                            product={productShown}
                        ></AboutProductCard>
                    </ModalWindow>
                }
            </div>
        </Layout>
    )
}

export default MainPage