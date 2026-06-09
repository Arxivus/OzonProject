import styles from './SearchComponent.module.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import SearchIcon from '../../assets/images/search.svg?react'
import { useRef, ChangeEvent } from 'react'

const SearchComponent = ({ btnOnClick, onChange }) => {
    const inputRef = useRef(null)

    return (
        <div className={styles.search}>
            <input
                ref={inputRef}
                onChange={onChange}
                className={styles.searchInput}
                placeholder='Поиск...'
            >
            </input>
            <button
                onClick={btnOnClick}
                className={styles.searchBtn}
            >
                <SearchIcon />
            </button>
        </div>

    )
}

export default SearchComponent