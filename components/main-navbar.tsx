import Link from "next/link";
import { buttonVariants } from "./ui/button";

const linkClassName = buttonVariants({
  variant: "secondary",
  size: "lg",
});

const links = [
  { label: "Books", href: "/books" },
  { label: "Listing", href: "/listing" },
  { label: "Create", href: "/books/create" },
];

export function MainNavbar() {
  return (
    <nav className="flex h-14 items-center gap-1 border-b px-6">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClassName}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
