import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing:0;
    }

    html, body{
        min-height:100%;
    }

    body{
        background-color: #7159c1;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button{
        color: #222;
        font-size: 16px;
        font-family: sans-serif;
    }

    button{
        cursor: pointer;
    }
`;
