import { Database } from "sqlite3";

type Db = {
  ref: Database;
  close: () => void;
};

type DbConfig = {
  fileName: string;
};

const getDbConfig = (config?: Partial<DbConfig>): DbConfig => {
  const { fileName = "db.sqlite" } = config ?? {};
  return { fileName };
};

export const getDb = (config?: Partial<DbConfig>): Db => {
  const { fileName } = getDbConfig(config);
  const ref = new Database(fileName);
  return {
    ref,
    close() {
      ref.close();
    },
  };
};
