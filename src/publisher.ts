const RabbitConfig = require("./config.ts");
const amqpPublisher = require("amqplib");
const colors = require("colors");

const RamdomMessage = () => {
  const messages = [
    "Publisher message 1",
    "Publisher message 2",
    "Publisher message 3",
    { name: "Node js", age: 10, status: "Active", message: "Welcome Node js" },
    "Publisher message 4",
    "Publisher message 5",
    "Hola Mundo 2",
    { name: "User", age: 20, status: "Active", message: "Hola Mundo 3" },
    { name: "Mario", age: 11, status: "Active", message: "Welcome Mario" },
    { name: "Mario", age: 22, status: "Active", message: "Welcome Mario" },
  ];
  const index = Math.floor(Math.random() * messages.length);
  if (messages[index] == typeof "string") {
    return messages[index];
  }
  return JSON.stringify(messages[index]);
};

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
    channel.sendToQueue(
      RabbitConfig.QUEUE_NAME,
      Buffer.from(JSON.stringify(RamdomMessage()))
    );
  }, 2000);
}

main().catch(console.warn);
