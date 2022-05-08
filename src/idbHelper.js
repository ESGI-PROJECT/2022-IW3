import { openDB } from 'idb';

const STORE_NAME = "Products";
const CART_NAME = "cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(STORE_NAME, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex("id", "id");
      store.createIndex("category", "category");

    },
  });
}

export function initDBCart() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(CART_NAME, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex("id", "id");
      store.createIndex("quantity", "quantity");
      store.createIndex("product", "product");
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

export async function setRessourcesCart(data) {
  const db = await initDB();
  const tx = db.transaction(CART_NAME, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(CART_NAME, "id");
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

export async function getRessourcesCart() {
  const db = await initDB();
  return db.getAllFromIndex(CART_NAME, "id");
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

export async function addProduct(id) {
  const db = await initDB();
  const newItem = [ { Product: id, quantity: 1 } ];
  const tx = db.transaction(CART_NAME, "readwrite");
  await tx.store.put(newItem[0]);
};

export async function getCart() {
  const db = await initDB();
  return db.getAllFromIndex(CART_NAME, "id");
}