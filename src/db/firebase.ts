import "server-only";
import { initAdmin } from "./firebaseAdminSdk";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export async function getCollections_() {
  await initAdmin();
  const firestore = getFirestore();
  const cols = await firestore.listCollections();
  const one = cols.map((doc) => doc.id);
  return one;
}

export async function getAllUsers() {
  await initAdmin();
  const firestore = getFirestore();
  const snapshot = await firestore.collection("users").get();
  const res: any = [];
  snapshot.forEach((doc) => {
    res.push(doc.data());
  });
  return res;
}

export async function addDoc(collectionName: any, data: any) {
  await initAdmin();
  const firestore = getFirestore();
  const docRef = await firestore.collection(collectionName).add(data);
  return docRef.get();

  // await docRef.set({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // });

  // await docRef.set({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // });
}
//JfNMQVo0WXEkmr5oWMCc

export async function updateDoc(collection: any, docId: any) {
  await initAdmin();
  const firestore = getFirestore();
  var ref = firestore.collection(collection).doc(docId);
  const res = await ref.update({
    gender: "male",
    age: 92,
  });
  return res;
}

export async function getAllCollections() {
  await initAdmin();
  const firestore = getFirestore();
  const snapshot = await firestore.listCollections();
  const collections = [];
  snapshot.forEach((collection) => {
    collections.push(collection.id)
  });
}

export async function getProductCollection(collectionName: string) {
  await initAdmin();
  const firestore = getFirestore();
  const snapshot = await firestore.collection(collectionName).get();
  const res: any = [];
  snapshot.forEach((doc) => {
    res.push(doc.data());
  });
  return res;
}

export async function getDocWithId(_id: string) {
  await initAdmin();
  const firestore = getFirestore();
  const collections = ["grocery", "stationary", "cosmetics"];
  const snapshots = await Promise.all(
    collections.map((collectionName) =>
      firestore.collection(collectionName).doc(_id).get()
    )
  );
  const results: any = [];
  snapshots.forEach((doc) => {
    if (doc.exists) {
      results.push(doc.data());
    }
  });
  return results;
}
