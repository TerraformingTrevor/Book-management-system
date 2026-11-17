import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookDeleteDialog } from "./_components/book-delete-dialog";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { BookUpdateDrawer } from "./update/_components/book_update_drawer";

export default async function BookDetailsPage(
  props: PageProps<"/books/[bookId]">
) {
  const params = await props.params;
  const bookId = params.bookId;

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { author: true },
  });

  if (!book) {
    notFound();
  }
  return (
    <div className="space-y-2 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{book.title}</h1>

        <Link
          href="/listing"
          className={buttonVariants({ variant: "outline" })}
        >
          Back to List
        </Link>
      </div>

      <h2 className="text-black-500 mt-2 text-lg font-bold">
        Author: {book.author?.name ?? "Deleted Author"}
      </h2>

      <p>Published: {book.published.toLocaleDateString("sv-SE")}</p>

      <h2 className="text-gray-500">
        isbn: {book.isbn}
        <div className="flex gap-2">
          <BookUpdateDrawer
            book={{
              id: book.id,
              title: book.title,
              author: book.author?.name ?? "Deleted Author",
              published: new Date(book.published),
              isbn: book.isbn,
            }}
          />
          <BookDeleteDialog bookId={book.id} redirectTo="/books" />
        </div>
      </h2>
    </div>
  );
}
