import React from 'react'
import {
  Form
} from 'reactstrap';
import { withRouter } from 'react-router-dom'
import back from '../../assets/back.jpg'
import '../../styles/login.css'
import PropTypes from 'prop-types';

const Login = (props) =>  {
  const { user, password, handleInput, handleLogin, failLogin } = props;

  const styles = {
    background: `url(${back})`
  };
  return (
    <div className="contenedor" style={styles}>
      <div className="Login">
        <h2 className="title">Login</h2>
        <Form className="formulario">
          <p className="LabelLogin">Username</p>
          <input
            className="txtUser"
            type="text"
            name="user"
            placeholder="UserName"
            value={user}
            onChange={handleInput}
            required
            autoComplete="new-password"
          />
          <p className="LabelLogin">Password</p>
          <input
            className="txtPassword"
            type="password"
            name="password"
            placeholder="********"
            value={password}
            onChange={handleInput}
            required
            autoComplete="new-password"
          />

          <p className="LabelLoginFail">{failLogin}</p>
          <button
            className="boton"
            onClick={handleLogin}>Login</button>
        </Form>
      </div>
    </div>
  )
}


Login.propTypes = {
  user: PropTypes.string,
  password: PropTypes.string,
  handleInput: PropTypes.func,
  handleLogin:PropTypes.func,
  failLogin: PropTypes.string
};

export default withRouter(Login)

