import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import { Toaster } from 'react-hot-toast';
import { SignupPage } from './components/SignupPage';
import { Home } from './components/Home';

function App() {
  return (
    <div className='bg-white'>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
