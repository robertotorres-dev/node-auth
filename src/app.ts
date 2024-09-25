import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
(() => {

  main()

})()

async function main() {
  // todo: await base de datos

  // todo: await: inicio de server
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })
    .start()

}