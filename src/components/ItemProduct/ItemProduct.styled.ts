import styled from "styled-components";

export const Item = styled.li`
display:flex;
align-items: flex-start;
justify-content:center;
flex-direction:column;
gap: 10px;
padding: 20px;
width:250px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
flex-grow:1;`

export const Text = styled.p`
font-size: 18px;`;

export const Accent = styled.span`
font-size: 16px;
color:#a1a1a1;`;
