import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';


const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        // change below to a constructor since cWM is deprecated, and we need to run this before/as the component is rendered
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
            });
        }


        // or use useEffect react hook: write below code in return of that useEffect
        componentWillUnmount() {
            console.log('will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorCloseHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorCloseHandler}>
                        Something is broken... {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default errorHandler;