import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Header } from './Header'
import './styles.css'
import App from './App'

function Overlay() {
  const [ready, set] = useState(false)
  return (
    <>
      {ready && <App />}

      <div className={`fullscreen bg ${ready ? 'ready' : 'notready'} ${ready && 'clicked'}`}>
        <div className="stack">
          <button onClick={() => set(true)}>▶️</button>
        </div>
      </div>
      <Header />

    </>
  )
}

ReactDOM.render(<Overlay />, document.getElementById('root'))
