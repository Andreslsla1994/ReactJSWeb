import React, {Component} from 'react'

class Datatable extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullData:[],
            headers:[],
            table:[],
            paginacion:1
        };
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        
        if(oldProps !== newProps) {
            let table = newProps.fullData[this.state.paginacion - 1]
            let fullData = newProps.fullData
            this.setState({
                table,
                fullData
            })
        }
    }
    handlePagination = (e) => {
        e.preventDefault()
        console.log(e.target.name)
        let paginacion = e.target.name - 1
        let table = this.state.fullData[paginacion]
        
        this.setState({
            table,
            paginacion
        })
    }
    handleNextPrevPagination = (e) => {//error por el valor antiguo del state
        e.preventDefault()
        let sizeData = this.state.fullData.length
        console.log(this.state.paginacion)
        let paginacion = (e.target.name === 'Next')? this.state.paginacion + 1 : this.state.paginacion - 1  
        console.log(paginacion)
        if(paginacion > 0 && paginacion < sizeData){
            let table = this.state.fullData[paginacion]
            this.setState({
                table,
                paginacion
            })
        }
        
        
    }
    render(){
        let {fullData, table, paginacion} = this.state
        const {headers} = this.props
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                headers.map((index)=>{
                                    return <th key={index} scope="col">{index}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            table.map((voucher, index)=>{
                                let cred = []
                                Object.keys(voucher).forEach(function(key) {
                                    cred.push(<td key={key}>{voucher[key]}</td>)
                                })
                                return (
                                    <tr key={index}>
                                        {
                                            cred
                                        }
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                    
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item ">
                            <a 
                              className="page-link" 
                              href="#" 
                              name="Prev"
                              onClick={this.handleNextPrevPagination}>Previous</a>
                        </li>

                        {
                            fullData.map((voucher, index)=>{
                                return (
                                    <li className="page-item">
                                        <a 
                                          className="page-link" 
                                          href="#" 
                                          name={index+1}
                                          onClick={this.handlePagination}>

                                          {index+1}</a>
                                    </li>
                                )
                            })
                        }

                        <li className="page-item">
                            <a 
                              className="page-link" 
                              href="#" 
                              name="Next"
                              onClick={this.handleNextPrevPagination}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Datatable


