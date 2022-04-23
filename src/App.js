import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MapPage from './pages/MapPage';
import GeoTarget from './pages/GeoTarget';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <Router>
        <Routes>
          <Route path="/marker/:id" element={<GeoTarget />} />
          <Route path="/" element={<MapPage/>}/>
        </Routes>
      </Router>
    );
  };
}

export default App;
