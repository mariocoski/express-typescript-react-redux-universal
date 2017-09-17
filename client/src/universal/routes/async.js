import React from 'react';
import Loadable from 'react-loadable';

function loadAsync(loader){
    return Loadable({
        loader,
        loading: ()=>(<div>Loading...</div>)
    });
}

export const Home = loadAsync(() => import('universal/containers/pages/HomeContainer.jsx'));

export const Todos = loadAsync(() => import('universal/containers/pages/TodosContainer.jsx'));

export const NotFound = loadAsync(() => import('universal/containers/pages/NotFoundContainer.jsx'));

export const Login = loadAsync(() => import('universal/containers/auth/LoginContainer.jsx'));

export const Register = loadAsync(() => import('universal/containers/auth/RegistrationContainer.jsx'));