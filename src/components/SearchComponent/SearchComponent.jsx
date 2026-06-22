import styles from './SearchComponent.module.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
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
                <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 25.8778L18.6667 17.9185M2 11.2858C2 12.5052 2.25147 13.7127 2.74006 14.8393C3.22865 15.9659 3.94478 16.9896 4.84757 17.8519C5.75036 18.7141 6.82213 19.3981 8.00169 19.8648C9.18124 20.3314 10.4455 20.5716 11.7222 20.5716C12.999 20.5716 14.2632 20.3314 15.4428 19.8648C16.6223 19.3981 17.6941 18.7141 18.5969 17.8519C19.4997 16.9896 20.2158 15.9659 20.7044 14.8393C21.193 13.7127 21.4444 12.5052 21.4444 11.2858C21.4444 10.0664 21.193 8.85889 20.7044 7.73229C20.2158 6.60568 19.4997 5.58202 18.5969 4.71975C17.6941 3.85748 16.6223 3.1735 15.4428 2.70684C14.2632 2.24018 12.999 2 11.7222 2C10.4455 2 9.18124 2.24018 8.00169 2.70684C6.82213 3.1735 5.75036 3.85748 4.84757 4.71975C3.94478 5.58202 3.22865 6.60568 2.74006 7.73229C2.25147 8.85889 2 10.0664 2 11.2858Z" stroke="#9A9A9A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </button>
        </div>

    )
}

export default SearchComponent