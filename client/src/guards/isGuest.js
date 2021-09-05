import { useContext, useEffect } from 'react';
// import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const isGuest = (WrappedComponent) => {
    const Component = props => {
        const user = useContext(AuthContext);
        const history = useHistory();

        useEffect(() => {
            if (!user) {
                history.push('/');
                return null;
            }
        });

        return <WrappedComponent {...props} />;
    };
    return Component;
};

export default isGuest;