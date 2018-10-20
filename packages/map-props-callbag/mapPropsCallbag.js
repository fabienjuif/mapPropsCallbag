import React from 'react'
import of from 'callbag-of'
import { forEach } from 'callbag-basics'

const getDisplayName = c => c.displayName || c.name || 'Component'

export default callbagFactory => Component => {
  class WrappedComponent extends React.Component {
    constructor(props, context) {
      super(props, context)

      this.state = {
        $$callbagProps: {},
      }
    }

    componentDidMount() {
      const props$ = callbagFactory(of(this.props))

      // TODO: I don't know if we need to "unplug" this (I don't think so)
      forEach($$callbagProps => this.setState({ $$callbagProps }))(props$)
    }

    render() {
      const { $$callbagProps } = this.state

      return React.createElement(Component, $$callbagProps)
    }
  }

  WrappedComponent.displayName = `mapPropsCallbag(${getDisplayName(Component)})`

  return WrappedComponent
}
