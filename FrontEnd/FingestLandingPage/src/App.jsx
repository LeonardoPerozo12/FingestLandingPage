import React from 'react';
import Header from './Components/Header';
import Home from './Pages/HomePage';
import Servicios from './Pages/ServiciosPage'

function App() {
    return (
        <div>
            <Header />
              <Home />
              <Servicios/>
        </div>
    );
}

export default App;
