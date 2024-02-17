export const dynamic = "force-dynamic"; //
import { acceptOrder, updateOrder } from "@/db/firebase";
import { getData, getOrderWithId } from "@/db/firebase";
type Context = {
  params: {
    orderId: string;
  };
};
export async function GET(req: Request, context: Context) {
  const res = await getOrderWithId(context.params.orderId);
  return Response.json(res);
}

export async function PATCH(req: Request, context: Context) {
  const body = await req.json();
  const orderId = context.params.orderId;
  const updateType = body.updateType as string;
  const otp = body.otp as string;
  const date = body.date as string;
  const userId = body.userId as string;
  const res = await acceptOrder(orderId, otp, date, userId);
  return Response.json({ res: "" });
}
