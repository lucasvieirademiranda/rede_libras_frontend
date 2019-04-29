import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Button,
    TextInput,
    Textarea
} from 'react-materialize';

import toaster from '../components/toaster';

class UserForm extends React.Component
{
    state = {
        id: null,
        name: '',
        description: ''
    }

    create = (data) => {

        var request = rest();

        request.post('/category/create', data)
               .then((response) => {

                    window.location = '/categories';

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

        request.patch('/category/edit', data)
                .then((response) => {

                    window.location = '/categories';

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

        request.get('/category/find/' + id)
               .then( (response) => {

                    var data = response.data;

                    this.setState({
                        id: data.id,
                        name: data.name,
                        description: data.description
                    });

               });
    }

    onClick = () => {

        var data = this.state;

        if (!data.id)
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
                    <TextInput s={12} label="Categoria" placeholder="Categoria" maxlength="250" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value })} } />
                </Row>
                <Row>
                    <Textarea s={12} label="Descrição" placeholder="Descrição" value={this.state.description} onChange={(event) => { this.setState({ description: event.target.value })} } />
                </Row>
                <Row>
                    <Button waves='light' className='red' node='a' href='/categories'>Voltar</Button>&nbsp;
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Salvar</Button>
                </Row>
            </div>
        );

    }

}

export default UserForm;