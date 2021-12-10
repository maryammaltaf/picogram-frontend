import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Profile from './components/profile/profile';
import { useSelector } from 'react-redux';
import List from './components/list/list';

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
                <List setLoginUser={setLoginUser} user={user} />
                :
                <Login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/getProfile">
            <Profile />
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