import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import queryClient from './services/useQuery'
import {
  QueryClientProvider
} from 'react-query'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
