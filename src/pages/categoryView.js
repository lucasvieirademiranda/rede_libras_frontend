import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Button,
    TextInput
} from 'react-materialize';

import toaster from '../components/toaster';

class SignView extends React.Component
{
    state = {
        id: null,
        name: null,
        description: null
    }

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

        request.delete('/category/remove/' + id)
               .then((response) => {

                window.location.href = '/categories';

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
                    <TextInput s={12} readonly='readonly' label="Categoria" placeholder="Categoria" maxlength="250" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value })} } />
                </Row>
                <Row>
                    <TextInput s={12} readonly='readonly' label="Descrição" placeholder="Descrição" maxlength="250" value={this.state.description} onChange={(event) => { this.setState({ description: event.target.value })} } />
                </Row>
                <Row>
                    <Button waves='light' className='red' node='a' href='/categories'>Voltar</Button>&nbsp;
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Deletar</Button>
                </Row>
            </div>
        );
    }
}

export default SignView;