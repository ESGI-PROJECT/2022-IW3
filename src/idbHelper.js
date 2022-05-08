import { openDB } from 'idb';

const STORE_NAME = "Products";
const SHOPCART_NAME = "cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(STORE_NAME, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
        //id panier dure
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex("id", "id");
      store.createIndex("category", "category");
    },
  });
}

export async function setRessources(data) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(STORE_NAME, "id");
}

export async function setRessource(data) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.put(data);
  return db.getFromIndex(STORE_NAME, "id", data.id);
}

export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, "id");
}

export async function getRessourcesFromIndex(indexName) {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, indexName);
}

export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(STORE_NAME, "id", id);
};

export async function unsetRessource(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

export async function getChartDB() {
  const db = await initDB();
  return db.getAllFromIndex(SHOPCART_NAME, "id");
}

export async function unsetChart(id) {
  const db = await initDB();
  await db.delete(SHOPCART_NAME, id);
}

export async function setChartDB(data) {
  const db = await initDB();
  const tx = db.transaction(SHOPCART_NAME, "readwrite");
  data.data[0].forEach((item) => {
      tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(SHOPCART_NAME, "id");
}