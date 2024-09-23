import { envs } from "./config";
import { Server } from "./presentation/server";
(() => {

  main()

})()

async function main() {
  // todo: await base de datos

  // todo: await: inicio de server
  new Server({
    port: envs.PORT
  })
    .start()

}