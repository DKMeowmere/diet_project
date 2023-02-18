import styled from "styled-components";

type NavbarProps={}

export const NavbarContainer=styled.header`
background-color: #252525;
width: 100%;
display: flex;

color:${({theme})=>theme.colors.whiteText};
.logo{
    width: 25vw;
    padding: 20px;
    font-size: 2.5rem;
    text-align: center;
    color:mediumslateblue;
    
}
.container{
    display: flex;
    align-items: center;
    
}
nav{
   width :75vw;
}
.options-box{
   
    display: flex;
    justify-content: center;
    gap: 100px;
    font-size: 1.5rem;
    align-items: center;
}
.options1{
    background-color: #606060;
}
.options, .options1{
    border: 2px #FFF solid;
    padding: 20px;
}
.options:hover, .options1:hover{
    opacity: 0.9;
    background-color: white;
    color: black;
}

`