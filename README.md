<h1 align="center">
  Find a Friend
</h1>
<h3 align="center">
  Encontre um novo melhor amigo!
</h3>



<p align="center">
  <img src="https://img.shields.io/static/v1?label=find&message=friend&color=blueviolet&style=for-the-badge"/>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/MayconSlv/find-a-friend-API?color=blueviolet&logo=TypeScript&logoColor=white&style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MayconSlv/find-a-friend-API?color=blueviolet&style=for-the-badge">
</p>

#

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#tecnologias">Tecnologias</a>
</p>

## Sobre

A Find a Friend é uma API desenvolvida como parte do desafio do curso de NodeJS da trilha Ignite da Rocketseat. Tem a proposta de realizar o processo de adoção de animais de estimação, bem como permitir que organizações registrem animais para adoção.


## RFs (Requisitos funcionais)
- [x] Deve ser possivel cadastrar um pet. 
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade.
- [x] Deve ser possível filtrar pets por suas características.
- [x] Deve ser possível visualizar detalhes de um pet para adoção.
- [x] Deve ser possível cadastrar como uma ORG.
- [x] Deve ser possível realizar login como uma ORG.

## RNs (Regras de negócio)
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade.
- [x] Uma ORG precisa ter um endereço e um número de Whatsapp.
- [x] Um pet deve estar ligado a uma ORG.
- [x] O usuário que quer adotar, entrará em contato com a ORG via Whatsapp.
- [x] Todos os filtros, além da cidade, são opcionais.
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada.


## Instalação

```bash
# Clone este repositório
$ git clone git@github.com:MayconSlv/find-a-friend-API.git

# Instale as dependências
$ npm install

# Instale 
$ npx prisma migrate dev

# Inicie os containers
$ docker compose up -d

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev
```

## Tecnologias

[![My Skills](https://skillicons.dev/icons?i=nodejs,typescript,javascript,prisma,postgresql)](https://skillicons.dev)

##