import styled from 'styled-components'

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 8px solid ${({theme}) => theme['color-secondary']};
  border-top: 8px solid transparent;
  border-radius: 50%;
  animation: spinner .7s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`