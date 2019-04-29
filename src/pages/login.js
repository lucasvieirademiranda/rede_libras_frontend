import React from 'react';
import moment from 'moment';
import rest from '../components/rest';

import {
    Row,
    Col,
    TextInput,
    Button
} from 'react-materialize';

import toaster from '../components/toaster';

class Login extends React.Component
{
    state = {
        user: '',
        password: '',
        message: ''
    };

    onLogin = (event) => {
        
        let data = {
            user: this.state.user,
            password: this.state.password
        };

        var request = rest();

        request.post('/account/login', data)
               .then((response) => {

                var data = response.data;

                localStorage.setItem('fcm_token', data.token);
                localStorage.setItem('fcm_token_birth', moment().format());

                window.location = '/system';

            })
            .catch((error) => {

                if (error.response && error.response.data)
                {
                    var data = error.response.data;

                    if (Array.isArray(data))
                    {
                        for(var i = 0; i < data.length; i++)
                        {
                            toaster.error(data[i].msg);
                        }
                    }
                    else
                    {
                        toaster.error(data.message);
                    }

                }
                else
                {
                    toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                }

            });

    }

    render()
    {
        return (
            <div>
                <Row>
                    <Col m={0} l={2}></Col>
                    <Col m={12} l={6} style={{ textAlign: "center" }}>
                        <Col s={12}>
                            <TextInput s={12} label="Usuário" placeholder="Ex: janice" maxlength="250" onChange={(event) => { this.setState({ user: event.target.value }) } } />
                        </Col>
                        <Col s={12}>
                            <TextInput s={12} type='password' label="Senha" placeholder="******" maxlength="250" onChange={(event) => { this.setState({ password: event.target.value }) } } />
                        </Col>
                        <Col s={12}>
                            <Col s={5}></Col>
                            <Col s={2}>
                                <Button onClick={this.onLogin}>Login</Button>
                            </Col>
                            <Col s={5}></Col>
                        </Col>
                    </Col>
                    <Col m={0} l={2}></Col>
                </Row>
            </div>
        );
    }

}

export default Login