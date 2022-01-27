import { hydrate } from 'react-dom'
import './styles.css'
import App from './App'

function WrappedApp() {
  return (<App />)
}

hydrate(<WrappedApp />, document.getElementById('root'))
