import "./search.css";

function Search(props) {
    return (
        <div className="search">
            <input type="text" className="search__input" placeholder={props.placeholder} />
            <button type="submit" className="btn submit" onClick={props.submit}></button>
        </div>
    );
}

export default Search;