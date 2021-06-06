import Realm from 'realm';

const NewsHistory: Realm.ObjectSchema = {
  name: 'news_history',
  primaryKey: 'url',
  properties: {
    author: { type: 'string', default: '' },
    title: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
    url: { type: 'string' },
    urlToImage: { type: 'string', default: '' },
    publishedAt: { type: 'string', default: '' },
    content: { type: 'string', default: '' },
    viewedAt: { type: 'int', default: '' },
  },
};

export { NewsHistory };
