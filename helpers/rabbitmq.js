import ampqplib from 'amqplib';

let channel;

async function connectRabbitMQ() {
    const connection = await ampqplib.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
}

function getChannel() {
    return channel;
}

export default {
    connectRabbitMQ,
    getChannel,
};