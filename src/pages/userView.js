import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Button,
    Input
} from 'react-materialize';

import toaster from '../components/toaster';

class UserView extends React.Component
{
    state = {
        id: null,
        name: null,
        user: null,
        password: null,
        mail: null
    }

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

        var id = this.props.match.params.id;

        if (!id) { return; }

        var request = rest();

        request.delete('/user/remove/' + id)
               .then((response) => {

                window.location.href = '/users';

             })
             .catch((error) => {

                var data = error.response.data;

                if (data)
                {
                    toaster.error(data.message);
                }

             });
    };

    render()
    {
        return (
            <div>
                <Row>
                    <Input l={6} readonly='readonly' label="Nome" placeholder="Nome" size="250" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value })} } />
                </Row>
                <Row>
                    <Input l={6} readonly='readonly' label="Usuário" placeholder="Usuário" size="250" value={this.state.user} onChange={(event) => { this.setState({ user: event.target.value })} } />
                </Row>
                <Row>
                    <Input l={6} readonly='readonly' label="E-mail" placeholder="E-mail" size="250" value={this.state.mail} onChange={(event) => { this.setState({ mail: event.target.value })} } />
                </Row>
                <Row>
                    <Button waves='light' className='red' node='a' href='/users'>Voltar</Button>&nbsp;
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Deletar</Button>
                </Row>
            </div>
        );
    }
}

export default UserView;