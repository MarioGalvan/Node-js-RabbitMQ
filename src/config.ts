const RabbitMQConfig = {
  host: "amqp://localhost",
  port: 5672,
  QUEUE_NAME: "mario_queue",
  durable: false,
  noAck: true,
};

module.exports = RabbitMQConfig;
