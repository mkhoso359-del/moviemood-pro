import { Component } from 'react'
import { ErrorState } from './States'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('MovieMood Pro crashed:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ paddingTop: 120 }}>
          <ErrorState
            message="Something went wrong rendering this page."
            onRetry={this.handleReset}
          />
        </div>
      )
    }
    return this.props.children
  }
}
