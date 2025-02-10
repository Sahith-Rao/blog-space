import logo from './logo.svg';
import './App.css';
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/account/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App" style = {{marginTop: 64}}>
      <DataProvider>
        <BrowserRouter>
          <div style = {{marginTop: 64}}>
            <Routes>
              <Route path = '/login' element={<Login />} />
              <Route path = '/' element = {<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
     </DataProvider>
    </div>
  );
}

export default App;
