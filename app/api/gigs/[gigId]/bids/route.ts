import connectToDb from "@/dbConfig/dbCon";
import { CustomNextRequest, verifyToken } from "@/middleware/auth";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import Bid from "@/models/bidsModel";
import Gig from "@/models/gigMOdel";

export const bidSchema = z.object({
  // gigId: z.string(),
  // userId: z.string(),
  amount: z.number().positive(),
  message: z.string().optional(),
});
export async function POST(
  req: any,
  { params }: { params: { gigId: string } }
) {
  await connectToDb();

  const tokenError = verifyToken(req);
  if (tokenError) {
    return tokenError;
  }

  const parsedBody = bidSchema.safeParse(await req.json());
  const userId = req.userId;
// console.log("user",userId)
  if (!parsedBody.success) {
    return NextResponse.json(
      { message: "Validation error", errors: parsedBody.error.errors },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }

  const { amount, message } = parsedBody.data;

  try {
    const { gigId } = params;
// console.log(gigId)
    const bid = await Bid.create({
      gigId,
      userId,
      amount,
      message,
    });

    return NextResponse.json({ success: true, data: bid }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "error creating Bid", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(
  req: any,
  { params }: { params: { gigId: string } }
) {
  await connectToDb();

  // Verify the token
  const tokenError = verifyToken(req);
  if (tokenError) {
    return tokenError;
  }

  const { gigId } = params;
  const userId = req.userId;
  const isAdmin = req.isAdmin;
  const gig = await Gig.findById(gigId);
  if ((gig as any).userId.toString() !== userId && !isAdmin) {
    return NextResponse.json(
      { message: "Access denied. You are not the owner or an admin." },
      { status: 403 }
    );
  }
  try {
    const bids = await Bid.find({ gigId });

    return NextResponse.json({ success: true, data: bids });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
