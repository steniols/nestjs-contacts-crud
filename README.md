
## Description

Um simples CRUD de contatos utilizando o NestJS com Sqlite.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ pm run test src/contacts/contacts.service.spec.ts
```

## Operações do Crud


Retorna todos os contatos:
```
curl -X GET "http://localhost:3000/contacts" -H "accept: application/json"
```

Cria um novo contato:
```
curl -X POST "http://localhost:3000/contacts/create" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Travolta\",\"email\":\"john@travolta.com\",\"phone\":\"47999999999\",\"city\":\"Joinville\",\"country\":\"Brasil\"}"
```

Atualiza um contato (no exemplo a cidade é atualizada):
```
curl -X PUT "http://localhost:3000/contacts/update/1" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Travolta\",\"email\":\"john@travolta.com\",\"phone\":\"47999999999\",\"city\":\"Rio de Janeiro\",\"country\":\"Brasil\"}"
```

Resgata o contato
```
curl -X GET "http://localhost:3000/contacts/get/1" -H "accept: application/json"
```

Deleta o contato:
```
curl -X DELETE "http://localhost:3000/contacts/delete/1" -H "accept: application/json" -H "Content-Type: application/json"
```