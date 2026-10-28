import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RecordsPage } from './pages/RecordsPage';
import { TemplatePage } from './pages/TemplatePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface flex flex-col justify-between">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-1">
          <Routes>
            {/* Default lands directly on Items page */}
            <Route path="/" element={<Navigate to="/items" replace />} />
            <Route path="/items" element={<RecordsPage />} />
            <Route path="/template" element={<TemplatePage />} />

            {/* 
              WHEN ADDING A NEW PAGE DURING THE TEST:
              Mount your page route here:
              <Route path="/new-page" element={<NewPage />} />
            */}

            {/* Fallback to Items */}
            <Route path="*" element={<Navigate to="/items" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-outline-variant/30 py-6 text-center text-xs text-on-surface-variant bg-surface-container-lowest">
          Nakshi Mini • Craft Heritage & Inventory
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
