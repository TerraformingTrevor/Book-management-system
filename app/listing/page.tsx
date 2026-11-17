import ListingForm from "./_components/listing-form";
import prisma from "@/lib/prisma";

export default async function ListingPage() {
  const books = await prisma.book.findMany({
    include: {
      author: true,
    },
    orderBy: [
      { updatedAt: "desc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <div className="space-y-8 p-6">
      <div>


        <h1 className="text-3xl font-bold tracking-tight">
          Search List
        </h1>

        <p className="text-muted-foreground">
          Browse and search in your book collection.
        </p>
      </div>

      <ListingForm books={books} />
    </div>
  );
}

