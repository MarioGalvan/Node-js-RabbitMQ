const RabbitConfig = require("./config.ts");
const amqpPublisher = require("amqplib");
const colors = require("colors");

async function main() {
  console.log(" ::: Conectando con RabbitMQ :::".blue, RabbitConfig.host);
  const connection = await amqpPublisher.connect(
    RabbitConfig.host,
    (err, conn) => {
      if (err) {
        console.log("::: Error al conectar con RabbitMQ :::".red, err);
      } else {
        console.log("::: Conectado con RabbitMQ :::".blue);
      }
    }
  );
  const channel = await connection.createChannel();

  channel.assertQueue(RabbitConfig.QUEUE_NAME, {
    durable: RabbitConfig.durable,
  });

  setInterval(() => {
    console.log(" ::: Enviando Mensajes :::".green);
    channel.sendToQueue(RabbitConfig.QUEUE_NAME, Buffer.from("Hola Mundo"));
  }, 2000);
}

main().catch(console.warn);
