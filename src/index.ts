import "reflect-metadata";
import { datasource } from "./datasource";

async function initialize() {
  await datasource.initialize();
  console.info("Datasource is connected 🔌");
}

initialize();
