import styled from "styled-components";

type NavbarProps={}

export const NavbarContainer=styled.header`
background-color:${({theme})=>theme.colors.whiteText};
height: 80px;
width: 100%;
display: flex;

color:${({theme})=>theme.colors.blackText};
svg{
    color:${({theme})=>theme.colors.main};
    font-size: 2.3rem;
    
}
nav{
    height: 100%;
    width:100%;
    display: flex;
    align-items: center;
}

.options-box{
    display: flex;
    justify-content: space-evenly;
    
    height: 100%;
    width: 100%;
}
.option{
    display: flex;
    width: 150px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
}
.option-text{
    color:${({theme})=>theme.colors.main};
    margin-top: 5px;
    font-size: 1.2rem;
}
`