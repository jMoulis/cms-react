import React from 'react';
import PropTypes from 'prop-types';

const ErrorBoundaryContent = ({ message }) => {
  return (
    <div>
      <h1>Our bad, Something went wrong</h1>
      <p>
        You should just refresh the page (f5, ctrl+r or your browser refresh
        button) or by clicking the following button
      </p>
      <button type="button" onClick={() => window.location.reload()}>
        Refresh
      </button>
      <p>{message}</p>
      <p>Sorry for the incoveniance</p>
      <p>If it happens again please leave us a message</p>
    </div>
  );
};

ErrorBoundaryContent.propTypes = {
  message: PropTypes.string,
};

ErrorBoundaryContent.defaultProps = {
  message: '',
};

export default ErrorBoundaryContent;
