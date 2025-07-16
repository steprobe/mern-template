import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Snackbar from './components/common/Snackbar';
import PlaceHolder from './components/PlaceHolder';
import Items from './components/items/Items';
import Healthcheck from './components/healthcheck/Healthcheck';

function MainApp() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 p-4">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6">
                  <PlaceHolder />
                  <Items />
                  <Healthcheck />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
      <Snackbar />
    </>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
