"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// CREATE
const createBookSchema = z.object({
  title: z
    .string()
    .min(3, "Title has to be at least 3 characters")
    .max(75, "Title must be at most 75 characters"),

  author: z
    .string()
    .min(1, "Book author is required"),

  published: z
    .iso.date("Publication year is required"),

  isbn: z
    .string()
    .regex(/^\d{13}$/, "ISBN must contain exactly 13 digits"),
});

type CreateBookInput = z.input<typeof createBookSchema>;

export async function createBook(input: CreateBookInput) {
  let bookId: string;

  try {
    const data = createBookSchema.parse(input);

    const author = await prisma.author.upsert({
      where: { name: data.author },
      update: {},
      create: { name: data.author },
    });

    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: {
          connect: {
            id: author.id,
          },
        },
        published: new Date(data.published),
        isbn: data.isbn,
      },
    });

    bookId = book.id; // book ID turns into book.id
  } catch (err) {
    console.error(err);

    if (err instanceof z.ZodError) {
      return false;
    }

    return false;
  }

  revalidatePath("/books");
  redirect(`/books/${bookId}?toast=created`);
}
