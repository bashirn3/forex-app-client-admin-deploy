import React, { useState } from 'react'
import Input from '../../components/Input/Input';
import axios from 'axios';
import validate from './validate';
import logo from '../../assets/images/logo.png';
import './Login.css';
import { useForm } from '../../utils/UseForm'
import {useHistory} from 'react-router-dom';
import BASE_URL from '../../utils/api';

function Login() {
    const history = useHistory();
    const [loginError, setLoginError] = useState(false);
    const [loginLoading, setLoading] = useState(false);

    const { onChangeHandler, onSubmitHandler, inputValues, errors } = useForm(
        loginHandler,
        validate,
    );

    function loginHandler() {

        console.log(inputValues);
            setLoading(true);
            localStorage.removeItem('operator');
            axios.post(`${BASE_URL}/login`, inputValues)
                .then((resp) => {
                    console.log(resp.data);
                    const {
                        acessToken: accessToken,
                        refreshToken: refreshToken
                    } = resp.data;
                    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);  

                })
                .then(()=>{
                    history.push('/app/signals');
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false);
                    setLoginError(true);
                })

        }

        return (
            <div className='box'>
                <div className='container'>
                    <div className='login-container'>
                        <div className='card'>
                            <h1 className='login-header'>Login</h1>
                            <p>Sign In to your account</p>
                            <Input
                                error={errors.username}
                                name='username'
                                onChange={onChangeHandler}
                                value={inputValues.username || ''}
                                type='text'
                                placeholder='Username'
                            />
                            <Input
                                error={errors.password}
                                name='password'
                                onChange={onChangeHandler}
                                value={inputValues.password || ''}
                                type='password'
                                placeholder='Password'
                            />
                            <div className='button-container'>
                                <button onClick={onSubmitHandler} className='button button-login' disabled={loginLoading}>
                                    {loginLoading ? 'Loading' : 'Login'} 
                                </button>
                                <button className='button button-password'>Forgot password?</button>
                            </div>
                            {loginError && (
                            <div className='login-error'>Invalid Credentials</div>
                        )}
                        </div>
                    </div>
                    <div className='signup-container'>
                        <img src={logo} alt="Logo" className="front_logo" />
                        {/* <h3>LEO ADMIN APP</h3> */}
                    </div>
                </div>
            </div>

        )
    }

export default Login;
