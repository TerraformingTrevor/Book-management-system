"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// UPDATE
const updateBookSchema = z.object({
  id: z.string().min(1, "Please provide a valid id"),

  title: z
    .string()
    .min(1, "Title is required")
    .max(75, "Title must be at most 75 characters"),

  author: z
    .string()
    .min(1, "Book author is required"),

  published: z
  .iso.date("Publication date is required"),

  isbn: z
    .string()
    .regex(/^\d{13}$/, "ISBN must contain exactly 13 digits and be unique"),
});

type UpdateBookInput = z.input<typeof updateBookSchema>;

export async function updateBook(
  input: UpdateBookInput,
  shouldRedirect = true
) {
  let data: z.infer<typeof updateBookSchema>;

  try {
    data = updateBookSchema.parse(input);

    const author = await prisma.author.upsert({
      where: { name: data.author },
      update: {},
      create: { name: data.author },
    });

    await prisma.book.update({
      where: { id: data.id },
      data: {
        title: data.title,
        author: {
          connect: {
            id: author.id,
          },
        },
        published: new Date(data.published), // date is not assignable to type "number"
        isbn: data.isbn,
      },
    });

    revalidatePath("/books");
    revalidatePath(`/books/${data.id}`);
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return false;
    }

    throw err;
  }

  if (shouldRedirect) {
    redirect(`/books/${data.id}?toast=updated`);
  }

  return true;
}