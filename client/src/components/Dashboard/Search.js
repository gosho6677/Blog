const Search = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            <p className="search-p" value="Search">Search: </p>
            <input
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