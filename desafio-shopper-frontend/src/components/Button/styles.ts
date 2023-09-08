import styled from "styled-components";


export const ButtonContainer = styled.button`
  padding: .625rem 1rem;
  font-weight: bold;
  border-radius: 10px;
  border: 0;

  cursor: pointer;

  &.primary-button {
    background-color: ${({theme}) => theme["color-secondary"]};
    color: ${({theme}) => theme["color-white"]};
  }

  &.secondary-button {
    background-color: ${({theme}) => theme["color-tertiary"]};
    color: ${({theme}) => theme["color-secondary"]};
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed
  }
`