import React, {Component} from 'react'
import Container from '../../components/Container'
import { Form, SubmitButton, List } from './styles'
import { FaGithubAlt, FaPlus, FaSpinner} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default class Main extends Component{
    state = {
        newRepo: '',
        repositories: [],
        loading: false
    }

    componentDidMount(){
        const repositories = localStorage.getItem('repositories')
        if(repositories){
            this.setState({
                repositories: JSON.parse(repositories)
            })
        }
    }

    componentDidUpdate(_, prevState){
        const { repositories } = this.state
        if(prevState.repositories !== repositories){
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = e => {
        this.setState({
            newRepo: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault()

        const {newRepo, repositories} = this.state

        if(newRepo !== ''){

            this.setState({
                loading: true
            })

            const data = {
                name: ''
            }

            await api.get(`/repos/${newRepo}`)
                .then(function (response){
                    data.name = response.data.full_name
                    console.log(data)
                })
                .catch(function (error){
                    console.log(error)
                })

                this.setState({
                    repositories: [...repositories, data],
                    newRepo: '',
                    loading: false
                })

        }


    }



   render(){
       const { newRepo, loading, repositories } = this.state
       return(
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>
            <Form onSubmit={this.handleSubmit}>
                <input
                type="text"
                placeholder="Adicionar repositório"
                value={newRepo}
                onChange={this.handleInputChange}
                />
                <SubmitButton loading={loading}>
                    {loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} />}

                </SubmitButton>
            </Form>
            <List>
                {

                repositories.map(repository => (
                    repository.name !== "" ?
                <li key={repository.name}>
                    <sapan>{repository.name}</sapan>
                    <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                </li>
                    : ''
                ))
                }
            </List>
        </Container>
       )
   }
}
