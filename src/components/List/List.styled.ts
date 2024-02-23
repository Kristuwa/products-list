import styled from "styled-components";

export const Title = styled.h1`
text-align: center;
margin-bottom: 30px;
font-size: 40px;`;

export const List = styled.ul`
display:flex;
align-items: center;
justify-content:center;
flex-wrap:wrap;
gap: 30px;`;

export const Item = styled.li`
display:flex;
align-items: flex-start;
justify-content:center;
flex-direction:column;
gap: 10px;
padding: 20px;
width:400px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
flex-grow:1;`

export const Text = styled.p`
font-size: 18px;`;

export const Accent = styled.span`
font-size: 16px;
color:#a1a1a1;`;
