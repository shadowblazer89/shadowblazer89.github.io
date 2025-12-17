# Design Guidelines: Naseer Ahmed Portfolio Website

## Design Approach
**System-Based Approach**: Apple HIG-inspired minimalism with technical sophistication. This is a utility-focused portfolio emphasizing credibility, clarity, and professional polish for a CS/AI/Security engineer targeting recruiters and technical audiences.

## Typography
- **Primary Font**: Inter (via Google Fonts)
- **Hierarchy**:
  - Hero Name: text-5xl to text-7xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Subsection Titles: text-xl to text-2xl, font-medium
  - Body Text: text-base, font-normal
  - Tech Stack Tags: text-sm, font-medium
  - Captions/Labels: text-sm, font-normal

## Layout System
- **Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-8, mb-12, space-y-6)
- **Container**: max-w-7xl mx-auto px-6 for all main content sections
- **Section Padding**: py-20 to py-24 for desktop, py-12 for mobile
- **Grid Patterns**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for projects; gap-8 to gap-12

## Component Library

### Hero Section (Full Viewport)
- Two-column split: 60/40 text-to-image ratio on desktop, stacked on mobile
- Left: Name, title ("Computer Science Student | AI & Security Engineer"), 1-2 sentence mission, CTA buttons
- Right: Professional profile image with subtle border treatment
- Subtle animated gradient mesh background or particles
- Height: min-h-screen with proper centering

### Experience Timeline
- Card-based vertical timeline with connecting line on left
- Each card: Organization, role, dates, 2-3 bullet points, tech stack pills at bottom
- Cards have subtle background with border, hover lift effect

### Project Cards
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Each card: Image placeholder/icon, title, description, tech stack tags, GitHub link button
- Hover state: subtle lift with shadow increase

### Skills Section
- Three category columns: Languages, Frameworks & AI Tools, Cloud & Platforms
- Each skill as pill badge: rounded-full px-4 py-2 with background and subtle border
- Skills wrap naturally within each category

### Contact Section
- Two-column: Left has email, LinkedIn, GitHub as icon + text links; Right has simple contact form
- Form inputs: clean with bottom border on focus, no heavy borders
- Submit button matches primary CTA style

## Color Palette (Dark Mode Default)
- **Background**: Charcoal/slate gradient (zinc-900 to slate-900)
- **Surface**: slate-800 with subtle transparency
- **Text Primary**: white/slate-50
- **Text Secondary**: slate-300
- **Accent**: Royal blue (#3B82F6) or violet (#8B5CF6) for CTAs, links, highlights
- **Borders**: slate-700 with low opacity

## Animations (Framer Motion - Subtle Only)
- Page load: Fade in with slight upward motion (stagger children by 100ms)
- Scroll reveals: Elements fade in as they enter viewport
- Hover states: Scale 1.02 or subtle shadow increase
- NO complex scroll-driven animations or parallax effects

## Images
- **Hero Section**: Professional headshot/profile photo (placeholder: 400x400px, rounded)
- **Project Cards**: Optional project thumbnails (placeholder: 16:9 aspect ratio)
- All images have subtle rounded corners (rounded-lg to rounded-xl)

## Accessibility
- Semantic HTML throughout (header, nav, main, section, footer)
- Proper contrast ratios (WCAG AA minimum)
- Focus states visible on all interactive elements
- Alt text for all images

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (3-column grids, full horizontal layouts)

## Key Design Principles
- **Whitespace First**: Generous spacing between sections and elements
- **No Clutter**: Each section has clear purpose, no decorative filler
- **Technical Confidence**: Clean, precise, engineering-focused aesthetic
- **Recruiter-Ready**: Scannable content hierarchy, easy navigation to resume/projects
- **Professional Polish**: Apple-level attention to detail in spacing, typography, and interactions