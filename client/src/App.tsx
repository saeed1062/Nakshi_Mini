import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { RecordsPage } from './pages/RecordsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/items" replace />} />
            <Route path="/items" element={<RecordsPage />} />

            {/* 
              EXAM NOTE: Mount your new page route here:
              <Route path="/users" element={<UserPage />} />
            */}

            <Route path="*" element={<Navigate to="/items" replace />} />
          </Routes>
        </main>

        <footer className="border-t py-4 text-center text-xs text-gray-500 bg-white">
          Nakshi Mini • Lab Evaluation
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
