import { openDB } from 'idb';

const STORE_NAME = "Products";
const CART = "Cart";

export function initDB() {
  return openDB("Nozama", 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore(STORE_NAME, {
        // The 'id' property of the object will be the key.
        keyPath: "id",
      });
      const cart = db.createObjectStore(CART, {
        keypath: "id",
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex("id", "id");
      store.createIndex("category", "category");
      cart.createIndex("id", "id");
      cart.createIndex("product", "product");
    },
  });
}

export function initCart(){
  return openDB("cart", 2, {
    upgrade(db) {
      const cart = db.createObjectStore(CART, {
          keypath: "id",
      });

      cart.createIndex("id", "id");
      // cart.createIndex("category", "category");
    }
  })
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
  // console.log(data);
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


export async function setRessourcesCart(data) {
  const db = await initDB();
  const tx = db.transaction(CART, "readwrite");
  await tx.store.put(data);
  // console.log(data);
  return db.getFromIndex(CART, "id", data.id);
}

export async function getRessourcesCart(){  //Display cart on /cart
  const db = await initDB();
  // const tx = db.transaction(CART, "readwrite");
  console.log("id");
  console.log(db.getAllFromIndex(CART, "id"));
  return db.getAllFromIndex(CART, "id");
}

