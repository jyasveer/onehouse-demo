import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Configure, UploadFile } from "./pages";
import { AppStateProvider } from './state/AppState';

function App() {
  return (
    <React.StrictMode>
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<UploadFile />} />
            <Route path='/configure' element={<Configure />} />
          </Routes>
        </BrowserRouter>
      </AppStateProvider>
    </React.StrictMode>
  );
}

export default App;
