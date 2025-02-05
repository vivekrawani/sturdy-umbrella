//lib/categoryRoutes.ts
import { NextRequest, NextResponse } from "next/server";
import { addCategory, deleteCategory, editCategory } from "@/lib/categoryActions";

export async function POST(req: NextRequest) {
  try {
    const { collection, name, imageUrl } = await req.json();
    if (!collection || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await addCategory({ collection, name, imageUrl });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collection = searchParams.get("collection");
    const categoryId = searchParams.get("categoryId");

    if (!collection || !categoryId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    await deleteCategory(collection, categoryId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    try {
      const { categoryId, newData, collection } = await req.json(); // ✅ Include `collection`
      
      if (!categoryId || !newData || !collection) { // ✅ Ensure `collection` is provided
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
      }
  
      await editCategory(collection, categoryId, newData); // ✅ Pass `collection`
      
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("Error updating category:", error);
      return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
  }
  

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { "Allow": "POST, DELETE, PUT, OPTIONS" } });
}


