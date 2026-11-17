# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

<!-- Instructions:

1. npm install
2. add a .env file with this code in it:
DATABASE_URL=postgres://postgres:YOURSQLDATABASEPASSWORD@localhost:5432/bms
3. npx prisma generate
4. npx prisma migrate dev -->