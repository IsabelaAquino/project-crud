Projeto de teste (Crud de Produtos com vuetify) - Para realizar esse teste foi utilizado o tema:
Vuetify Material Dashbord free disponível em: https://store.vuetifyjs.com/products/vuetify-material-dashboard-free

Para simular os dados da tabela de produtos foi utilizado uma fake api de produtos disponíovel em:
https://fakestoreapi.com/docs

A FakeStoreApi não fornece uma hash(chave única) para edição dos seus dados porém os métodos de put,
delete, post... São chamados e executados mas sem alteração na FakeApi. 

A estrutura do projeto permite a alteração da api de consumo para uma API real facilmente apenas editando a URL e URIs dos dois arquivos dentro da pasta services.

## Getting Started | Executar Projeto

- Install Nodejs from the official [Nodejs page](https://nodejs.org/en/)
- Install yarn from the official [Yarn installation page](https://classic.yarnpkg.com/en/docs/install/#windows-stable).
- Open your terminal
- Navigate to the project
- Run `yarn install`
- Run `yarn serve` to start a local development server
- A new tab will be opened in your browser

<!-- portugues -->
- Instale o Nodejs 
- Abra o projeto no terminal 
- Na pasta do projeto execute os comaNDOS:
`yarn install`
`yarn serve` para iniciar o servidor local do projeto

You can also run additional tasks such as (o comando run é opcional)

- `yarn run build` to build your app for production (para construir o build do projeto que irá para produção)
- `yarn run lint` to run linting.

Observações:
Não foi implementado os arquivos de testes mas o mesmo pode ser adicionado com jest futuramente
Não foi implementado Vuex 

Melhorias:
(As observações citadas acima)
- Tabela Paginada (A estrutura foi criada mas depende de um limit e page de uma API real)
- Componente de Modal
- Filtro dos produtos 
- Validação dos dados de post