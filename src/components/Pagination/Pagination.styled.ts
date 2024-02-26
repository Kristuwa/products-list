import styled from "styled-components";

export const ButtonsList = styled.div`
display:flex;
align-items: center;
justify-content:center;
gap:30px;
`
export const PagesList = styled.ul`
display:flex;
align-items: center;
justify-content:center;
flex-wrap:wrap;
gap:10px;`

export const Page = styled.li`
padding: 10px;
width:40px;
height:40px;
border-radius: 50%;
background-color:${(p: { active: boolean }) => p.active ? "#615858" : "#a1a1a1"};
color:${(p: { active: boolean }) => p.active ? "#fff" : "#000"};
display:flex;
justify-content:center;
align-items:center;
`

export const Button = styled.button`
background-color:#a1a1a1;
padding:5px;
width: 150px;
border-radius: 5px;
display:flex;
justify-content:center;
align-items:center;
border:1px solid #615858;
`