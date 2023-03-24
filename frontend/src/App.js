import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Register from './pages/Register';

import NewProject from './pages/NewProject';

function App() {
    return (
        <>
            <Router>
                <div className='container'>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/new-project' element={<PrivateRoute />}>
                            <Route path='/new-project' element={<NewProject />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
