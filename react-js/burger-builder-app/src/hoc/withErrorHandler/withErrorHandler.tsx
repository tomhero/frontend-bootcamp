import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const WithErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
    return class extends Component {

        private reqInterceptor!: number
        private resInterceptor!: number

        constructor(props: any) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        
        state: {
            error: any
        } = {
            error: null
        }

        componentDidMount() {
            // NOTE : Please do this in constructure instead because of HOC and lifecycle hook
            // axios.interceptors.request.use(req => {
            //     this.setState({error: null});
            //     return req;
            // });
            // axios.interceptors.response.use(res => res, error => {
            //     this.setState({error: error});
            // });
        }

        componentWillUnmount() {
            // NOTE : For prevent memory leak!!
            console.log('componentWillUnmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
    
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <>
                    <Modal isShowing={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error?.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default WithErrorHandler;