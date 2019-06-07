import React, {Component} from 'react'
import axios from 'axios';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import '../styles/home.css'
import Bienvenida from './Pages/Bienvenida'
import Ingreso from './Pages/Ingreso'
import ConsultaUsuario from './Pages/ConsultaUsuario'
import SideMenu from './Menu/SideMenu'
import firebase from '../Enviroment/FirebaseConfig'
import Loading from '../UI/Loading'


class Home extends Component{
  constructor() {
    super();
    this.state = {
        menu:[],
        loading:true,
        isAuthenticated:false
    };
  }

  componentDidMount(){
    let userLogged = localStorage.getItem('userLogged');
    if(userLogged !== undefined && userLogged !== ''&& userLogged !== null){
      let ref = firebase.database().ref('/estado')
      ref.on('value', snapshot => {
        const state = snapshot.val()
        let auth = state.isAuthenticated
        if(auth === 'true'){
          axios.get(`http://localhost:5000/menu?user=${userLogged}`)
            .then(res => {
            let data = res.data;
            let menu = data.reduce(function (r, a) {
                r[a.Modulo] = r[a.Modulo] || [];
                r[a.Modulo].push(a);
                return r;
            }, Object.create(null));
            this.setState(()=>({ 
              menu,
              loading : false,
              isAuthenticated:true
            }));
          })
        }else{
          localStorage.clear()
          this.props.history.push('/Login')
        }
      })
    }else{
      localStorage.clear()
      this.props.history.push('/Login')
    }
  }

  handleLogOut = () => {
    localStorage.clear()
    this.props.history.push('/Login')
  }
  
  render(){
    const {menu, loading,isAuthenticated} = this.state
     return (
      <div className="wrapper">
        <SideMenu menus={menu} handleLogOut={this.handleLogOut}/>
        {
          (loading)
          ?<Loading/>
          :<Switch>
            {
              (isAuthenticated)
              ?<Redirect exact from="/Mantenimiento" to="/Mantenimiento/Bienvenida"/>
              :<Redirect exact from="/Mantenimiento" to="/Login"/>
            }
            <Route path="/Mantenimiento/Bienvenida" component={Bienvenida}/>
            <Route path="/Mantenimiento/Ingreso" render={()=><Ingreso />}/>
            <Route path="/Mantenimiento/ConsultaUsuario" render={()=><ConsultaUsuario />}/>
          </Switch>
        }
        
      </div>
    )
  }
}
Home.defaultProps = {
  isAuthenticated: false,
}
export default withRouter(Home);
