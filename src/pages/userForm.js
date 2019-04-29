import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Button,
    TextInput
} from 'react-materialize';

import toaster from '../components/toaster';

class UserForm extends React.Component
{
    state = {
        id: null,
        name: '',
        mail: '',
        user: '',
        password: '',
        confirmation: ''
    }

    create = (data) => {

        var request = rest();

        request.post('/user/create', data)
            .then((response) => {

                window.location.href = '/users';

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

    };

    edit = (data) => {

        var request = rest();

        request.patch('/user/edit', data)
            .then((response) => {

                window.location.href = '/users';

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

    };

    componentDidMount()
    {
        var id = this.props.match.params.id;

        if (!id) { return; }

        var request = rest();

        request.get('/user/find/' + id)
               .then( (response) => {

                    var data = response.data;

                    this.setState({
                        id: data.id,
                        name: data.name,
                        user: data.user,
                        mail: data.mail
                    });

               })
               .catch( (error) => {

                    var data = error.response.data;

                    if (data)
                    {
                        toaster.error(data.message);
                    }

               });
    }

    onClick = () => {

        var id = this.state.id;

        var data = this.state;

        if (!id)
        {
            this.create(data);
        }
        else
        {
            this.edit(data);
        }

    };

    render()
    {
    
        return (
            <div>
                <Row>
                    <TextInput s={12} label="Nome" placeholder="Nome" maxlength="250" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value })} } />
                    <TextInput s={12} label="E-mail" placeholder="E-mail" maxlength="250" value={this.state.mail} onChange={(event) => { this.setState({ mail: event.target.value })} } />
                    <TextInput s={12} label="Usuário" placeholder="Usuário" maxlength="250" value={this.state.user} onChange={(event) => { this.setState({ user: event.target.value })} } />
                    { !this.state.id && <TextInput l={12} label="Senha" placeholder="Senha" type="password" maxlength="250" value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value })} } /> }
                    { !this.state.id && <TextInput l={12} label="Confirmação" placeholder="Confirmação" type="password" maxlength="250" value={this.state.confirmation} onChange={(event) => { this.setState({ confirmation: event.target.value })} } /> }
                </Row>
                <Row>
                    <Button waves='light' className='red' node='a' href='/users'>Voltar</Button>&nbsp;
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Salvar</Button>
                </Row>
            </div>
        );

    }

}

export default UserForm;