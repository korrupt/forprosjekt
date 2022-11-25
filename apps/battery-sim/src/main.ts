import { connect } from 'mqtt';

async function bootstrap() {
  const mq = connect('mqtt://localhost:1883');
}

bootstrap();
