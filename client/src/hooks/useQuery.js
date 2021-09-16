import { useLocation, useHistory } from 'react-router';
import { useCallback } from 'react';
import * as queryString from '../utils/queryStringParser';

// query is declared here to avoid infinite re-renders
let query = {
    page: 1,
    pageSize: 10,
    sort: 'oldest'
};

const useQuery = () => {
    const location = useLocation();
    const history = useHistory();
    query = {
        ...query,
        ...queryString.parse(location.search),
    };
    
    const setNewQuery = useCallback((q = {}) => {
        const key = Object.keys(q)[0];
        query[key] = q[key];

        history.push(`?${queryString.stringify(query)}`);
    }, [history]);

    return [query, setNewQuery];
};

export default useQuery;