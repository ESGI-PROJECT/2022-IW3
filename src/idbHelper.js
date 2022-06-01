import { openDB } from "idb";

const PRODUCT_STORE_NAME = "Products";
const CART_STORE_NAME = "Cart";
export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      // Create a store of objects
      const productStore = db.createObjectStore(PRODUCT_STORE_NAME, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
      });
      // Create an index on the 'date' property of the objects.
      productStore.createIndex("id", "id");
      productStore.createIndex("category", "category");

      const cartStore = db.createObjectStore(CART_STORE_NAME);
    },
  });
}

export async function setRessources(data) {
  const db = await initDB();
  const tx = db.transaction(PRODUCT_STORE_NAME, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(PRODUCT_STORE_NAME, "id");
}

export async function setRessource(data) {
  const db = await initDB();
  const tx = db.transaction(PRODUCT_STORE_NAME, "readwrite");
  await tx.store.put(data);
  return db.getFromIndex(PRODUCT_STORE_NAME, "id", data.id);
}

export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(PRODUCT_STORE_NAME, "id");
}

export async function getRessourcesFromIndex(indexName) {
  const db = await initDB();
  return db.getAllFromIndex(PRODUCT_STORE_NAME, indexName);
}

export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(PRODUCT_STORE_NAME, "id", id);
}

export async function unsetRessource(id) {
  const db = await initDB();
  await db.delete(PRODUCT_STORE_NAME, id);
}

export async function setCart(cart) {
  const db = await initDB();
  const tx = db.transaction(CART_STORE_NAME, "readwrite");
  await tx.store.put(cart, "cart");
  return db.get(CART_STORE_NAME, "cart");
}

export async function getCart() {
  const db = await initDB();
  return db.get(CART_STORE_NAME, "cart");
}
