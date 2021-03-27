import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Header, RepositoryInfo, Issues } from './styles'
import logo from '../../assets/logo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface RepositoryType {
    full_name: string;
    description: string;
    stargazers_count: number;
    open_issues_count: number;
    forks_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue {
    title: string;
    id: number;
    user: {
        login: string;
    };
    html_url: string;

}
//react FC = function component
const Repository: React.FC = () => {

    const [repository, setRepository] = useState<RepositoryType | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(response => {
            setRepository(response.data)
        })
    }, [params.repository]);//sempre que modificar a variável, refazer chamada get


    useEffect(() => {
        api.get(`repos/${params.repository}/issues`).then(response => {
            setIssues(response.data)
        })
    }, [params.repository]);//sempre que modificar a variável, refazer chamada get

    //utilizando função async para carregar os dados.
    //primeiro vai trazer os repos para depois trazer as issues
    //caso a primeira dependa da segunda, pode dar erro
    //então vamos utilizar nesse useEffect o promise.all que força todas as promisses
    //serem executadas juntas!
    //DETALHE: Usar só quando uma não depender da outra. Await espera todas do promise.all serem
    //executadas e depois retorna o resultado.
    //Promise.race = executa várias promises e salva a que retornar primeiro.
    // useEffect(() => {
    //     async function loadData(): Promise<void> {
    //         const [ repository, issues ] = await Promise.all([
    //             api.get(`repos/${params.repository}`),
    //             api.get(`repos/${params.repository}/issues`)
    //         ]);

    //         console.log(repository);
    //         console.log(issues);
    //     }
    //     loadData();
    // }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logo} alt="Github Explorer" />
                <Link to='/'>
                    <FiChevronLeft size={16} />
                Voltar
            </Link>
            </Header>

            {/* se repository != null, faça o RepositoryInfo */}
            {repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>

                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <p>Stars</p>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <p>Forks</p>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <p>Issues abertas</p>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map(issues => (
                    <a key={issues.id} href={issues.html_url}>
                        <div>
                            <strong>{issues.title}</strong>
                            <p>{issues.user.login}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
}
export default Repository;