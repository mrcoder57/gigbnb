import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/dbConfig/dbCon";
import Gig from "@/models/gigMOdel";
import { z } from "zod";
import { verifyToken } from "@/middleware/auth";
import Profile from "@/models/profileModel";

const gigSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  location: z.string(),
  price: z.number().positive(),
  image: z.string(),
});

export async function POST(req: any) {
  await connectToDb();

  // Verify the token
  const tokenError = verifyToken(req);
  if (tokenError) {
    return tokenError;
  }
  const parsedBody = await req.json();

  const { title, description, price, image, location } =
    gigSchema.parse(parsedBody);
  const userId = req.userId;

  console.log("user", userId);

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required" },
      { status: 400 }
    );
  }

  try {
    const profile = await Profile.findOne({ userId }).select("name");
    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }
    const newGig = new Gig({
      title: title,
      description: description,
      price: price,
      userId,
      location: location,
      creatorName: profile.name,
      image: image,
    });

    await newGig.save();
    return NextResponse.json(
      { message: "Gig created successfully", newGig },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating gig", error: error },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  await connectToDb();

  try {
    const gigs = await Gig.find().exec();

    return NextResponse.json(
      { message: "Gigs fetched successfully", gigs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
