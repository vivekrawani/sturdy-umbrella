// import { db } from "@/db/firebase";
// import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

// // ✅ Fetch subcategories from a category
// export const fetchSubcategories = async (collectionName: string, categoryName: string) => {
//   const subcategoriesRef = collection(db, collectionName, "categories", "items", categoryName, "subcategories", "items");
//   const snapshot = await getDocs(subcategoriesRef);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// // ✅ Add a new subcategory with an image
// export const addSubcategory = async (
//   collectionName: string,
//   categoryName: string,
//   name: string,
//   image: string
// ) => {
//   const subcategoryRef = doc(db, collectionName, "categories", "items", categoryName, "subcategories", "items", name);
//   await setDoc(subcategoryRef, { name, image });
// };

// // ✅ Update a subcategory (name or image)
// export const updateSubcategory = async (
//   collectionName: string,
//   categoryName: string,
//   subcategoryId: string,
//   newName?: string,
//   image?: string
// ) => {
//   const subcategoryRef = doc(db, collectionName, "categories", "items", categoryName, "subcategories", "items", subcategoryId);
//   const updateData: any = {};
  
//   if (newName) updateData.name = newName;
//   if (image) updateData.image = image;

//   await updateDoc(subcategoryRef, updateData);
// };

// // ✅ Delete a subcategory
// export const deleteSubcategory = async (
//   collectionName: string,
//   categoryName: string,
//   subcategoryId: string
// ) => {
//   const subcategoryRef = doc(db, collectionName, "categories", "items", categoryName, "subcategories", "items", subcategoryId);
//   await deleteDoc(subcategoryRef);
// };
