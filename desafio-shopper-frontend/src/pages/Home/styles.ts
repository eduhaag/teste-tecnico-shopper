import styled from 'styled-components'

export const HomeContainer = styled.div`
  .description {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }

  a {
    color: ${({theme}) => theme["color-secondary"]};
    text-decoration: underline;
    cursor: pointer;
  }

  form {
    margin-top: 1.5rem;

    div {
      display: flex;
      margin-top: 1.5rem;
      gap: .5rem;
    }

    .loading{
      display: flex;
      justify-content: center
    }
  }
`