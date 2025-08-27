
import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';

function App() {

  return (
    <div className="bg-white">
      <div className='max-w-7xl mx-auto px-4 bg-white pt-12'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
