import React, { Component } from 'react'
import {connect} from 'react-redux'
import './Page.css'
import { getRelayers } from './action'

const mapStateToProps = state => ({
  loading: state.loading,
  relayers: state.relayers
})

class Page extends Component {
  componentDidMount() {
    this.props.dispatch(getRelayers())
  }

  render() {
    console.log('props', this.props)
    const {loading} = this.props
    console.log('loading', loading)
    return (
      <div className="App">
        Loading: {loading ? 'yes' : 'no'}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Page);
