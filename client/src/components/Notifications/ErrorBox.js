import { useEffect } from 'react';
import './ErrorBox.css';

const ErrorBox = ({ error, setError }) => {
    const errorArr = error.split('\n');

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 10000);
    }, [setError]);

    const errorHandler = () => {
        setError('');
    };

    return (
        <div onClick={errorHandler} className="error">
            {errorArr.map(e => <p key={e}>{e}</p>)}
        </div>
    );
};
 
export default ErrorBox;