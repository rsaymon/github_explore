import React, { useState, FormEvent, useEffect } from 'react';

import { Link } from 'react-router-dom'
import { Title, Form, Repositories, Error } from './styles';
import logo from '../../assets/logo.svg';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

//react FC = function component
const Dashboard: React.FC = () => {

    const [inputError, setInputError] = useState('');
    //armazena valor do input
    const [newRepo, setNewRepo] = useState('');

    //repositorios encontrados no git após a busca sem STORAGE
    //const [repositories, setRepositories] = useState<Repository[]>([]);

    //repositorios encontrados no git após a busca com STORAGE
    //em vez de passar o array vazio, passa o storage. ao fim, refaz o JSON.
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GitHubExplorer:repositories');
        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    });

    //salvando no localstorage
    useEffect(() => {
        localStorage.setItem(
            '@GitHubExplorer:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); //previnir o comportamento padrão do form, que redireciona automaticamente

        if (!newRepo) {
            setInputError('Digite o Autor/Nome do repositório');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');

        } catch (err) {
            setInputError('Erro na busca do repositório');
        }
    }

    return (
        <>
            <img src={logo} alt="Github Explorer" />
            <Title>Explore repositórios no github</Title>

            {/* !! significa modificar pra true e depois false novamente */}
            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo} //valor atual
                    onChange={e => setNewRepo(e.target.value)} //evento que tem valor do input, sempre que modificar
                    placeholder="Digite o nome do rep">
                </input>
                <button type='submit'>Pesquisar</button>
            </Form>

            {/* se inputError tem algo dentro, execute o componente Error */}
            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))

                }

            </Repositories>
        </>

    )
};

export default Dashboard;