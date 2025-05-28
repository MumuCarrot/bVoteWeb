import "./search.css";

function Search(props) {
    return (
        <div className="Search">
            <input type="text" className="SearchInput" placeholder={props.placeholder} />
            <button type="submit" className="btn Submit" onClick={props.submit}></button>
        </div>
    );
}

export default Search;