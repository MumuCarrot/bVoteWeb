'use client';
import styles from './search.module.css';

type SearchProps = {
    placeholder: string;
    submit: () => void;
};

function Search({ placeholder, submit }: SearchProps) {
    return (
        <div className={styles.search}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
            />
            <button
                type="submit"
                className={`btn ${styles.submit}`}
                onClick={submit}
            ></button>
        </div>
    );
}

export default Search;
