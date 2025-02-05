// import { NextRequest, NextResponse } from "next/server";
// import { fetchCategories, addCategory, updateCategory, deleteCategory } from "@/lib/categoryActions";

// // ✅ GET: Fetch Categories from a Collection
// export const GET = async (req: NextRequest) => {
//   const { searchParams } = new URL(req.url);
//   const collection = searchParams.get("collection");

//   if (!collection) {
//     return NextResponse.json({ error: "Collection is required" }, { status: 400 });
//   }

//   try {
//     const categories = await fetchCategories(collection);
//     return NextResponse.json(categories);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
//   }
// };

// // ✅ POST: Add a New Category (with Image)
// export const POST = async (req: NextRequest) => {
//   const body = await req.json();
//   if (!body.collection || !body.name) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   try {
//     const image = body.image || "/placeholder.png"; // Default Image
//     await addCategory(body.collection, body.name, image);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
//   }
// };

// // ✅ PUT: Update Category Name or Image
// export const PUT = async (req: NextRequest) => {
//   const body = await req.json();
//   if (!body.collection || !body.categoryId) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   try {
//     await updateCategory(body.collection, body.categoryId, body.newName, body.image);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
//   }
// };

// // ✅ DELETE: Remove a Category
// export const DELETE = async (req: NextRequest) => {
//   const body = await req.json();
//   if (!body.collection || !body.categoryId) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//   }

//   try {
//     await deleteCategory(body.collection, body.categoryId);
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
//   }
// };
