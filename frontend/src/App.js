
import { useState } from 'react';
import './App.css';
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route, Outlet, Navigate} from 'react-router-dom';
import Login from './components/account/Login';
import Home from './components/Home/Home';
import Header from './components/header/Header';

const PrivateRoute = ({isAuthenticated, ...props }) => {
  return isAuthenticated ?
  <>
    <Header />
    <Outlet />
  </>
  : <Navigate replace to='/login' />
}
function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <div className="App" style = {{marginTop: 64}}>
      <DataProvider>
        <BrowserRouter>
          <div style = {{marginTop: 64}}>
            
            <Routes>
              <Route path = '/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
              <Route path = '/' element = {<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path = '/' element = {<Home />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    </div>
  );
}

export default App;
