import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Button,
    TextInput,
    Col
} from 'react-materialize';

import toaster from '../components/toaster';

class HandView extends React.Component
{
    state = {
        id: null,
        name: '',
        description: '',
        file_name: '',
        video_path: ''
    }

    componentDidMount()
    {
        var id = this.props.match.params.id;

        if (!id) { return; }

        var request = rest();

        request.get('/hand/find/' + id)
               .then( (response) => {

                    var data = response.data;

                    this.setState({
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        image_name: data.image_name,
                        image_path: data.image_path
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

        request.delete('/hand/remove/' + id)
               .then((response) => {

                window.location.href = '/hands';

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
                    <h3>Cadastro de  Configuração de Mão</h3>
                </Row>
                <Row>
                    <TextInput s={12} readonly='readonly' label="Configuração de Mão" placeholder="Configuração de Mão" maxLength="250" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value })} } />
                </Row>
                <Row>
                    <TextInput s={12} readonly='readonly' label="Descrição" placeholder="Descrição" maxLength="4000" value={this.state.description} onChange={(event) => { this.setState({ description: event.target.value })} } />
                </Row>
                <Row>
                    <Col s={12}>
                        <div className="file-field input-field">
                            <div className="btn disabled">
                                <span>Imagem</span>
                                <input type="file" onChange={ (event) => this.onChangeFile(event) } />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </Col>
                </Row>
                { this.state.image_path &&
                    <Row style={ {color: 'red' }}>
                        Já existe uma imagem ({ this.state.image_name }) cadastrada para a configuração de mão, clique <a href="javascript:void();" onClick={this.onClickLink} style={ { color: 'red', fontWeight: 'bold' } } >aqui</a> para baixá-la.
                    </Row>
                }
                <Row>
                    <Button waves='light' className='red' node='a' href='/hands'>Voltar</Button>&nbsp;
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Deletar</Button>
                </Row>
            </div>
        );
    }
}

export default HandView;