<div align="center">

  # Teste técnico para Desenvolvedor Full Stack Jr. para Shopper.com.br

  ## Back end
</div>

O back end da aplicação desenvolvido em Node com Typescript, subindo um servidor com utilizando Express.

Busquei utilizar orientação a objetos e boas práticas para que a aplicação tenha fácil manutenção e escalabilidade.

### Documentação
O back end possui as seguintes rotas:

* */products/update/file* : Recebe um arquivo .CSV contendo uma relação de produtos (*product_code*, *new_price* ) e retorna um array contendo a validação das regras de negócio antes da atualização de preços;

* */products/update* : Recebe um *json* contendo a propiedade *products* cujo o conteúdo é um *array* com os dados (*code*, *newPrice*) para a atualização dos valores dos produtos.
