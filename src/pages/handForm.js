import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Button,
    TextInput,
    Textarea,
    Col
} from 'react-materialize';

import toaster from '../components/toaster';

class HandForm extends React.Component
{
    state = {
        id: null,
        name: '',
        description: '',
        file_name: '',
        video_path: ''
    }

    create = (data, configuration) => {

        var request = rest();

        request.post('/hand/create', data)
               .then((response) => {

                    window.location = '/hands';

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

    edit = (data, configuration) => {

        var request = rest();

        request.patch('/hand/edit', data)
                .then((response) => {

                    window.location = '/hands';

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

               });
    }

    onClick = () => {

        var id = this.state.id;

        var data = new FormData();

        data.append("name", this.state.name);
        data.append("description", this.state.description);
        data.append("image_name", this.state.image_name);
        data.append("image_path", this.state.image_path);
        data.append("file", this.file);

        var configuration = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        if (!id)
        {
            this.create(data, configuration);
        }
        else
        {
            data.append("id", id);
            this.edit(data, configuration);
        }

    };

    onChangeFile = (event) => {

        this.file = event.target.files[0];
    
    };

    onClickLink = (event) => {

        var id = this.state.id;

        var request = rest();

        var url = request.defaults.baseURL + '/hand/download/' + id;

        window.open(url, '_self');

    };

    render()
    {
    
        return (
            <div>
                <Row>
                    <h3>Cadastro de Configuração de Mão</h3>
                </Row>
                <Row>
                    <TextInput s={12} label="Configuração de Mão" placeholder="Configuração de Mão" maxLength="250" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value })} } />
                </Row>
                <Row>
                    <Textarea s={12} label="Descrição" placeholder="Descrição" maxLength="4000" value={this.state.description} onChange={(event) => { this.setState({ description: event.target.value })} } />
                </Row>
                <Row>
                    <Col s={12}>
                        <div className="file-field input-field">
                            <div className="btn">
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
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Salvar</Button>
                </Row>
            </div>
        );

    }

}

export default HandForm;