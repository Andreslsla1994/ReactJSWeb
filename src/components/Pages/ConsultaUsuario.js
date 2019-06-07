import React, {Component} from 'react'
import {Input} from 'reactstrap'
import Datatable from '../../UI/Datatable'
import axios from 'axios';
class ConsultaUsuario extends Component {
    state ={
        _desde:"",
        _hasta:"",
        _estado:"",
        _agencia:"",
        _usuarios:[],
        _headers:[],
        _vouchers:[]
    }
    handleInput = (event) => {
        const { target } = event;
        const { name, value } = target
        this.setState({
          [name]: value
        })
    }
    chunkArray(myArray, chunk_size){
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        let myChunk;
        for (index = 0; index < arrayLength; index += chunk_size) {
            myChunk = myArray.slice(index, index+chunk_size);
            tempArray.push(myChunk);
        }

        return tempArray;
    }
    
    componentDidMount(){
        let userLogged = localStorage.getItem('userLogged');
        let token = localStorage.getItem('tokenAuth');
        axios.all([
            axios.post('http://127.0.0.1:5000/voucher', null, {
                headers: { 
                    'x-access-token': token 
                } 
            }),
            axios.post('http://127.0.0.1:5000/ObtenerAgencias', null, {
                headers: { 
                    'x-access-token': token 
                },
                params:{
                    'user':userLogged
                }
            }),
            axios.post('http://127.0.0.1:5000/ObtenerUsuarios', null, {
                headers: { 
                    'x-access-token': token 
                },
                params:{
                    'user':userLogged
                }
            })
          ]).then(axios.spread((dataArray, usuarioAgencia, usuarios) => {
            let _vouchersRequest = dataArray.data
            let _usuarios = usuarios.data
            let _headers = []
            let _header = _vouchersRequest[0]
            //Obtiene las cabeceras de los datos para insertarlos en la cabecera de la tabla
            Object.keys(_header).forEach(function(key) {
                _headers.push(key)
            })
            //separa los datos para la paginación
            let _vouchers = this.chunkArray(_vouchersRequest, 10)
            this.setState(()=>({ 
                _headers,
                _vouchers,
                _usuarios
            }));
        })).catch(err=>{console.log(err)});
    }

    handleSearch = () => {

        axios.all([
            axios.get('http://127.0.0.1:5000/BuscarVoucher') 
          ]).then(axios.spread((dataArray) => {
            let _vouchers = dataArray.data
            console.log(_vouchers)
        })).catch(err=>{console.log(err)});
    }

    render(){
        const{_desde, _hasta,_headers,_vouchers, _agencia, _usuarios} = this.state

        return (
            <div id="content">
                <form>
                    <div className="section">
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Agencias</label>
                            </div>
                            <div className="form-group col-md-5">
                                <input 
                                    type="text"  
                                    className="form-control" 
                                    name="agencia"  
                                    placeholder="Agencia" 
                                    value={_agencia}
                                    disabled/>
                            </div>
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Usuarios por agencia</label>
                            </div>
                            <div className="form-group col-md-5">
                                <select id="inputState" className="form-control" name="plazo" >
                                    {
                                        _usuarios.map(( key, index)=>{
                                            return <option key={index} value={key.NombreCorto} >{key.NombreCorto}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            </div>
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Estado</label>
                            </div>
                            <div className="form-group col-md-5">
                                <select id="inputState" className="form-control" name="plazo" >
                                    <option>TODOS</option>
                                    <option>PENDIENTE</option>
                                    <option>GENERADO</option>
                                    <option>ANULADO</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Desde</label>
                            </div>
                            <div className="form-group col-md-5">
                                <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="Fecha"
                                    value={_desde}
                                    onChange={this.handleInput}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Hasta</label>
                            </div>
                            <div className="form-group col-md-5">
                                <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="Fecha"
                                    value={_hasta}
                                    onChange={this.handleInput}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-10">
                            </div>
                            <div className="form-group col-md-2">
                                <button type="submit" className="btn btn-primary" onClick={this.handleSearch} >Consultar</button>
                            </div>
                        </div>
                    </div>
                    <Datatable headers={_headers} fullData={_vouchers}/>
                </form>
            </div>
        )
    }
    
}

export default ConsultaUsuario
