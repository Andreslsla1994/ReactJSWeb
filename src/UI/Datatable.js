import React from 'react'

export default function Datatable(props) {
    let {headers, data} = props
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {
                        headers.map((index)=>{
                            return <th scope="col">{index.COLUMN_NAME}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((index)=>{
                        let cred = []
                        Object.keys(index).forEach(function(key) {
                            cred.push(<td>{index[key]}</td>)
                        })
                        return (
                            <tr>
                                {
                                    cred
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
