import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

export const migrator = (sequelize: Sequelize) => {
  return new Umzug({
    migrations: {
      glob: '',
    },
    storage: new SequelizeStorage({ sequelize }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });
};
