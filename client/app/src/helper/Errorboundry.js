import React, { Component } from 'react';

// Custom Error Boundary for lazy-loaded components
class LazyLoadErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Optionally log the error to an error reporting service
    console.error('Error during lazy loading:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Show custom fallback UI (could be a temporary slide or some animation)
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-3xl text-red-500">Oops! Something went wrong while loading the page.</h2>
            <p className="text-xl">Please try again later or contact support.</p>
          </div>
        </div>
      );
    }

    // Render children components if no error
    return this.props.children;
  }
}

export default LazyLoadErrorBoundary;
