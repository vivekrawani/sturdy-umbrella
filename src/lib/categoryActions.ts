// import { initAdmin } from "@/db/firebaseAdminSdk"; 
// import { getFirestore } from "firebase-admin/firestore";

// export async function fetchCategories(collection: string) {
//   await initAdmin();
//   const firestore = getFirestore();
//   const snapshot = await firestore.collection(collection).get();
//   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }

// export async function addCategory(collection: string, name: string) {
//   await initAdmin();
//   const firestore = getFirestore();
//   await firestore.collection(collection).doc(name).set({ name });
// }

// export async function updateCategory(collection: string, categoryId: string, newName: string) {
//   await initAdmin();
//   const firestore = getFirestore();
//   await firestore.collection(collection).doc(categoryId).update({ name: newName });
// }

// export async function deleteCategory(collection: string, categoryId: string) {
//   await initAdmin();
//   const firestore = getFirestore();
//   await firestore.collection(collection).doc(categoryId).delete();
// }
