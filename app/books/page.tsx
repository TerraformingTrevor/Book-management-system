import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import prisma from "@/lib/prisma";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: {
      author: true,
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Book Page</h1>
        <p className="text-sm text-muted-foreground"></p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>

              <CardDescription>
                Author: {book.author?.name ?? "Deleted Author"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p>Published: {book.published.toLocaleDateString("sv-SE")}</p>
            </CardContent>
            <CardFooter className="justify-end">
              <Link
                href={`/books/${book.id}`}
                className={buttonVariants({ variant: "link" })}
              >
                View Book
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
