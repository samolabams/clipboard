import 'reflect-metadata';
import 'module-alias/register';
import fastify, { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import 'dotenv/config';
import bootstrapApp from './bootstrap';
import appRoute from './modules/app/app.route';
import authRoute from './modules/auth/auth.route';
import staffRoute from './modules/staff/routes/staff.route';
import staffStatisticsRoute from './modules/staff/routes/staff-statistics.route';

class App {
  private fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>;

  constructor() {
    this.fastify = fastify({ logger: false });

    bootstrapApp(this.fastify);

    this.registerModules();
  }

  private registerModules() {
    this.fastify.register(appRoute);
    this.fastify.register(authRoute, { prefix: 'v1' });
    this.fastify.register(staffRoute, { prefix: 'v1' });
    this.fastify.register(staffStatisticsRoute, { prefix: 'v1' });
  }

  public getInstance() {
    return this.fastify;
  }

  public async close() {
    await this.fastify.close();
  }

  public listen(port: number, host = '0.0.0.0') {
    return this.fastify.listen({ port, host });
  }
}

export default App;
