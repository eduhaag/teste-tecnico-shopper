import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;  
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 18px;

  table {
    width: 100%;
    border: 2px solid ${({theme}) => theme["color-secondary"]};
    background-color: ${({theme}) => theme["color-tertiary"]};
    text-align: left;
    border-collapse: collapse;

    th {
      color: ${({theme}) => theme["color-white"]};
      background-color: ${({theme}) => theme["color-secondary"]};
      text-align: center;
    }

    tr:nth-child(even){
      background-color: ${({theme}) => theme["color-white"]}
    }

    td, th {
      border: 1px solid #AAA;
    }

    td {
      padding: .5rem;
    }

    td:last-child.has-error {
      color: ${({theme}) => theme["color-error"]}
    }
   

    td.align-right {
      text-align: right;
    }

    li {
      margin-left: 1rem
    }


  }
`