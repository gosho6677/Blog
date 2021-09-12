import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const isGuest = (WrappedComponent) => {
    const Component = props => {
        const user = useContext(AuthContext);
        const history = useHistory();

        useEffect(() => {
            if (!user.isAuthenticated && !user.initialLoad) {
                history.push('/');
                return null;
            }
        }, [user, history]);

        return <WrappedComponent {...props} />;
    };
    return Component;
};

export default isGuest;