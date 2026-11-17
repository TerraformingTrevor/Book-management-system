"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/toast";

export function BookToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const shownToast = useRef<string | null>(null);

  useEffect(() => {
    const message = searchParams.get("toast");

    if (!message || shownToast.current === message) {
      return;
    }

    shownToast.current = message;

    if (message === "created") {
      toast.add({
        title: "Book added successfully!",
        type: "success",
      });
    }

    if (message === "updated") {
      toast.add({
        title: "Book updated successfully!",
        type: "success",
      });
    }

    if (message === "deleted") {
      toast.add({
        title: "Book deleted successfully!",
        type: "success",
      });
    }

    router.replace(pathname);
  }, [searchParams, pathname, router]);

  return null;
}
