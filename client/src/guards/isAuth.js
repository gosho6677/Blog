import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const isAuth = (WrappedComponent) => {
    const Component = props => {
        const user = useContext(AuthContext);
        const history = useHistory();
        
        useEffect(() => {
            if (user) {
                history.push('/dashboard');
                return null;
            }
        });

        return <WrappedComponent {...props} />;
    };
    return Component;
};

export default isAuth;