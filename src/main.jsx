import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'

import { extendTheme } from '@chakra-ui/react'
import CartProvider from './context/CartContext'
const theme = extendTheme({
  colors: {
    test: '#6096B4',
    test2: '#93BFCF',
    test3: '#BDCDD6',
    test4: '#EEE9DA'
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
