# Agent Instructions for PCIT Marketing Site

## General Development Guidelines

### TypeScript & Code Quality

- **Always use strict TypeScript types** - No `any` types allowed
- Use generics when needed for type safety
- All TypeScript typings must be as strict as possible

### Code Formatting & Linting

- **Prettier** is used for formatting: `pnpm run format`
- **ESLint** is used for linting: `pnpm run lint`
- **Knip** is used for checking unused code: `pnpm run unused`
- All checks can be run with: `pnpm run check`

### Styling Guidelines

- **Use Tailwind CSS** for all styling
- Leverage theme colors and utilities from `~/app/globals.css` where appropriate
- The project uses a comprehensive design system with semantic color tokens
- Custom CSS should be minimal and prefer Tailwind utilities

### Component Architecture

- **Shadcn/ui components** from `~/components/ui` should be used as fundamental building blocks
- These base components should be used instead of creating bespoke new components
- **Do not override styles** of base components - instead add new variants/props if necessary
- Custom shared components (more complex than base components) can be added to `~/components`
- Domain-specific or page-specific components can be co-located with their usage

### File Organization

- Base UI components: `~/components/ui/`
- Shared complex components: `~/components/`
- Page-specific components: co-located with pages
- Utilities: `~/utils/`
- API routes: `~/app/api/`
- Images: `~/utils/images.ts`
- Icons: `~/utils/icons.ts`

## Project-Specific Context

### Overview

This is the marketing site for **www.pcit-tracker.com** - a professional tool for tracking and managing PCIT
(Parent-Child Interaction Therapy) sessions.

### Key Requirements

- **Main page** (`~/app/page.tsx`) should prioritize **Lighthouse quality metrics**
- Focus on being a **quick and effective landing page**
- Optimize for performance, accessibility, and SEO
- Ensure fast loading times and smooth user experience

### Design System

The project includes a comprehensive design system with:

- Semantic color tokens for different content types (family, session, data, etc.)
- Dark/light theme support
- Custom animations and transitions
- Responsive design patterns

### Performance Considerations

- Optimize images and assets
- Use efficient loading patterns
- Minimize bundle size
- Ensure Core Web Vitals compliance
- Leverage Next.js optimizations

### Content Areas

The marketing site likely includes:

- Hero sections with value propositions
- Feature showcases
- Pricing information
- Contact forms
- Founder/team information
- Product demonstrations

## Development Workflow

- **During development**: Use `pnpm run lint` and `pnpm run format` regularly instead of manually fixing
  linting/formatting errors
- **Before committing**: Ensure all checks pass with `pnpm run check`
- **Component creation**: Start with Shadcn/ui base components, extend as needed
- **Styling**: Use Tailwind classes and theme tokens from globals.css
- **icons**: Use React Icons for icons mapped in `~/utils/icons.ts` - avoid creating cusstom SVGs
- **Performance**: Always consider Lighthouse metrics impact

## Best Practices

- **Mobile-first** responsive design
- **Accessibility** compliance (WCAG guidelines)
- **SEO optimization** with proper meta tags and structured data
- **Performance optimization** for marketing site requirements
- **Consistent branding** using the established design system
- **Clean, maintainable code** with proper TypeScript types
