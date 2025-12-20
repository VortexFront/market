import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';       // путь к твоему компоненту App
import '@/styles/index.css';   // путь к твоим стилям (подкорректируй, если нужно)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
