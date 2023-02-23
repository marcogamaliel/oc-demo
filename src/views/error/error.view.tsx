import './error.view.scss'
import React from 'react';
import logo from '../../assets/logo-big.png'
import errorImage from '../../assets/error.png'

export class ErrorBoundary extends React.Component {
    state : {hasError: boolean, error?: any}
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <ErrorView error={this.state.error} />
      }
  
      return (this.props as any).children; 
    }
}

export function ErrorView(props: {error?: any}) {
    return (
        <div className="error-view">
            <div className="container">
                <img src={errorImage} alt="ERROR" width="400"/>
                <div className="content">
                <img src={logo} alt="Sodimac" width="200"/>
                <div><b>ERROR:</b></div>
                <div>{`${props?.error?.message ?? "Página no encontrada"}`}</div>
                </div>
            </div>
        </div>
    )
}


