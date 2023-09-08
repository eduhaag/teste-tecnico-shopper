import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${({ theme })=> theme['color-header'] };
  color: ${({theme}) => theme['color-white']};
  display: flex;

  div {
    display: flex;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    height: 100px;
    gap: 3rem;
  }

  img {
    width: 140px;
    height:  auto;
  }
`