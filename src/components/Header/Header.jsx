import styles from './Header.module.css'
import LogoImg from '../../assets/images/logo-icon.svg?react'
import ShopBagImg from '../../assets/images/shop-bag.svg?react'
import BasketImg from '../../assets/images/basket.svg?react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className={styles.header}>
            <div className='container'>
                <div className={styles.headerBlock}>
                    <div className={styles.logo}>
                        <LogoImg />
                        <h2 className={styles.logoText}>WOW_Market</h2>
                    </div>
                    <nav className={styles.navItems}>
                        <Link to='/' className={styles.navItem}>
                            <ShopBagImg />
                            <h3>Товары</h3>
                        </Link>
                        <Link to='/cart' className={styles.navItem}>
                            <BasketImg />
                            <h3>Корзина</h3>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header