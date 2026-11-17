"use server"


import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// DELETE
export async function deleteBook(
  bookId: string,
  redirectTo?: string
) {
  await prisma.book.delete({
    where: { id: bookId },
  });

  revalidatePath("/books");
  redirect(`${redirectTo ?? "/books"}?toast=deleted`);
}