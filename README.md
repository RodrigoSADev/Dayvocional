# Dayvocional

Dayvocional é uma aplicação de devocionais diários, desenvolvida para ajudar os usuários a manterem uma rotina de leitura bíblia e reflexão espiritual.

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.0.3.

## Stack do Projeto

- Angular
- TypeScript
- RxJS
- Bootstrap
- Jest
- Cypress
- Biblia API
- Gemini API

## Funcionalidades

- **Formulário de Pesquisa**: Formulário para pesquisa de palavras na Bíblia.
- **Resultados de Pesquisa**: Exibição dos resultados da pesquisa com destaque para os termos encontrados.
- **Destaque de Texto**: Destaque de termos de pesquisa nos resultados.
- **Detalhes do Livro**: Exibição dos detalhes de um livro específico da Bíblia.
- **Detalhes do Capítulo**: Exibição dos detalhes de um capítulo específico da Bíblia.
- **Navegação entre Capítulos**: Navegação entre capítulos anteriores e seguintes na Bíblia.
- **Explicação de Versículos**: Geração de explicações detalhadas para versículos da Bíblia usando IA.
- **Acessibilidade**: Ajuste do tamanho da fonte para melhorar a acessibilidade.
- **Serviços de API**: Integração com APIs para obter dados da Bíblia e gerar conteúdo com IA.

## Conventional Commits

Este projeto utiliza o padrão de conventional commits ([Conventional Commits](https://www.conventionalcommits.org/)) para manter um histórico de commits claro e consistente.

### Tipos de Commits

- `feat`: Utilizado para a adição de uma nova funcionalidade.
- `fix`: Utilizado para correções de bugs.
- `refactor`: Utilizado para mudanças de código que não corrigem bugs nem adicionam funcionalidades.
- `test`: Utilizado para adição ou correção de testes.

## Configuração de CI/CD

Este projeto utiliza GitHub Actions para configurar a Integração Contínua (CI) e a Entrega Contínua (CD). O pipeline CI/CD está definido no arquivo `.github/workflows/ci.yml`.

### Estrutura do Pipeline

1. **jest-tests**:
   - Executa os testes unitários utilizando Jest.
   - Inclui passos para checkout do código, configuração do Node.js, instalação das dependências e execução dos testes unitários.

2. **cypress-tests**:
   - Executa os testes de ponta a ponta utilizando Cypress.
   - Depende do job `jest-tests` e inclui passos para checkout do código, configuração do Node.js, instalação das dependências, inicialização da aplicação, espera da aplicação estar pronta e execução dos testes de ponta a ponta.

3. **deploy**:
   - Realiza o deploy da aplicação utilizando Vercel.
   - Depende dos jobs `jest-tests` e `cypress-tests` e inclui passos para checkout do código, configuração do Node.js, instalação das dependências e deploy para Vercel.

## Como rodar o projeto na sua máquina

### Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

    Node.js (versão 18 ou superior)
    Angular CLI (versão 18 ou superior)

### Configuração do projeto

Siga os passos abaixo para configurar o projeto em sua máquina:

Clone o repositório para o seu ambiente local: ```git clone https://github.com/RodrigoSADev/Dayvocional```

Navegue até o diretório do projeto: ```cd nome-do-repositorio```

Instale as dependências do projeto: ```npm install```

### Executando o projeto

Após a configuração, você pode executar o projeto localmente. Utilize o seguinte comando: `ng serve`

A aplicação estará disponível em `http://localhost:4200/`. A página será recarregada automaticamente sempre que houver alterações no código.

## Executando Testes Unitários

Execute o comando `ng test` para executar os testes unitários via [Jest](https://jestjs.io/pt-BR/).

![Captura de tela de 2024-11-29 14-05-22](https://github.com/user-attachments/assets/4f5ec73d-3266-4b47-b767-c8bf118f71fc)

## Executando Testes de Ponta a Ponta

Execute o comando `npx cypress run` para executar os testes unitários via [Cypress](https://www.cypress.io/).

![Captura de tela de 2024-11-29 14-03-26](https://github.com/user-attachments/assets/20a6993f-a4b8-4bdc-bf24-8736db154c26)

## Screenshots

![Captura de tela de 2024-11-29 13-57-36](https://github.com/user-attachments/assets/6ddaf3db-36ac-4238-b896-ba3650b7711e)

![Captura de tela de 2024-11-29 13-57-05](https://github.com/user-attachments/assets/f6e34037-f8df-48db-8717-b86fdf44c680)

![Captura de tela de 2024-11-29 13-57-49](https://github.com/user-attachments/assets/b0978b34-d89a-4886-a127-b05912aab8c0)

![Captura de tela de 2024-11-29 13-58-04](https://github.com/user-attachments/assets/e802d07a-b67e-4d08-9d01-0832cb8e4929)
