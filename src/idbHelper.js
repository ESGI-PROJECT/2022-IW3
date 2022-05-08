import { openDB } from 'idb';

const STORE_NAME = "Products";
const CART_STORE_NAME = "Cart";
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

      const cartStore = db.createObjectStore(CART_STORE_NAME,{
        // The 'id' property of the object will be the key.
        keyPath: "id", autoIncrement: true
      });
      cartStore.createIndex("id", "id");
      cartStore.createIndex("cartId", "cartId");
      cartStore.createIndex("productId", "productId");

    },
  });
}

/**
 *
 * @param data
 * @returns {Promise<StoreValue<unknown, string>[]>}
 */
export async function setRessources(data) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(STORE_NAME, "id");
}

/**
 *
 * @param data
 * @returns {Promise<StoreValue<unknown, string> | undefined>}
 */
export async function setRessource(data) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.put(data);
  return db.getFromIndex(STORE_NAME, "id", data.id);
}

/**
 *
 * @returns {Promise<StoreValue<unknown, string>[]>}
 */
export async function getRessources() {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, "id");
}

/**
 *
 * @param indexName
 * @returns {Promise<StoreValue<unknown, string>[]>}
 */
export async function getRessourcesFromIndex(indexName) {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, indexName);
}

/**
 *
 * @param id
 * @returns {Promise<StoreValue<unknown, string> | undefined>}
 */
export async function getRessource(id) {
  const db = await initDB();
  return db.getFromIndex(STORE_NAME, "id", id);
}

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
export async function unsetRessource(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

/**
 * @param data
 * @returns {Promise<StoreValue<unknown, string>[]>}
 */
export async function setCartRessources(data) {
  const db = await initDB();
  const tx = db.transaction(CART_STORE_NAME, "readwrite");
  data.forEach((item) => {
    tx.store.put(item);
  });
  await tx.done;
  return db.getAllFromIndex(CART_STORE_NAME, "id");
}

/**
 *
 * @param data
 * @returns {Promise<StoreValue<unknown, string> | undefined>}
 */
export async function setCartRessource(data) {
  const db = await initDB();
  const tx = db.transaction(CART_STORE_NAME, "readwrite");
  await tx.store.put(data);
  //return db.getFromIndex(CART_STORE_NAME, "id", data.id);
}

/**
 * @returns {Promise<StoreValue<unknown, string>[]>}
 */
export async function getCartRessources(cartId) {
  const db = await initDB();
  return db.getAllFromIndex(CART_STORE_NAME, "cartId", cartId);
}

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
export async function unsetCartRessource(id) {
  const db = await initDB();
  await db.delete(CART_STORE_NAME, id);
}