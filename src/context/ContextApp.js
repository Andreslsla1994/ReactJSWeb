import React, { Component } from 'react'

export const ContextAppContext = React.createContext();

export class ContextAppProvider extends Component {
    state = {
        uselogIn: ''
    }
    render() {
        return (
            <ContextAppContext.Provider value={{ 
                ...this.state 
                }}>
                {this.props.children}
            </ContextAppContext.Provider>
        )
    }
}
