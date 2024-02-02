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
  const firestore = getFirestore();
  const snapshot = await firestore.collection("users").get();
  const res: any = [];
  snapshot.forEach((doc) => {
    res.push({ docId: doc.id, data: doc.data() });
  });
  return res;
}

export async function addDoc(collectionName: any, data: any) {
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
  const firestore = getFirestore();
  var ref = firestore.collection(collection).doc(docId);

  // Set the "capital" field of the city 'DC'
  const res = await ref.update({
    gender: "male",
    age: 92,
  });

  return res;
}

export async function getAllCollections() {
  const firestore = getFirestore();
  const collections = await firestore.listCollections();
  collections.forEach((collection) => {
    console.log("Found subcollection with id:", collection.id);
  });
}
