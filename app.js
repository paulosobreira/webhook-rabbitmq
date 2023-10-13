require('dotenv').config();

const express = require('express');
const amqp = require('amqplib');
const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb'}));


async function publisher(mensagem) {
    var url = 'amqp://'+process.env.APP_QUEUE_USER+':'+process.env.APP_QUEUE_PWD+'@'+process.env.APP_QUEUE_HOST;
    const exchangeName = 'exchanger'; 
    const routingKey = 'route-receber';
    try {
        // Conecte-se ao servidor RabbitMQ
        const connection = await amqp.connect(url);
    
        // Crie um canal de comunicação
        const channel = await connection.createChannel();
      
        // Publicar a mensagem na exchange
        channel.publish(exchangeName, routingKey, Buffer.from(mensagem));
        console.log(`Mensagem enviada: ${mensagem}`);
    
        // Feche o canal e a conexão
        await channel.close();
        await connection.close();
      } catch (error) {
        console.error('Erro:', error);
      }    
}

app.use('/', (req, res, next) => {
  res.send('Webhook RabbitMQ');
})

app.use('/rabbitmq', (req, res, next) => {
    publisher(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    res.send('');
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Running at ${process.env.APP_PORT}`)
    console.log(`Accessing rabbit @ ${process.env.APP_QUEUE_HOST}`);
})