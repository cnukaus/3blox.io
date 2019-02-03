import React, { Component } from 'react'
import './Page.css'
import { getRelayers } from './action'

const mapStateToProps = state =>({
  loading: state.loading,
  relayers: state.relayers
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRelayers: () => dispatch(getRelayers())
  }
}


class Page extends Component {
  render() {
    return (
      <div className="App">

      </div>
    )
  }
}

export default Page
