import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(err) {
    console.log(err)
    return { hasError: true }
  }

  componentDidCatch(err, info) {
    console.error(err, info)
  }

  resetErrorState() {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export default ErrorBoundary
