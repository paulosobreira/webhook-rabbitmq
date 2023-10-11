# Webhook rabbitmq
Serviço responsável por receber dados e enviar ao rabbitmq

## EndPoints
- /rabbitmq

## /rabbitmq
- Endpoint que envia informações dos alunos pos para a fila ***queue-receber***


## Tecnologias utilizadas
- [NodeJs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [RabbitMq](https://www.rabbitmq.com/)

## Dependências Npm
- ***amqplib*** versão 0.8.0
- ***dotenv-safe*** versão 8.2.0
- ***express*** versão 4.17.3

## Configuração do arquivo .env
modificar as informações do arquivo: ***.env***
```properties
PORT=3000
QUEUE_HOST={host}
QUEUE_USER={user}
QUEUE_PWD={password}
```
## Run
```sh
npm install
node app.js
```
