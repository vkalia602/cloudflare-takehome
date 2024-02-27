import { AppDataSource } from "./data-source";
import "dotenv/config";
import app from "./app";
AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT || 3000);
    console.log(`app listening on port`, process.env.PORT || 3000);
  })
  .catch((error) => console.log(error));
