import React, { Component } from 'react'
import { Route } from 'react-router'
import CreateContainer from './layouts/create/CreateContainer'
import SignContainer from './layouts/sign/SignContainer'

// Styles
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1 header">
              <h1>BlocuSign</h1>
            </div>
        
            <Route exact path="/" component={CreateContainer}/>
            <Route path="/:document_id" component={SignContainer}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App