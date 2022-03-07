import { hydrate } from 'react-dom'
import './index.css'
import App from './App'

function WrappedApp() {
  return (<App />)
}

hydrate(<WrappedApp />, document.getElementById('root'))
