# AI Rules for Asistto Dental App

## Tech Stack
- Next.js 16 (App Router) with TypeScript
- Tailwind CSS v4 for styling
- shadcn/ui components for UI primitives
- framer-motion for animations and transitions
- lucide-react for icons
- clsx and tailwind-merge for class name utilities
- next/font/google for custom font loading
- React Router (kept in `src/App.tsx`)

## Library Usage Rules
- **UI Components**: Use only shadcn/ui components; do not create new UI libraries. If a component is missing, create a new file in `src/components/` and import it.
- **Styling**: Apply Tailwind classes exclusively; avoid inline styles or custom CSS files unless absolutely necessary.
- **Animations**: Use framer-motion for any motion effects; do not use CSS-only animations unless the requirement is static.
- **Icons**: Use lucide-react icons; import them directly and do not add additional icon packages.
- **Utility Functions**: Use `clsx` (or `cn` via `twMerge`) for conditional class handling; never concatenate class strings manually.
- **File Structure**: Keep pages in `src/pages/`, components in `src/components/`, utilities in `src/lib/`. Each new feature must have its own component file.
- **Type Safety**: All files must be written in TypeScript; avoid `any` types.
- **Performance**: Keep component files under 100 lines; if a file grows larger, refactor into smaller components.
- **Dependencies**: Only install npm packages via `<dyad-add-dependency>`; do not add packages that are already part of the stack (shadcn/ui, framer-motion, lucide-react, tailwind-merge, clsx).