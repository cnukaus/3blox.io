import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Page from './Page'
import * as serviceWorker from './serviceWorker'
import { Provider as StoreProvider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/brown'
import amber from '@material-ui/core/colors/amber'
import store from './store'

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: amber
  },
  typography: {
    useNextVariants: true,
  },
})

function App(){
  return <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <Page />
    </MuiThemeProvider>
  </StoreProvider>
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
