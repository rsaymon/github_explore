import styled, {css} from 'styled-components';
import { shade } from 'polished';


//template literals -> string com variáveis dentro


interface FormProps{
    hasError: boolean;
}

export const Title = styled.h1`
    color: #3a3a3a;
    font-size: 32px;
    margin-top: 80px;
    max-width: 450px;
    line-height: 56px;
`;

export const Form = styled.form<FormProps>`
    margin-top: 40px;
    max-width: 700px;
    display: flex;

    font-size: 32px;


    input{
        flex: 1;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0px 0px 5px;
        color: #3a3a3a;
        border: 2px solid #fff;
        border-right: 0;

        //passando a propriedade de erro para modificar o css do input caso exista erro.
        ${(props)=>props.hasError && css`
            border-color:#c53030;
        `}

        &::placeholder{
            color: #a8a8b3
        }
    }
    button{
        width: 210px;
        height: 70px;
        border: 0;
        background: #04d361;
        border-radius: 0px 5px 5px 0px;
        color: #FFF;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover{
            background: ${shade(0.2, '#04d361')};
        }
    }
`;

export const Repositories = styled.div`
    margin-top: 80px;
    max-width: 700px;
    
    a{
        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none; //retirar underline do texto
        
        display: flex;
        align-items: center;
        transition: transform 0.2s;

        &:hover{
            transform: translateX(10px);

        }
        
        & + a{
            margin-top: 16px;
        }

        img{
            width: 64px;
            height: 64px;
            border-radius: 50px;
        }

        div{
            margin-left: 16px;
            flex: 1;

            strong{
                font-size: 20px;
                color: #3d3d4d;
            }
            p{
                font-size: 18px;
                color: #a8a8b3;
                margin-top: 4px;
            }
        }    
        svg{
            margin-left: auto; //jogar pra direita;
            color: #cbcbd6; 
        }
    }
`;

export const Error = styled.span`
    display: block;
    color: #c53030;
    margin-top: 8px;

`;


