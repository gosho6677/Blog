import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(err) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error) {
        console.error('Error from componentDidCatch: ', error);
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong! Please try reloading!</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;