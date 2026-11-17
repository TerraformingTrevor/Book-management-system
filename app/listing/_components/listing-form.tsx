"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";

interface ListingFormProps {
  books: {
    id: string;
    title: string;
    isbn: string;
    published: Date;
    author: {
      name: string;
    } | null;
  }[];
}

export default function ListingForm({ books }: ListingFormProps) {
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) => {
    const searchTerm = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchTerm) ||
      book.author?.name.toLowerCase().includes(searchTerm) ||
      book.isbn.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search + Create */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by title, author or ISBN..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-md"
        />

        <Link
          href="/books/create"
          className={buttonVariants()}
        >
          Create New Book
        </Link>
      </div>

      {/* Results */}
      {filteredBooks.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {book.title}
                </CardTitle>

                <CardDescription>
                  {book.author?.name ?? "Deleted Author"}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Published
                  </span>

                  <span>
                    {book.published.toLocaleDateString("sv-SE")}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    ISBN
                  </span>

                  <span className="font-mono text-xs">
                    {book.isbn}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Link
                  href={`/books/${book.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                >
                  View Book
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">
            No books found
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Try searching for another title, author, or ISBN.
          </p>

          {search && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearch("")}
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}