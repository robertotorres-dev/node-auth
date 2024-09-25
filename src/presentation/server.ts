import express, { Router } from 'express';

interface Options {
  port?: number;
  routes: Router;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  // constructor that receives parameters
  constructor(options: Options) {
    const { port = 3100, routes } = options
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // rergister routes
    this.app.use(this.routes);

    // initialize server
    this.app.listen(this.port, () => {
      console.log(`Server runing on port: ${this.port}`);
    });
  }
}