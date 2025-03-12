import React from 'react';

const Notification = ({ message }) => {
    const notificationStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '15px 20px',
        borderRadius: '5px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        fontWeight: 'bold',
        opacity: 0,
        transform: 'translateY(-20px)',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
    };

    const shownStyle = {
        opacity: 1,
        transform: 'translateY(0)',
    };

    if (message === null) {
        return null;
    }

    return (
        <div style={message ? { ...notificationStyle, ...shownStyle } : notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;