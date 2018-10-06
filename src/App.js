import React, { Component } from 'react'
import { Route } from 'react-router'
import CreateContainer from './layouts/create/CreateContainer'
import SignContainer from './layouts/sign/SignContainer'
import UploadContainer from './layouts/upload/UploadContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={CreateContainer}/>
        <Route exact path="/upload" component={UploadContainer}/>
        <Route path="/:document_id" component={SignContainer}/>
      </div>
    );
  }
}

export default App
