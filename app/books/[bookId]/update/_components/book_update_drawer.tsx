"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BookUpdateForm } from "../../_components/book_update_form";

interface BookUpdateDrawerProps {
  book: {
    id: string;
    title: string;
    author: string;
    published: Date;
    isbn: string;
  };
}

export function BookUpdateDrawer({ book }: BookUpdateDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Update</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update book</DrawerTitle>
          <DrawerDescription>
            Change the information for this book.
          </DrawerDescription>
        </DrawerHeader>
        <BookUpdateForm book={book} />
      </DrawerContent>
    </Drawer>
  );
}
