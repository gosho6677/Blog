const Search = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            <label htmlFor="search-bar" className="search-p" value="Search">Search: </label>
            <input
                id="search-bar"
                type="text"
                className="search-input"
                name="searchValue"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
        </>
    );
};

export default Search;