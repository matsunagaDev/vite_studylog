import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StudyRecordsApp } from './StudyRecordsApp.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyRecordsApp />
  </StrictMode>
);
