import styled from 'styled-components';
import { IconButton } from '@mui/material';

export const Wrapper = styled.div`
margin:40px;

input{
    position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  height: 80px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
    flex: 1;
  height: 40px;
  margin-left: 20px;
  margin-right: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0px 10px;
  border-radius: 20px;
  background-color: #f2f2f2;
  border:1px solid purple;
  margin:0 auto;
  width:50%;
  margin-bottom:1rem;
}
`;

export const StyledButton = styled(IconButton)`
position:fixed;
z-index:100;
right:20px;
top:20px;
`