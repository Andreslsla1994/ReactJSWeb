import React, {Component} from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Loading from '../../UI/Loading'
import {Input} from 'reactstrap'
import axios from 'axios';

import Pay from './CreditCard/Pay'

class Ingreso extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aerolinea:"",
      agencia:"",
      date:"",
      nombre:"",
      ruta:"",
      tarifa:"",
      iva:"",
      total:"",
      plazo:"",
      credito:"",
      creditos:[],
      aerolineas:[],
      signatures:[],
      modal:false,
      loading:true
    };


  }

  toggle = (e) => {
    e.preventDefault()

    if(this.state.aerolinea === ""
      || this.state.agencia===""
      || this.state.total===""
      || this.state.credito===""
      || this.state.plazo==="0"
    ){
      alert('Es necesario llenar los campos')
    }else{
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
    
  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });

  }
  handleInputChangeNumbers = (event) => {
    const target = event.target;
    let valueOriginal = target.type === 'checkbox' ? target.checked : target.value;
    let value = valueOriginal
    const name = target.name;
    //const re = /^[0-9\b]+$/;
    const re = /^[0-9]*\.?[0-9]*$/;
    
    if (value === '' || re.test(value)) {
      value = (value === "") ? "0" : value
      let _tarifa
      let _iva
      if(name==="tarifa"){
        _tarifa = value
        _iva = (this.state.iva === "") ? "0": this.state.iva
      }else{
        _tarifa = (this.state.tarifa === "") ? "0": this.state.tarifa
        _iva = value
      }
      let _total
      if(value !== "0"){
        _total= parseFloat(_tarifa) + parseFloat(_iva)
      }else{
        _total="0"
      }
      
      this.setState((prevState)=>({
        [name]: valueOriginal,
        total : parseFloat(_total).toFixed(2)
      }));
    }
  }

  handleOnClick = (e) => {
    e.preventDefault()
    
  }
  componentDidMount(){
    let user = localStorage.getItem('userLogged');
    let token = localStorage.getItem('tokenAuth');

    axios.all([
      axios.get('http://localhost:5000/aerolineas'),
      axios.post('http://localhost:5000/agencias', null, {params : {
        user
      }}),
      axios.get('http://localhost:5000/tipoCredito'),
      axios.post('http://localhost:5000/signature', null,{
        headers: { 
          'x-access-token': token 
        },
        params : {
          user
        }  
      })
    ]).then(axios.spread((aerolineas, agencias, credito, signature) => {
      this.setState({ 
        aerolineas:aerolineas.data,
        agencia:agencias.data[0].Nombre,
        creditos:credito.data,
        signatures: signature.data,
        credito:credito.data[0].Tipo_Credito,
        loading:false
      })
    })).catch(err=>{console.log(err)});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }
  handleFocus = (event) => event.target.select();
  render(){
    const {
      aerolinea,
      agencia,
      date,
      nombre,
      ruta,
      tarifa,
      iva,
      total,
      credito,
      plazo,
      signatures,
      loading
    } = this.state

    let aero = this.state.aerolineas
    let airlines = []
    Object.keys(aero).forEach(function(key) {
      airlines.push(<option key={key} value={aero[key].nombre_corto}>{aero[key].nombre}</option>)
    })

    let tipoCredito = this.state.creditos
    let cred = []
    Object.keys(tipoCredito).forEach(function(key) {
      cred.push(<option key={tipoCredito[key].Tipo_Credito} value={tipoCredito[key].Tipo_Credito} >{tipoCredito[key].Descripcion}</option>)
    })
    
    return (
      (loading)
      ?<Loading/>
      :<div id="content">
        <div className="toogleBtn">
          <button type="button" id="sidebarCollapse" className="btn btn-info">
              <i className="fas fa-align-left"></i>
              <span>Toggle Sidebar</span>
          </button>
        </div>
        <form>
          <div className="section">
            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="inputState">Aerolineas</label>
              </div>
              <div className="form-group col-md-5">
                
                <select id="inputState" className="form-control" value={aerolinea} name="aerolinea" onChange={this.handleInputChange}>
                  {
                    airlines
                  }
                </select>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="inputState">Agencias</label>
              </div>
              <div className="form-group col-md-5">
                
                <input type="text"  className="form-control" name="agencia"  value={agencia} onChange={this.handleInputChange} placeholder="Agencia" disabled/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="exampleDate">Date</label>
              </div>
              <div className="form-group col-md-5">
                <Input
                  type="date"
                  name="date"
                  id="exampleDate"
                  placeholder="Fecha"
                  value={date}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            
            </div>

            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="inputAddress2">Nombre del pasajero</label>
              </div>
              <div className="form-group col-md-5">
                <input type="text" required className="form-control" name="nombre" value={nombre} onChange={this.handleInputChange} placeholder="Nombre Pasajero"/>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="inputPassword4">Ruta</label>
              </div>
              <div className="form-group col-md-5">
                <input type="text" required className="form-control" name="ruta" value={ruta} onChange={this.handleInputChange} placeholder="Ruta"/>
              </div>
            </div>

          </div>

          <div className="section">
            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="inputAddress2">Tarifa 12</label>
              </div>
              <div className="form-group col-md-5">
                <input type="text" onFocus={this.handleFocus} required  className="form-control" name="tarifa" value={tarifa}  onChange={this.handleInputChangeNumbers} placeholder="0.00"/>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="inputPassword4">IVA</label>
              </div>
              <div className="form-group col-md-5">
                <input type="text" onFocus={this.handleFocus} required  className="form-control" name="iva" value={iva}  onChange={this.handleInputChangeNumbers} placeholder="0.00"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="inputAddress2">Total</label>
              </div>
              <div className="form-group col-md-5">
                <input type="text" required  className="form-control" name="total" value={total} onChange={this.handleInputChangeNumbers} placeholder="0.00" disabled/>
              </div>

            </div>
          </div>
          <div className="section">
            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="inputState">Tipo Crédito</label>
              </div>
              <div className="form-group col-md-5">
                <select id="inputState" className="form-control" value={credito} name="credito" onChange={this.handleInputChange}>
                  {
                    cred
                  }
                </select>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="inputState">Plazo</label>
              </div>
              <div className="form-group col-md-5">
                <select id="inputState" className="form-control" name="plazo" value={plazo} onChange={this.handleInputChange}>
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                </select>
              </div>
            </div>
            
            

          </div>

          <button type="submit" className="btn btn-primary" onClick={this.toggle}>Sign in</button>
          
          
          
        </form>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Pay 
              aerolinea={aerolinea}
              agencia={agencia} 
              credito={credito}
              signatures={signatures} 
              total={total} 
              plazo={plazo}/>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={this.toggle}>Do Something</button>
          </ModalFooter>
        </Modal>
      </div>
      
    )
  }
}

export default Ingreso
