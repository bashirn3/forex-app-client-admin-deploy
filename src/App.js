import { Switch } from 'react-router-dom';
import Authlayout from './containers/authlayout/Authlayout';
import Mainlayout from './containers/mainlayout/Mainlayout';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import BASE_URL from './utils/api';

function App() {

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken || ''}`;


  // axios.interceptors.response.use((response) => {
  //   return response;
  // }, (error) => {
  //   if ((error.response.status === 403)) {
  //     axios.post(`${BASE_URL}/token`, {
  //       token: refreshToken
  //     })
  //       .then(({ data }) => {
  //         const {
  //           acessToken: accessToken
  //         } = data

  //         localStorage.removeItem('accessToken');
  //         localStorage.setItem('accessToken', accessToken);

  //       })
  //   }
  //   return Promise.resolve();
  // });


  // Function that will be called to refresh authorization
  const refreshAuthLogic = failedRequest => axios.post(`${BASE_URL}/token`, {
    token: refreshToken
  }).then(({ data }) => {
    const {
      acessToken: accessToken
    } = data

    localStorage.setItem('accessToken', accessToken);
    failedRequest.response.config.headers['Authorization'] = `Bearer ${accessToken || ''}`;
    window.location.reload();
    return Promise.resolve();
  });

  // Instantiate the interceptor (you can chain it as it returns the axios instance)
  createAuthRefreshInterceptor(
    axios,
    refreshAuthLogic,
    {
      statusCodes: [401, 403]
    }
  );

  return (
    <div className="app-box">
      <ReactNotification />
      <Switch>
        <Authlayout path="/" />
      </Switch>
      <Switch>
        <Mainlayout path="/app/" />
      </Switch>
    </div>
  );
}

export default App;
