import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against Vite HMR WebSocket closing without opened in sandbox/preview
if (typeof window !== 'undefined') {
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason = event.reason;
      const msg = typeof reason === 'string' ? reason : reason?.message || '';
      if (msg.includes('WebSocket') || msg.includes('websocket') || msg.includes('failed to connect')) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event) => {
      const msg = event.message || event.error?.message || '';
      if (msg.includes('WebSocket') || msg.includes('websocket') || msg.includes('failed to connect')) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
