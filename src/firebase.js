import { initializeApp } from "firebase/app";
import {
  getDatabase,
  set,
  ref,
  push,
  serverTimestamp,
  onChildAdded,
  onChildRemoved,
  onValue,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import firebaseConfig from "./firebase.json";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export function writeComment({ productId, user, comment }) {
  push(ref(database, `/comments/product-${productId}`), {
    comment,
    user: 1,
    date: serverTimestamp(),
  });
}

export function readComments(productId, cb = () => {}) {
  let data = [];

  const path = ref(database, `/comments/product-${productId}`);

  onChildAdded(path, (snapshot) => {
    data.push({
      key: snapshot.key,
      ...snapshot.val(),
    });
    cb(data);
  });

  onChildRemoved(path, (snapshot) => {
    data = data.filter((item) => item.key != snapshot.key);
    cb(data);
  });
}

export function getUser() {
  return auth.currentUser;
}

export function getAuthState(cb = () => {}) {
  onAuthStateChanged(auth, (user) => {
    if (user) return cb(user);
    cb(false);
  });
}

export async function createUser(email, password) {
  return setPersistence(auth, browserLocalPersistence).then(() => {
    return createUserWithEmailAndPassword(auth, email, password);
  });
}
