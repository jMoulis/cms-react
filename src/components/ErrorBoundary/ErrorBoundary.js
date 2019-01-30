import React from 'react';
import ErrorBoundaryPage from './ErrorBoundaryContent';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  async componentDidCatch(error, info) {
    try {
      this.setState(() => ({ hasError: true, message: error.message }));
    } catch (err) {
      this.setState(() => ({
        hasError: true,
        message: err.message,
      }));
    }
  }

  render() {
    const { hasError, message } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <ErrorBoundaryPage message={message} />;
    }
    return children;
  }
}

export default ErrorBoundary;
