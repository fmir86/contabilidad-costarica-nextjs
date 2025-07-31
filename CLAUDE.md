# CLAUDE.md - Project Guidelines

## Build Commands
- Development: `npm run dev` (uses turbopack)
- Production build: `npm run build`
- Start production: `npm run start`
- Lint: `npm run lint`

## Code Style Guidelines
- **TypeScript**: Use strict typing with interfaces for props
- **Components**: Functional components with explicit typing (`React.FC<Props>`)
- **Imports**: Absolute imports with `@/*` alias (e.g., `@/components/Header`)
- **Naming**:
  - Components: PascalCase (Header.tsx)
  - Folders: Match component names (Header/Header.tsx)
  - Functions: camelCase
- **Styling**: CSS Modules with component-scoped .module.scss files
- **Responsiveness**: Mobile-first approach with Tailwind breakpoints
- **Error Handling**: Prefer try/catch blocks with useRef/useEffect patterns
- **Accessibility**: Ensure proper ARIA attributes and semantic HTML
- **State Management**: useState for component state, useRef for DOM elements
- **Animations**: GSAP for complex animations

Always include "use client" directive at the top of interactive components.

## Sitemap Configuration

### Overview
The project has a dynamic sitemap configured at `src/app/sitemap.ts` that automatically includes:
- Static pages (home, about, services, blog, contact)
- Dynamic blog posts from `/blogposts` directory
- Dynamic service pages from `/servicios` directory

### Key Files
- `src/app/sitemap.ts` - Main sitemap configuration
- `lib/markdown.ts` - Helper functions for reading content
- `lib/utils/file-utils.ts` - Utilities for file timestamps
- `public/robots.txt` - Points to the sitemap

### Commands
- View sitemap in dev: Visit `http://localhost:3000/sitemap.xml`
- Test sitemap generation: `npm run test:sitemap`

### Adding New Dynamic Categories
See `EXAMPLE_NEW_CATEGORY.md` for a complete guide on adding new dynamic content types to the sitemap.

### Best Practices
- Use actual file modification dates for `lastModified`
- Include images in sitemap entries when available
- Set appropriate priority values (1.0 for homepage, 0.6-0.9 for other pages)
- Choose realistic change frequencies (daily, weekly, monthly, yearly)