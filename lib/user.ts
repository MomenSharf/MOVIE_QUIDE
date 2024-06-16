"use server";
import User from "./models/User.model";
import { connectToDB } from "./mongoose";
import { redirect } from "next/navigation";

export async function fetchUser(userId: string) {
  try {
    await connectToDB();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser(
  userId: string,
  formData: FormData
): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: formData.get("username"),
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        onboarded: true,
      },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }

  redirect("/");
}
