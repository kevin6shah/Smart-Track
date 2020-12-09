import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading(Component) {
    return function WithLoadingComponent({ fetchState, ...props }) {
        if (fetchState === 'idle') {
            return (
                <p className="text-center">Nothing...</p>
            );

        } else if (fetchState === 'loading') {
            return (
                <Spinner animation="border" variant="dark" />
            );

        } else if (fetchState === 'error') {
            return (
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
            );

        }
        return (<Component {...props} />);
    }
}