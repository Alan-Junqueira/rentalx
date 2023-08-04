import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

// createConnection({
//   type: "postgres",
//   port: 5432,
//   host: "localhost",
//   username: "docker",
//   password: "ignite",
//   database: "rentx",
//   entities: [Category, Specification, User, Car, Rental],
//   migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
//   cli: {
//     migrationsDir: "./src/shared/infra/typeorm/migrations",
//   },
// });

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      // entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_test"
          : defaultOptions.database,
    })
  );
};
