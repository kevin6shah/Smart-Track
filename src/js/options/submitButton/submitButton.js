import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function SubmitButton(props) {
    let disabled = false;
    let color = 'primary';
    let textMsg = 'Submit';
    let icon =
        <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>

    if (props.fetchState === 'loading') {
        color = 'warning';
        textMsg = 'Loading';
        icon =
            <Spinner animation="border" variant="dark" />
    } else if (props.fetchState === 'failure') {
        color = 'danger';
        textMsg = 'Failure';
        icon =
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-exclamation-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
    } else if (props.fetchState === 'success') {
        disabled = true;
        color = 'success';
        textMsg = 'Success';
        icon =
            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill="success" fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>;
    }
    return (
        <button className={"btn btn-lg btn-block mb-3 btn-" + color} type="submit" disabled={disabled}>
            {textMsg}
            &nbsp;
            {icon}
        </button>
    );
}