import Realm from 'realm';
import { News } from 'types';

import { NewsHistory } from './schemas/news';

type TableName = 'news_history';

class RealmDao {
  private realmDao: Realm;

  private static instance: RealmDao | null = null;

  private constructor() {
    this.realmDao = new Realm({
      schema: [NewsHistory],
      schemaVersion: 1,
    });
  }

  public static getInstance = () => {
    if (RealmDao.instance === null) {
      RealmDao.instance = new RealmDao();
    }

    return RealmDao.instance;
  };

  public insert = (table: TableName, data: News) => {
    this.realmDao.write(() => {
      this.realmDao.create(table, data, Realm.UpdateMode.Modified);
    });
  };

  public retrieveAll = (table: TableName) => {
    return this.realmDao.objects(table).sorted('viewedAt', true);
  };
}

const realm = RealmDao.getInstance();

export { realm };
