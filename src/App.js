import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Profile from './components/profile/profile';

function App() {

  const [user, setLoginUser] = useState({})

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              localStorage.getItem('token')
                ?
                <Profile setLoginUser={setLoginUser} user={user}/>
                :
                <Login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/getProfile">
            <Profile/>
            </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register"> <Register /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;