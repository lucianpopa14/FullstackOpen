import React from "react";

const Error = ({ error }) => {
  const errorStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
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

  if (error === null) {
    return null;
  }

  return (
    <div style={error ? { ...errorStyle, ...shownStyle } : errorStyle}>
      {error}
    </div>
  );
};

export default Error;