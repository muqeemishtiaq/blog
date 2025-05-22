import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  try {
    await connect();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    return new NextResponse("User has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
