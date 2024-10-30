import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './config/api.config.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
