# Contact Manager UI update

This update refreshes the UI while keeping the existing MongoDB models, server actions, session logic, and contact CRUD flow.

## Updated files
- `app/layout.tsx`
- `app/globals.css`
- `app/_components/navbar.tsx`
- `app/_components/LogOutBtn.tsx`
- `app/_components/contactList.tsx`
- `app/_components/DeleteButton.tsx`
- `app/_components/ContactForm.tsx`
- `app/_components/LoginForm.tsx`
- `app/_components/RegisterForm.tsx`
- `app/contact/page.tsx`
- `app/contact/new/page.tsx`
- `app/contact/edit/[id]/page.tsx`
- `app/_lib/mongodb.ts` (keeps the missing environment variable check inside `connectDB()` so build-time imports do not throw)

## Run locally
1. Keep your real `MONGODB_URI` in `.env.local` (do not commit it).
2. Run `npm install` if needed.
3. Run `npm run build`.
4. Run `npm run dev`.

The sidebar is shared across routes. On small screens it becomes a compact top navigation. Contact records and actions continue to use the existing server-side MongoDB logic.
