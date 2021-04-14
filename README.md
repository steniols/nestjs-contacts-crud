
## Description

A contacts CRUD API using NestJS and TypeORM

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
```

## Tests

```bash
# unit tests
$ pm run test
```

## CRUD avaliable operations


Return all contacts:
```
curl -X GET "http://localhost:3000/contacts" -H "accept: application/json"
```

Create a new contact:
```
curl -X POST "http://localhost:3000/contacts/create" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Travolta\",\"email\":\"stenio@souza.com\",\"phone\":\"47999999999\",\"city\":\"Joinville\",\"country\":\"Brasil\"}"
```

Update a contact by id:
```
curl -X PUT "http://localhost:3000/contacts/update/1" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Travolta\",\"email\":\"john@travolta.com\",\"phone\":\"47999999999\",\"city\":\"Rio de Janeiro\",\"country\":\"Brasil\"}"
```

Returns a contact by id
```
curl -X GET "http://localhost:3000/contacts/get/1" -H "accept: application/json"
```

Remove a contact by id:
```
curl -X DELETE "http://localhost:3000/contacts/delete/1" -H "accept: application/json" -H "Content-Type: application/json"
```
