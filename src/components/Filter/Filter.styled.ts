import { Field, Form } from "formik";
import styled from "styled-components";

export const FormContainer = styled(Form)`
display: flex;
justify-content: flex-start;
align-items: center;
gap:20px;
margin-bottom: 30px;`;


export const Input = styled(Field)`
padding: 5px 10px;
width:200px;
border: 1px solid #615858;
border-radius: 5px;
`;

export const TextForm = styled.p`
margin-bottom: 5px;
font-size: 18px;`