import db from './Db.js';

export async function saveDataInIndexDB(data) {
  if (data) {
    if (db.testData) db.testData.clear();
    db.testData.add({ datakey: 'datakey', data }).then(() => {});
  }
}

export async function getDataFromIndexDB() {
  const testData = await db.testData
    .where('datakey')
    .equals('datakey')
    .toArray();
  if (testData && testData.length > 0) {
    return testData[0];
  }
  return null;
}



