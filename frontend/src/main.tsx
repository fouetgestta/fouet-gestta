import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

try {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('[FOUET] Root element not found!');
  }
} catch (error) {
  console.error('[FOUET] Failed to initialize app:', error);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding:40px;font-family:sans-serif;color:red"><h1>Erro ao iniciar app</h1><pre>${error}</pre></div>`;
  }
}
