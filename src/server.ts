import app from "./app";
import { AppDataSource } from "./data-source";

/*const init = async () => {
  const PORT = process.env.PORT || 3000;
  await AppDataSource.initialize();
  console.log("banco inicializado");

  app.listen(PORT, () => {
    console.log(`App is running!`);
  });
};

init();*/

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
  app.listen(3000, () => {
    console.log("Servidor executando");
  });
})();
