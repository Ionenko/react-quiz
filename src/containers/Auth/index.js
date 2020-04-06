import React, {Component} from 'react';
import './Auth.scss';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import is from 'is_js';
import {connect} from "react-redux";
import {auth} from "../../store/AC/auth";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    submitHandler = (event) => {
        event.preventDefault();
    };

    validateControl(value, validation) {
        if(!validation){
            return true;
        }
        let isValid = true;

        if (validation.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email){
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, contolName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[contolName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[contolName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls,
            isFormValid
        })
    };

    rederInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange ={event => this.onChangeHandler(event, controlName)}
                />
            );
        });
    }

    render() {
        return (
            <div className='Auth'>
                <h1>Авторизация</h1>
                <form onSubmit = {this.submitHandler} className='authForm'>
                    {this.rederInputs()}
                    <div className='AuthActions'>
                        <Button type='success' disabled={!this.state.isFormValid} onClick={this.loginHandler}>Войти</Button>
                        <Button type='primary' disabled={!this.state.isFormValid} onClick={this.registerHandler}>Зарегистрироваться</Button>
                    </div>

                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);