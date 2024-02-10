import "server-only";
import { initAdmin } from "./firebaseAdminSdk";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const uploadFile = async (file: File | null) => {
  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const bucket = getStorage().bucket();
    const filename = Date.now() + file.type;

    const options = {
      destination: `images/${filename}`,
      metadata: {
        contentType: file.type,
      },
    };
    const filRef = await bucket.file(options.destination).save(buffer, options);
    await bucket.file(`images/${filename}`).makePublic();
    const imageUrl = bucket.file(`images/${filename}`).publicUrl();
    return imageUrl;
  } else return "";
};
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

export async function addProduct(data: any) {
  await initAdmin();
  const firestore = getFirestore();
  const file: File | null = data.get("file[]") as unknown as File;
  const imageUrl = await uploadFile(file);
  const collectionName = data.get("category");
  const docRef =  firestore.collection(collectionName).doc();
  const productId = docRef.id
  const updateData = {
    name: data.get("name"),
    description: data.get("description"),
    inStock: parseFloat(data.get("inStock")),
    price: parseFloat(data.get("price")),
    isFeatured: data.get("isFeatured") === "true",
    discountedPrice: parseFloat(data.get("discountedPrice")),
    imageUrl,
    gst:0,
    size:data.get('size'),
    productId
  };
 
 
  await docRef.set(updateData)
  return docRef.get();
}

export async function updateDoc(collection: any, docId: any, data: any) {
  await initAdmin();
  const firestore = getFirestore();
  const updateData = {
    name: data.get("name"),
    description: data.get("description"),
    inStock: parseFloat(data.get("inStock")),
    price: parseFloat(data.get("price")),
    isFeatured: data.get("isFeatured") === "true",
    discountedPrice: parseFloat(data.get("discountedPrice")),
  };
  const dataRef = firestore.collection(collection).doc(docId);
  const res = await dataRef.update(updateData);
  const file: File | null = data.get("file[]") as unknown as File;
  const imageUrl = await uploadFile(file);
  if (imageUrl) {
    await dataRef.update({ imageUrl });
  }
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
  const res: any[] = [];
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
  imageUrl: string;
  name: string;
  price: number;
  count?: number;
  discountedPrice: number;
};

type OrderDetails = {
  address?: string;
  pincode?: string;
  isAccepted: boolean;
  isDelivered: boolean;
  amount: string;
  mobileNumber: string;
  userName: string;
  payment: boolean;
  products: Product[];
  orderId: string;
};

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
      const name = product!.name;
      const imageUrl = product!.imageUrl;
      const price = product!.price;
      const count = product!.nos;
      const discountedPrice = product!.discountedPrice;
      const finalProduct: Product = {
        name,
        imageUrl,
        price,
        count,
        discountedPrice,
      };
      products.push(finalProduct);
    }
    const ref = await subCollections[len - 1].get();
    const OrderDetails = (await subRef.doc(ref.id).get()).data();

    const userName = OrderDetails!.userName;
    const mobileNumber = OrderDetails!.mobileNumber;
    const address = OrderDetails!.address;
    const pincode = OrderDetails!.pincode;
    const amount = OrderDetails!.amount;
    const isAccepted = OrderDetails!.isAccepted;
    const isDelivered = OrderDetails!.isDelivered;
    const payment = OrderDetails!.payment;

    const Order: OrderDetails = {
      userName,
      mobileNumber,
      address,
      pincode,
      amount,
      isAccepted,
      isDelivered,
      payment,
      products,
      orderId,
    };
    orders.push(Order);
  }
  return orders;
};

// export const searchProduct = async (name: string | null) => {
//   if (!name) {
//     return [];
//   }
//   await initAdmin();
//   const firestore = getFirestore();
//   const collections = ["grocery", "stationary", "cosmetics"];
//   const results: any = [];

//   const collectionRef = firestore.collection("grocery");
//   const queryRef = collectionRef
//     .orderBy("name")
//     .startAt(name)
//     .endAt(name + "\uf8ff");
//   const snap = await queryRef.get();
//   console.log(snap);

//   //  return snap;

//   // const snapshots = await Promise.all(
//   //   collections.map(async (collectionName) =>
//   //   {
//   //     const collectionRef = firestore.collection(collectionName);
//   //     const queryRef = collectionRef.orderBy('name').startAt(name).endAt(name+'\uf8ff');
//   //     const snap = await queryRef.get();
//   //     console.log(snap);

//   //    return snap;
//   //   }
//   //     // firestore.collection(collectionName).doc().get()
//   //   )
//   // );

//   // snapshots.forEach((doc) => {
//   //    {
//   //     results.push(doc.docs);
//   //   }
//   // });
//   return results;
// };

export const deleteProduct = async (collectionName: string, id_: string) => {
  await initAdmin();
  const firestore = getFirestore();
  const snapshot = firestore.collection(collectionName).doc(id_);
  const res = await snapshot.delete();
  return res;
};
