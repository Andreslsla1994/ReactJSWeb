import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios';
import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home'

class App extends Component {
 
  constructor(...props) {
    super(...props)
    this.state = {
      user: "",
      password: "",
      failLogin: ""
    }
    
  }

  handleInput = (event) => {
    const { target } = event;
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }


  handleLogin = (e , propHistory) => {
    e.preventDefault();
    axios.get(`http://localhost:5000/login`, {
      auth: {
        username: this.state.user,
        password: this.state.password
      }
    })
      .then(res => {
      let data = res.data;
      localStorage.setItem( 'userLogged', this.state.user );
      localStorage.setItem( 'tokenAuth', data );
      this.setState(() => ({
        user:"",
        password:""
      }))
      propHistory.history.push('/Mantenimiento')
    }).catch(err=>{
      console.log(err)
      this.setState(() => ({
        user:"",
        password:"",
        failLogin : "Usuario o constraseña incorrecta"
      }))
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  
  componentDidMount(){
    //localStorage.clear();
    window.removeEventListener('beforeunload', this.keepOnPage);
  }
  keepOnPage(e) {
    var message = 'Warning!\n\nNavigating away from this page will delete your text if you haven\'t already saved it.';
    e.returnValue = message;
    alert('Esta saliendo de la pagina')
    return message;
  }
  render(){
    const {user, password,failLogin} = this.state
    return (
      <div className="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="/Login"/>
            <Route path="/Login" exact render={(history)=><Login 
                failLogin={failLogin}
                history={history}
                user={user}
                password={password}
                handleInput={this.handleInput}
                handleLogin={(e) => this.handleLogin(e, history)}
              />}/>
            <Route path="/Mantenimiento" render={(history) =>
                <Home />
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
