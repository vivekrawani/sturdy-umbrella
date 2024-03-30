import "server-only";
import { initAdmin } from "./firebaseAdminSdk";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getMessaging } from "firebase-admin/messaging";

const uploadFile = async (file: File | null) => {
  if (file) {
    console.log(file.name, file.type)
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
  const file: File | null = data.get("file") as unknown as File;

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
  try {
    await docRef.set(updateData);
  } catch (error) {
    console.log(error);
  }

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

export async function getAllDocsFrom(collectionName: string, limit: number) {
  await initAdmin();
  const firestore = getFirestore();
  let snapshot;
  if (!Number.isNaN(limit)) {
    snapshot = await firestore
      .collection(collectionName)
      .orderBy("inStock")
      .limit(limit)
      .get();
  } else {
    snapshot = await firestore
      .collection(collectionName)
      .orderBy("inStock")
      .get();
  }
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

import type { OrderDetails } from "@/lib/types";
import { format } from "date-fns";

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
    const orderTime = data!.orderTime?.toDate();
    const userId = data!.userId;
    const orderAcceptTime = data!.orderAcceptTime;

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
      orderTime,
      userId,
      orderAcceptTime,
    };

    orders.push(Order);
  }

  return orders;
};

export async function getOrderWithId(id: string) {
  await initAdmin();
  const db = getFirestore();
  let ordersRef = await db
    .collection("orders")
    .doc("newOrders")
    .collection(id)
    .get();
  if (ordersRef.empty) {
    ordersRef = await db
      .collection("orders")
      .doc("pastOrders")
      .collection(id)
      .get();
  }
  const subCollections = ordersRef.docs;
  const products: any[] = [];
  for (let index = 0; index < subCollections.length - 1; index++) {
    products.push(subCollections[index].data());
  }
  const res = {
    products,
    orderDetails: subCollections[subCollections.length - 1].data(),
  };
  res.orderDetails.orderId = id;
  res.orderDetails.orderTime = res.orderDetails.orderTime.toDate();
  return res;
}

export const sendPushMessage = async (
  userId: string,
  title: string,
  body: string
) => {
  const db = getFirestore();
  const fcmSnap = await db.collection("users").doc(userId).get();
  const token = fcmSnap.get("fcm");
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };
  const messaging = getMessaging();
  await messaging.send(message);
};

export const acceptOrder = async (
  orderId: string,
  otp: string,
  deliveryTime: string,
  userId: string
) => {
  await initAdmin();
  const db = getFirestore();
  const userOrderRef = db
    .collection("users")
    .doc(userId)
    .collection("order")
    .doc("myOrders")
    .collection(orderId);
  const globalOrderRef = db
    .collection("orders")
    .doc("newOrders")
    .collection(orderId);
  const userOrder = await userOrderRef.doc("orderDetails").get();
  const globalOrder = await globalOrderRef.doc("orderDetails").get();
  const orderAcceptTime = new Date();
  if (userOrder.exists) {
    userOrderRef.doc("orderDetails").update({
      isAccepted: true,
      time: deliveryTime,
      orderAcceptTime,
      otp,
    });
  }
  if (globalOrder.exists) {
    globalOrderRef.doc("orderDetails").update({
      isAccepted: true,
      time: deliveryTime,
      orderAcceptTime,
      otp,
    });
  }

  sendPushMessage(userId, "Order Accepted", "Your Order has been accepted")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return { message: "success" };
};

export const confirmOrder = async (
  userId: string,
  orderId: string,
  otp: string
) => {
  await initAdmin();
  const db = getFirestore();
  const userOrderRef = db
    .collection("users")
    .doc(userId)
    .collection("order")
    .doc("myOrders")
    .collection(orderId);
  const globalOrderRef = db
    .collection("orders")
    .doc("newOrders")
    .collection(orderId);

  const orderRef = await userOrderRef.doc("orderDetails").get();
  const gOrderRef = await globalOrderRef.doc("orderDetails").get();

  const details = (await globalOrderRef.doc("orderDetails").get()).data();
  const res = {
    message: "",
    error: false,
  };
  if (details?.otp === otp) {
    res.message = "Order Delivered";
    const deliverTime = new Date();
    if (orderRef.exists) {
      userOrderRef.doc("orderDetails").update({
        isDelivered: true,
        payment: true,
        deliverTime,
      });
    }
    if (gOrderRef.exists) {
      globalOrderRef.doc("orderDetails").update({
        isDelivered: true,
        payment: true,
        deliverTime,
      });
    }

    sendPushMessage(userId, "Order Delivered", "Your order has been delivered")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    moveOrderToPastOrderUser(orderId, userId)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    moveOrderToPastOrderGlobal(orderId)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    return { message: "success" };
  } else {
    res.message = "OTP did not match";
    res.error = true;
    return res;
  }
};

export const updateOrder = async (
  id: string,
  updateType: string,
  otp: string,
  date: string
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
      time: date,
      otp,
    });
    return res;
  } else if (updateType === "Confirm Order") {
    const details = (await orderDetailsRef.get()).data();
    const res = {
      message: "",
      error: false,
    };
    if (details?.otp === otp) {
      res.message = "Order Delivered";
      orderDetailsRef.update({
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
    const userId = data!.userId;
    const orderTime = data!.orderTime?.toDate();
    const orderAcceptTime = data!.orderAcceptTime;

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
      userId,
      orderTime,
      orderAcceptTime,
    };
    orders.push(Order);
  }

  return orders;
};

export const acceptOrConfirmOrder = async () => {
  await initAdmin();
};
export async function moveOrderToPastOrderUser(
  orderId: string,
  userId: string
) {
  const db = getFirestore();
  const userOrderRef = db
    .collection("users")
    .doc(userId)
    .collection("order")
    .doc("myOrders")
    .collection(orderId);

  const targetCollection = db
    .collection("users")
    .doc(userId)
    .collection("order")
    .doc("pastOrder")
    .collection(orderId);

  userOrderRef
    .get()
    .then((qs) => {
      qs.forEach((doc) => {
        let data = doc.data();
        targetCollection
          .doc(doc.id)
          .set(data)
          .then(() => {
            console.log("Document copied");
            userOrderRef
              .doc(doc.id)
              .delete()
              .then(() => {
                console.log("Deleted");
              });
          })
          .catch((er) => {
            console.log("Cant copy", er);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
export async function moveOrderToPastOrderGlobal(orderId: string) {
  const db = getFirestore();
  const globalOrderRef = db
    .collection("orders")
    .doc("newOrders")
    .collection(orderId);

  const targetCollection = db
    .collection("orders")
    .doc("pastOrders")
    .collection(orderId);
  globalOrderRef
    .get()
    .then((qs) => {
      qs.forEach((doc) => {
        let data = doc.data();
        targetCollection
          .doc(doc.id)
          .set(data)
          .then(() => {
            console.log("Document copied");
            globalOrderRef
              .doc(doc.id)
              .delete()
              .then(() => {
                console.log("Deleted");
              });
          })
          .catch((er) => {
            console.log("Cant copy", er);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
export const getBanner = async () => {
  await initAdmin();
  const db = getFirestore();
  const imgArrayRef = db.collection("img").doc("img");
  const res = await imgArrayRef.get();
  const imageArray: string[] = res.data()!.img_array;
  // const newImage = "https://images.unsplash.com/photo-1705651460796-f4b4d74c9fea?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // imageArray.push(newImage);
  // imgArrayRef.update({img_array : imageArray});
  return imageArray;
};

export const getNotification = async () => {
  await initAdmin();
  const db = getFirestore();
  const snapshot = await db.collection("notifications").get();
  const res: any[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    const date = data?.date;
    if (date) {
      const stringDate = format(date.toDate(), "PPp");
      data.date = stringDate;
    }
    res.push(data);
  });
  return res;
};

export const addImageToBannerCollection = async (file: File) => {
  initAdmin();
  const db = getFirestore();
  const url = await uploadFile(file);
  const dataRef = db.collection("img").doc("img")
  const result   = (await dataRef.get()).data();
  const imageArray = result?.img_array;
  imageArray.push(url);
  console.log("Res", imageArray);
  const res = await dataRef.update({img_array : imageArray});
  return res;
};

// export const deleteFile = async()=>{
//   initAdmin();
//   const storage = getStorage();
//   const deleteOptions = {
//     ifGenerationMatch: generationMatchPrecondition,
//   };
//   async function deleteFile() {
//     await storage.bucket(bucketName).file(fileName).delete(deleteOptions);
  
//     console.log(`gs://${bucketName}/${fileName} deleted`);
//   }
  
//   deleteFile().catch(console.error);
// }
 
export const fetchSubcategories = async(sub : string)=>{
  await initAdmin();
const db = getFirestore();
const ref = db.collection("Subcategories").doc(sub);
const data = (await ref.get()).data();
return data;
}

// export const copyDoc = async (
//   collectionFrom: string,
//   docId: string,
//   collectionTo: string,
//   addData: any = {},
//   recursive = false,
// ): Promise<boolean> => {
//   // document reference
//   const docRef = admin.firestore().collection(collectionFrom).doc(docId);

//   // copy the document
//   const docData = await docRef
//     .get()
//     .then((doc) => doc.exists && doc.data())
//     .catch((error) => {
//       console.error('Error reading document', `${collectionFrom}/${docId}`, JSON.stringify(error));
//       throw new functions.https.HttpsError('not-found', 'Copying document was not read');
//     });

//   if (docData) {
//     // document exists, create the new item
//     await admin
//       .firestore()
//       .collection(collectionTo)
//       .doc(docId)
//       .set({ ...docData, ...addData })
//       .catch((error) => {
//         console.error('Error creating document', `${collectionTo}/${docId}`, JSON.stringify(error));
//         throw new functions.https.HttpsError(
//           'data-loss',
//           'Data was not copied properly to the target collection, please try again.',
//         );
//       });

//     // if copying of the subcollections is needed
//     if (recursive) {
//       // subcollections
//       const subcollections = await docRef.listCollections();
//       for await (const subcollectionRef of subcollections) {
//         const subcollectionPath = `${collectionFrom}/${docId}/${subcollectionRef.id}`;

//         // get all the documents in the collection
//         return await subcollectionRef
//           .get()
//           .then(async (snapshot) => {
//             const docs = snapshot.docs;
//             for await (const doc of docs) {
//               await copyDoc(subcollectionPath, doc.id, `${collectionTo}/${docId}/${subcollectionRef.id}`, true);
//             }
//             return true;
//           })
//           .catch((error) => {
//             console.error('Error reading subcollection', subcollectionPath, JSON.stringify(error));
//             throw new functions.https.HttpsError(
//               'data-loss',
//               'Data was not copied properly to the target collection, please try again.',
//             );
//           });
//       }
//     }
//     return true;
//   }
//   return false;
// };
