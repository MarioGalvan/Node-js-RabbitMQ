const RabbitConfigConsumer = require("./config.ts");
const amqp = require("amqplib");
const colors2 = require("colors");

async function mainConsumer() {
  const connection = await amqp.connect(RabbitConfigConsumer.host);
  const channel = await connection.createChannel();
    console.log(colors2.blue(" ::: Conectado con RabbitMQ :::"));
  channel.assertQueue(RabbitConfigConsumer.QUEUE_NAME, {
    durable: RabbitConfigConsumer.durable,
  });

  channel.consume(
    RabbitConfigConsumer.QUEUE_NAME,
    (msg:any) => {
      console.log(colors2.yellow(" ::: Mensaje Recibido :::"), msg.content.toString());
    },
    {
      noAck: RabbitConfigConsumer.noAck,
    }
  );
}

mainConsumer().catch(console.warn);
