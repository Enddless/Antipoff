import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.tsx'
import "./main.module.scss"
import { Provider } from "react-redux";
import { store } from './store/index.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/Antipoff">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>

)
