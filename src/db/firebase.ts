import "server-only";
import { initAdmin } from "./firebaseAdminSdk";
import { getFirestore } from "firebase-admin/firestore";

export async function getCollections_() {
  await initAdmin();
  const firestore = getFirestore();
 
  const cols = await firestore.listCollections();
  const one = cols.map((doc) => doc.id);
  console.log(one);
  return one;
}
