import React, {Component} from 'react'
import {Input} from 'reactstrap'
import Datatable from '../../UI/Datatable'
import axios from 'axios';
class ConsultaUsuario extends Component {
    state ={
        _desde:"",
        _hasta:"",
        _headers:[],
        _vouchers:[]
    }

    componentDidMount(){
        console.log('componentDidMount')
        let token = localStorage.getItem('tokenAuth');
        axios.all([
            axios.post('http://127.0.0.1:5000/voucherHeaders', null,{
              headers: { 
                'x-access-token': token 
              }
            }),
            axios.post('http://127.0.0.1:5000/voucher', null, {
                headers: { 
                    'x-access-token': token 
                } 
            })
            
          ]).then(axios.spread((headers, dataArray) => {
            let _headers = headers.data
            let _vouchers = dataArray.data
            this.setState(()=>({ 
                _headers,
                _vouchers
            }));
            console.log(this.state)
        })).catch(err=>{console.log(err)});
    }

    render(){
        const{_desde, _hasta,_headers,_vouchers} = this.state
        return (
            <div id="content">
                <form>
                    <div className="section">
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Agencias</label>
                            </div>
                            <div className="form-group col-md-5">
                                <input type="text"  className="form-control" name="agencia"  placeholder="Agencia" disabled/>
                            </div>
                            <div className="form-group col-md-1">
                                <label htmlFor="inputState">Usuarios por agencia</label>
                            </div>
                            <div className="form-group col-md-5">
                                <select id="inputState" className="form-control" name="plazo" >
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
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
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-10">
                            </div>
                            <div className="form-group col-md-2">
                                <button type="submit" className="btn btn-primary" >Consultar</button>
                            </div>
                        </div>
                    </div>
                    <Datatable headers={_headers} data={_vouchers}/>
                </form>
            </div>
        )
    }
    
}

export default ConsultaUsuario
