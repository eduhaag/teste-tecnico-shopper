<div align="center">
  
  # Teste técnico para Desenvolvedor Full Stack Jr. para Shopper.com.br
  
</div>
<div align="center">

![Badge do node](https://img.shields.io/badge/Node-18.12.1-red?logo=nodedotjs&color=%23339933)
![Badge da versão do React](https://img.shields.io/badge/React-v18.2.0-blue?logo=react&color=2ccce4)

![Badge de status do projeto](https://img.shields.io/badge/PROJETO%20CONCLU%C3%8DDO-darkGreen)

  
</div>

## 💻 Sobre o projeto
O projeto foi desenvolvido como teste técnico para Desenvolvedor Fullstack da Shopper.com.br.

A aplicação consiste em uma ferramenta para um supermercado para atualização de preços em massa através de um arquivo .csv.
Antes da atualização dos preços a aplicação exibe uma pré validação das regras de negócio e só permite a atualização caso todas as regras tenham sido cumpridas.

O back end da aplicação foi desenvolvido utilizando orientação a objetos, já o front end foi desenvolvido utilizando componentes funcionais do React e na estilização busquei seguir algumas caracteristicas do site da própria Shopper.

## Rodando a aplicação
Para rodar a aplicação é necessário possuir o Node previamente instalado.

Também é necessário ter acesso a um banco de dados Mysql para leitura e gravação dos dados

### clonando o repositório e preparando o banco de dados
```bash
# Clone o repositório
$ git clone git@github.com:eduhaag/teste-tecnico-shopper.git

# Acesse a pasta do projeto
$ cd teste-tecnico-shopper

# Dentro desta pasta você irá encontrar o arquivo `database.sql` que você deverá executar em seu servidor MySQL para preparar o banco de dados.
```

### Executando o back end
```bash
# Acesse diretório `backend'
$ cd backend

# Renomeie o arquivo `.env-example` para `.env` e preencha as informações de acesso ao banco de dados.

# Instale as dependências
$ npm install

# Rode o backend
$ npm run dev

# O servidor será executado em localhost, na porta informada no arquivo .env ou porta 3001.
.
```

### Executando front end
```bash
# Retorne ao diretório raiz
$ cd ..

# Acesse diretório `backend'
$ cd frontend

# Renomeie o arquivo `.env-example` para `.env` e preencha as informações de acesso ao banco de dados.

# Instale as dependências
$ npm install

# Rode o backend
$ npm run dev

# O servidor será executado em localhost, conforme porta informada no terminal.
.
```

## 🛠️ Tecnologias utilizadas
**Back end**
- Node (v.18.12.1);
- Typescript;
- Express;
- MySQL;
- Knex - Para transações com o banco de dados;
- Multer - Para upload do arquivo .csv;
- zod - Para validação de tipos dados;
- ts-node-dev - Para execução em desenvolvimento.
> Veja o arquivo [package.json](/backend/package.json)


**Front End**
- React (v.18.2.0);
- Typescript;
- Vite - Para criação e configuração inicial do projeto;
- styled-components - Para estilização;
- Axios - Comunicação com o back end;
- react-router-dom - Para gerenciamento de rotas. (Pensando em um futuro da aplicação)
> Veja o arquivo [package.json](/frontend/package.json)


