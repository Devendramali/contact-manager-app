# Tailwind-only UI update

All page and component styling has been moved into Tailwind utility classes.
`app/globals.css` contains only the Tailwind import, theme tokens, and minimal base reset.
No custom component CSS classes or custom media-query selectors remain.

Existing authentication, MongoDB models, server actions, session handling, and CRUD calls were retained.
Keep your local `.env.local` file; it is not included in this ZIP.
