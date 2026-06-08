import styles from './MainPage.module.css'
import Layout from '../Layout'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useState, useMemo } from 'react'
import { ModalWindow } from '../../components/ModalWindow/ModalWindow'
import AboutProductCard from '../../components/AboutProductCard/AboutProductCard'

const MainPage = () => {

    const [productShown, setProductShown] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [filters, setFilters] = useState({ name: '', category: '', price: [] });

    const [products, setProducts] = useState([
        { name: 'Unmatched: Битва Легенд. Том 3', price: '4400', category: 'Настольные и карточные игры', description: '' },
        { name: 'Велосипед Stels Navigator 480', price: '18000', category: 'Спорт и отдых', description: 'Горные велосипеды предназначены для покорения бездорожья и перемещения по грязи, снегу и гравию. Эти байки делают очень крепкими, у них толстые шины и прочные колеса, устойчивые к повреждениям от ударов. Рамы для горных велов производят из алюминия, стали, титана и карбона, их ресурс прочности рассчитан на большие нагрузки. Система амортизации на таких байках позволяет колесам поглощать вибрации и удары на неровной дороге. Существуют горные велосипеды с передней подвеской или с амортизацией на оба колеса. Обычно на горный вел ставят плоские рули, а райдер находится в вертикальном положении для баланса и контроля.' },
        { name: 'Велосипед Stels', price: '12500', category: 'Спорт и отдых', description: 'Горные велосипеды предназначены для покорения бездорожья и перемещения по грязи, снегу и гравию. Эти байки делают очень крепкими, у них толстые шины и прочные колеса, устойчивые к повреждениям от ударов. Рамы для горных велов производят из алюминия, стали, титана и карбона, их ресурс прочности рассчитан на большие нагрузки. Система амортизации на таких байках позволяет колесам поглощать вибрации и удары на неровной дороге. Существуют горные велосипеды с передней подвеской или с амортизацией на оба колеса. Обычно на горный вел ставят плоские рули, а райдер находится в вертикальном положении для баланса и контроля.' },
        { name: 'Велосипед Stels Navigator 480', price: '18000', category: 'Спорт и отдых', description: 'Горные велосипеды предназначены для покорения бездорожья и перемещения по грязи, снегу и гравию. Эти байки делают очень крепкими, у них толстые шины и прочные колеса, устойчивые к повреждениям от ударов. Рамы для горных велов производят из алюминия, стали, титана и карбона, их ресурс прочности рассчитан на большие нагрузки. Система амортизации на таких байках позволяет колесам поглощать вибрации и удары на неровной дороге. Существуют горные велосипеды с передней подвеской или с амортизацией на оба колеса. Обычно на горный вел ставят плоские рули, а райдер находится в вертикальном положении для баланса и контроля.' },
        { name: 'Велосипед', price: '10000', category: 'Спорт и отдых', description: 'Горные велосипеды предназначены для покорения бездорожья и перемещения по грязи, снегу и гравию. Эти байки делают очень крепкими, у них толстые шины и прочные колеса, устойчивые к повреждениям от ударов. Рамы для горных велов производят из алюминия, стали, титана и карбона, их ресурс прочности рассчитан на большие нагрузки. Система амортизации на таких байках позволяет колесам поглощать вибрации и удары на неровной дороге. Существуют горные велосипеды с передней подвеской или с амортизацией на оба колеса. Обычно на горный вел ставят плоские рули, а райдер находится в вертикальном положении для баланса и контроля.' },
        { name: 'Велосипед Stels', price: '15000', category: 'Спорт и отдых', description: 'Горные велосипеды предназначены для покорения бездорожья и перемещения по грязи, снегу и гравию. Эти байки делают очень крепкими, у них толстые шины и прочные колеса, устойчивые к повреждениям от ударов. Рамы для горных велов производят из алюминия, стали, титана и карбона, их ресурс прочности рассчитан на большие нагрузки. Система амортизации на таких байках позволяет колесам поглощать вибрации и удары на неровной дороге. Существуют горные велосипеды с передней подвеской или с амортизацией на оба колеса. Обычно на горный вел ставят плоские рули, а райдер находится в вертикальном положении для баланса и контроля.' },
    ])

    const handleQueryChange = (name) => { setFilters(prev => ({ ...prev, name: name || '' })) };

    const handleCategoryChange = (category) => { setFilters(prev => ({ ...prev, category: category?.value || '' })) };

    const handlePriceChange = (priceStart, priceEnd) => {
        const price = priceStart === '' ? [filters.price[0], Number(priceEnd)] : [Number(priceStart), filters.price[1]]
        setFilters(prev => ({ ...prev, price }));
    };

    const filteredCards = useMemo(() => {
        if (!products) return []
        return products.filter(() =>
            (!filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.category || product.category === filters.category) &&
            (!filters.price.length || (product.price >= filters.price[0] && product.price <= filters.price[1]))
        )
    }, [products, filters])

    const changeModalVisibility = () => {
        setModalVisible(modalVisible === true ? false : true)
    }

    return (
        <Layout>
            <div className={`container ${styles.mainContainer}`}>
                <div></div>
                <div className={styles.productsList}>
                    {
                        products?.map((product, index) => (
                            <ProductCard
                                key={index}
                                name={product.name}
                                price={product.price}
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