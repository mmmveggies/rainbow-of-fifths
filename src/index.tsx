import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Alert } from 'antd'
import WebMidi from 'webmidi'

import './index.css';
import 'antd/dist/antd.css'

const render = (node: React.ReactElement) => {
  ReactDOM.render(node, document.getElementById('root'))
}

WebMidi.enable((err) => {
  if (err) {
    render(
      <Alert
        type='error'
        message='Fatal WebMidi Error'
        description={<code><pre>{JSON.stringify(err, null, 2)}</pre></code>}
      />
    )
    return
  }

  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
