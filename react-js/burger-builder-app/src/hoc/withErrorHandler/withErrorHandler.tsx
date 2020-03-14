import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

const WithErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
    return class extends Component {

        constructor(props: any) {
            super(props);
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
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