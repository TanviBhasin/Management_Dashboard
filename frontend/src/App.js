import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/Homepage';
import Homepage from './components/Homepage';
import AddJob from './components/AddJob';
import ViewJob from './components/ViewJob';
import EditJob from './components/EditJob';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/add' element={<AddJob/>} />
        <Route path="/edit/:id" element={<EditJob/>} />
        <Route path='/view/:id' element={<ViewJob/>} />          
        </Routes>      
      </BrowserRouter>

      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  );
}

export default App;
