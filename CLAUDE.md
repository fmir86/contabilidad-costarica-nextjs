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