import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookUpdateForm } from "../_components/book_update_form";

export default async function BookUpdatePage(
  props: PageProps<"/books/[bookId]/update">
) {
  const params = await props.params;
  const bookId = params.bookId;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    select: {
      id: true,
      title: true,
      author: {
        select: {
          name: true,
        },
      },
      published: true,
      isbn: true,
    },
  });

  if (!book || !book.author) {
    notFound();
  }

  return (
    <div className="space-y-2 p-6">
      <h1 className="text-3xl font-bold">Update Book</h1>

      <BookUpdateForm
        book={{
          id: book.id,
          title: book.title,
          author: book.author.name,
          published: book.published,
          isbn: book.isbn,
        }}
      />
    </div>
  );
}
