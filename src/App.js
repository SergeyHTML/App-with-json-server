import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import './App.scss';
import TableMissions from './components/TableMissions'

function App() {
  return (
      <div>
          <div className="jumbotron jumbotron-fluid">
              <div className="container">
                  <h1 className="display-4 text-center">Agent list</h1>
              </div>
          </div>

          <TableMissions />

      </div>

  );
}

export default App;
