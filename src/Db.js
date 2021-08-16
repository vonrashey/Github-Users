import Dexie from 'dexie';

const db = new Dexie('GithubUsers');

db.version(1).stores({
  testData: 'datakey'
});

export default db;

