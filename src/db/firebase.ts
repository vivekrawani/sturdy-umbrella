import "server-only";
import { initAdmin } from "./firebaseAdminSdk";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { error } from "console";

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
  const docRef = firestore.collection(collectionName).doc();
  const productId = docRef.id;
  const updateData = {
    name: data.get("name"),
    description: data.get("description"),
    inStock: parseFloat(data.get("inStock")),
    price: parseFloat(data.get("price")),
    isFeatured: data.get("isFeatured") === "true",
    discountedPrice: parseFloat(data.get("discountedPrice")),
    imageUrl,
    gst: parseFloat(data.get("gst")) | 0,
    size: data.get("size"),
    productId,
  };

  await docRef.set(updateData);
  return docRef.get();
}

export async function updateDoc(collection: string, docId: string, data: any) {
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
    collections.push(collection.doc);
  });
}

export async function getAllDocsFrom(collectionName: string) {
  await initAdmin();
  const firestore = getFirestore(); 
  const snapshot = await firestore.collection(collectionName).get();
  const res: any[] = [];
  snapshot.forEach((doc) => {
    res.push(doc.data());    
  });
  return res;
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
export async function getDocWithIdFromCollection(
  _id: string,
  collectionName: string
) {
  await initAdmin();
  const firestore = getFirestore();
  const data = (
    await firestore.collection(collectionName).doc(_id).get()
  ).data();
  return data;
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

export async function getAllProduct() {
  await initAdmin();
  const firestore = getFirestore();
  const collections = ["grocery", "stationary", "cosmetics"];
  const snapshots = await Promise.all(
    collections.map((collectionName) =>
      firestore.collection(collectionName).get()
    )
  );
  const results: any[] = [];
  snapshots.map((snap) => {
    const currRef = snap.docs;
    currRef.forEach((d) => {
      results.push(d.data());
    });
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
  orderId: string;
  gst: string;
  time: string;
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
    const orderId = element.id;

    const len = subCollections.length;
    // for (let j = 0; j < len - 1; j++) {
    //   const inElement = subCollections[j];
    //   const sub = await inElement.get();
    //   const product = (await subRef.doc(sub.id).get()).data();
    //   const name = product!.name;
    //   const imageUrl = product!.imageUrl;
    //   const price = product!.price;
    //   const count = product!.nos;
    //   const discountedPrice = product!.discountedPrice;
    //   const finalProduct: Product = {
    //     name,
    //     imageUrl,
    //     price,
    //     count,
    //     discountedPrice,
    //   };
    //   products.push(finalProduct);
    // }
    const ref = await subCollections[len - 1].get();
    const data = (await subRef.doc(ref.id).get()).data();

    const userName = data!.userName;
    const mobileNumber = data!.mobileNumber;
    const address = data!.address;
    const pincode = data!.pincode;
    const amount = data!.amount;
    const isAccepted = data!.isAccepted;
    const isDelivered = data!.isDelivered;
    const payment = data!.payment;
    const gst = data!.gst;
    const time = data!.time;

    const Order: OrderDetails = {
      userName,
      mobileNumber,
      address,
      pincode,
      amount,
      isAccepted,
      isDelivered,
      payment,
      orderId,
      gst,
      time,
    };
    orders.push(Order);
  }

  return orders;
};

export async function getOrderWithId(id: string) {
  await initAdmin();
  const db = getFirestore();
  const ordersRef = await db
    .collection("orders")
    .doc("newOrders")
    .collection(id)
    .get();
  const subCollections = ordersRef.docs;
  const products: any[] = [];
  for (let index = 0; index < subCollections.length - 1; index++) {
    products.push(subCollections[index].data());
  }
  const res = {
    products,
    orderDetails: subCollections[subCollections.length - 1].data(),
  };
  return res;
}

export const updateOrder = async (
  id: string,
  updateType: string,
  additionalInfo: string
) => {
  await initAdmin();
  const db = getFirestore();
  const ordersRef = await db
    .collection("orders")
    .doc("newOrders")
    .collection(id)
    .get();
  const subCollections = ordersRef.docs;
  const orderDetailsRef = subCollections[subCollections.length - 1].ref;
  if (updateType === "Accept Order") {
    const res = await orderDetailsRef.update({
      isAccepted: true,
      deliveryDate: additionalInfo,
    });
    return res;
  } else if (updateType === "Confirm Order") {
    const details = (await orderDetailsRef.get()).data();
    const res = {
      message: "",
      error: false,
    };
    if (details?.otp === additionalInfo) {
      res.message = "Order Delivered";
      await orderDetailsRef.update({
        isDelivered: true,
      });
    } else {
      res.message = "OTP did not match";
      res.error = true;
    }
    return res;
  }
};

export const searchByName = async (searchWord: string) => {
  await initAdmin();
  const db = getFirestore();
  const collectionName = "grocery";

  const query = db
    .collection(collectionName)
    .where("name", ">=", searchWord) // >= to include partial matches
    .where("name", "<", searchWord); // < to exclude exact matches and beyond

  try {
    const snapshot = await query.get();
    const re = snapshot.docs;
    const results = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return results;
  } catch (error) {
    console.error("Error searching for documents:", error);
    return [];
  }
};

export const searchProduct = async (q: string) => {
  await initAdmin();
  const firestore = getFirestore();
  const collections = ["grocery", "stationary", "cosmetics"];
  const results: any = [];

  const collectionRef = firestore
    .collection("grocery")
    .where("name", ">=", q)
    .where("name", "<=", q + "\uf8ff");
  const snap = await collectionRef.get();
  console.log(snap.docs);
  snap.docs.map((doc) => {
    results.push(doc.data());
  });

  //  return snap;

  // const snapshots = await Promise.all(
  //   collections.map(async (collectionName) =>
  //   {
  //     const collectionRef = firestore.collection(collectionName);
  //     const queryRef = collectionRef.orderBy('name').startAt(name).endAt(name+'\uf8ff');
  //     const snap = await queryRef.get();
  //     console.log(snap);

  //    return snap;
  //   }
  //     // firestore.collection(collectionName).doc().get()
  //   )
  // );

  // snapshots.forEach((doc) => {
  //    {
  //     results.push(doc.docs);
  //   }
  // });
  return results;
};

export const deleteProduct = async (collectionName: string, id_: string) => {
  await initAdmin();
  const firestore = getFirestore();
  const snapshot = firestore.collection(collectionName).doc(id_);
  const res = await snapshot.delete();
  return res;
};

export const getPastOrders = async () => {
  await initAdmin();
  const db = getFirestore();
  const orders: OrderDetails[] = [];
  const newOrdersRef = db.collection("orders").doc("pastOrders");
  const snap = await newOrdersRef.listCollections();
  for (let i = 0; i < snap.length; i++) {
    const element = snap[i];
    const subRef = newOrdersRef.collection(element.id);
    const subCollections = await subRef.listDocuments();
    const orderId = element.id;

    const len = subCollections.length;
    const ref = await subCollections[len - 1].get();
    const data = (await subRef.doc(ref.id).get()).data();
    const userName = data!.userName;
    const mobileNumber = data!.mobileNumber;
    const address = data!.address;
    const pincode = data!.pincode;
    const amount = data!.amount;
    const isAccepted = data!.isAccepted;
    const isDelivered = data!.isDelivered;
    const payment = data!.payment;
    const gst = data!.gst;
    const time = data!.time;

    const Order: OrderDetails = {
      userName,
      mobileNumber,
      address,
      pincode,
      amount,
      isAccepted,
      isDelivered,
      payment,
      orderId,
      gst,
      time,
    };
    orders.push(Order);
  }

  return orders;
};

export const acceptOrConfirmOrder = async () => {
  await initAdmin();
};
