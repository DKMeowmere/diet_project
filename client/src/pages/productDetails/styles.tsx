import styled from "styled-components";

export const ProductDetailsContainer=styled.article`
    width: 100%;
    display: flex;
    justify-content: center;
    .title{
        font-size: 1.2rem;
        margin-top: 20px;
        margin-bottom: 70px;

    }
    .diet-title{
        margin-bottom: 20px;
    }
    .annotation{
        margin-top: 30px;
    }
`
export const Form=styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    flex-direction: column;
    input{
        display: block;
        margin: auto;
    }
`
