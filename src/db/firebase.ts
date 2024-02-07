import "server-only";
import { initAdmin } from "./firebaseAdminSdk";
import { getFirestore, CollectionReference } from "firebase-admin/firestore";

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
    collections.push(collection.id);
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

type Product = {
  imageURL: string;
  name: string;
  price: number;
  count?: number;
};

interface OrderDetails {
  address?: string;
  pincode?: string;
  isAccepted: boolean;
  isDelivered: boolean;
  amount: string;
  mobileNumber: string;
  userName: string;
  payment: boolean;
  products: Product[];
  orderId:string;
}

export const getData = async () => {
  await initAdmin();
  const db = getFirestore();
  const orders: OrderDetails[] = [];

  const newOrdersRef = db.collection("orders").doc("newOrders");
  const snap = await newOrdersRef.listCollections();
  for (let i = 0; i < snap.length; i++) {
    const element = snap[i];
    const subRef = newOrdersRef.collection(element.id);
    const subCollections = await subRef.listDocuments();
    const products: Product[] = [];
    const orderId = element.id;
    const len = subCollections.length;
    for (let j = 0; j < len - 1; j++) {
      const inElement = subCollections[j];
      const sub = await inElement.get();
      const product = (await subRef.doc(sub.id).get()).data();
      const name = product!.name
      const imageURL = product!.imageURL;
      const price = product!.price;
      const count = product!.price;
      const finalProduct: Product = {
        name,
        imageURL,
        price,
        count,
      };
      products.push(finalProduct);
    }
    const ref = await subCollections[len-1].get();
    const OrderDetails  = (await subRef.doc(ref.id).get()).data();
    
    const userName = OrderDetails!.userName;
    const mobileNumber = OrderDetails!.mobileNumber;
    const address = OrderDetails!.address;
    const pincode = OrderDetails!.pincode;
    const amount = OrderDetails!.amount;
    const isAccepted = OrderDetails!.isAccepted;
    const isDelivered = OrderDetails!.isDelivered;
    const payment = OrderDetails!.payment;
    
    const Order : OrderDetails =  {
      userName, mobileNumber, address,pincode, amount, isAccepted, isDelivered, payment, products, orderId
    }
    orders.push(Order);
  }
  return orders;
};
