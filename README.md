# Typescript & Serverless Framework

Trabalhar com tecnologias Javascript integrada com recursos serverless e microsserviços tem se tornado uma demanda recorrente, quando falamos no contexto de aplicações modernas.

Contudo, estruturar um projeto dessa dimensão não é fácil! Prncipalmente quando precisamos buscar insumos na web para resolver determinado problema.

Pensando nisso, desenvolvemos uma aplicação voltada para utilização do superset do Javascript, o Typescript, aliado com o framework para deploys de recursos serverless na AWS, o famoso Serverless Framework.

## Arquitetura do projeto

Os principais recursos que irão nos apoiar na configuração de nossa aplicação são:

- GitHub:

  - Controle de versionamento e features do projeto.

- CloudFormation:

  - Responsável pela criação / atualização de toda a infraestrutura necessária para o projeto, por meio de código.

- S3:

  - Armazenamento dos pacotes e dependência relacionadas às funções do projeto.

- DynamoDB:

  - Banco de dados NoSQL para armazenamento dos dados da API.

- Lambda:

  - Serviço responsável pela execução dos códigos das funções.

- API Gateway:
  - Camada que fornecerá o endpoint e irá gerenciar todo o roteamento das requisições para as funções Lambda.

Veja a arquitetura abaixo para esclarecer as conexões entre os recursos:

![Arquitetura AWS](https://github.com/gugamainchein/serverless-framework-typescript/blob/master/docs/architecture/architecture.png?raw=true)

## Custo envolvido

Como você deve saber, os recursos AWS cobram por utilização e é importante trazermos essa visão de custo envolvido na arquitetura apresentada, pois esse tema pode tornar-se um fator de tomada de decisão da viabilidade técnica e de negócio da aplicação.

- São Paulo: $ 2.12 / mês
- Norte Virgínia: $ 1.41 / mês

O link da calculadora, você pode encontrar [clicando aqui][calc-aws]

## Instalação

Dado todo cenário de recursos e custos envolvidos, para essa aplicação, estamos utilizando o Node JS, com o superset do JS, o Typescript. Portanto, é necessário que você possua o [NodeJS][nodejs] instalado.

Após a instalação do Node JS e a conta AWS preparada para utilização, basta executar os comandos abaixo para iniciar o projeto.

Clonando o repositório e entrando na pasta:

```sh
git clone https://github.com/gugamainchein/serverless-framework-typescript
cd serverless-framework-typescript
```

Instalando dependências e executando o projeto:

```sh
yarn
yarn start
```

## Variáveis de ambiente

Após as realizações dos passos acima e a inicialização do projeto com sucesso, você está pronto para integrá-lo com os recursos de sua conta AWS, por meio das variáveis de ambiente abaixo:

- API_NAME: Nome do seu projeto back-end;

- STAGE: Ambiente que está trabalhando, como por exemplo "dev", "qa" e "prod";

- API_URL: Endpoint da API, de acordo com o ambiente. Caso esteja rodando localmente, a URL tende a ser http://localhost:3000;

- AUTH_HEADER: JWT de sua preferência para validação na autorização.

## Sobre o projeto

O back-end deste repositório, tem como propósito a realização do CRU (Create, Read e Update) de clientes no banco de dados. Pensando nisso, abordaremos nos tópicos abaixo como o projeto está estruturado.

- Arquivo principal:

  - O arquivo `serverless.ts` contém todas as instruções / configurações que o [Serverless Framework][serverless-framework] necessita para executar a aplicação localmente e em outros ambientes.

- Roteamento:

  - Dentro do diretório `/src/routes` encontram-se todos os arquivos de rotas, relacionados com os arquivos e funções responsáveis, da aplicação.

- Banco de dados:

  - No projeto, estamos utilizando o banco de dados NoSQL da AWS, no caso o DynamoDB. Por ser um recurso desta cloud, para realização da conexão e execução de comandos, utilizamos o [SDK][aws-sdk];
  - Todas as interaçõs com o DynamoDB serão encontradas em `/src/model`.

- Arquivos compartilhados:

  - Como uma prática muito comum de Clean Code, buscamos reaproveitar o máximo de código possível e de forma inteligente. Para alcançar esse propósito, todo compartilhamento de funções e objetos serão encontrados em `/src/shared`, separados de acordo com suas categorias.

- Funções:
  - Todas as funções, responsáveis pela execução das regras de negócio, encontram-se em `/src/functions`.

## Histórico de mudanças

- 0.1.0
  - Primeira versão da aplicação

## Sobre o criador

Gustavo Mainchein – [@gugamainchein](https://www.instagram.com/gugamainchein) – gustavomainchein@outlook.com

[Veja mais sobre mim](https://github.com/gugamainchein)

## Faça sua contribuição

1. Realize o fork do projeto (<https://github.com/gugamainchein/serverless-framework-typescript/fork>)
2. Crie a nova feature em uma branch (`git checkout -b feature/fooBar`)
3. Faça o commit das suas mudanças (`git commit -am 'Add some fooBar'`)
4. Realize o push para a branch (`git push origin feature/fooBar`)
5. Crie um novo pull request

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://docs.npmjs.com/cli/v8
[nodejs]: https://nodejs.org/en/
[calc-aws]: https://calculator.aws/#/estimate?id=3934f1535f86486af8b505fa82707e0722be1316
[serverless-framework]: https://www.serverless.com/framework/docs
[aws-sdk]: https://aws.amazon.com/sdk-for-javascript/
