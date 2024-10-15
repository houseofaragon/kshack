import { hydrateRoot } from 'react-dom'
import './index.css'
import App from './App'

function WrappedApp() {
  return (<App />)
}

hydrateRoot(<WrappedApp />, document.getElementById('root'))
