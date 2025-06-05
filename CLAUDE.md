# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a news curation site project using **Kuroco headless CMS** with **Next.js Static Site Generation (SSG)** for SEO-optimized performance. The project follows a Jamstack architecture (JavaScript + API + Markup) with static-first deployment to KurocoFront.

## Architecture

### Core Stack
- **Frontend**: React 18+ with Next.js 14+ (SSG-focused configuration)
- **Backend**: Kuroco headless CMS via REST API
- **Hosting**: KurocoFront static hosting with integrated CDN
- **Styling**: Tailwind CSS with Headless UI components
- **Data Fetching**: Hybrid approach (SSG at build time + SWR for client-side updates)

### Key Architectural Decisions
- **Static-First**: All primary content generated at build time for optimal SEO and performance
- **Hybrid Data Strategy**: 
  - Static content (featured articles, categories) via `getStaticProps`
  - Dynamic content (latest news) via client-side SWR fetching
- **SEO Priority**: Complete static HTML generation with structured data, OGP tags, and automated sitemap
- **CDN Optimization**: Built for KurocoFront's static file distribution

## Development Commands

Based on the project's Next.js SSG configuration:

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build for production
npm run export                 # Export static files
npm run build-export          # Build and export in one command
npm run start                  # Start production server (local testing)

# Code Quality
npm run lint                   # Run ESLint
npm run type-check            # TypeScript type checking

# Testing
npm test                      # Run Jest tests
npm run test:watch            # Run tests in watch mode
```

## API Integration

### Kuroco API Endpoints
- **Base URL**: `https://[site-name].g.kuroco.app`
- **Articles List**: `/rcms-api/3/community/article`
- **Article Detail**: `/rcms-api/3/community/article/{topics_id}`

### Data Flow
1. **Build Time (SSG)**: Fetch featured articles and static content via `getStaticProps`
2. **Runtime (Client)**: Latest articles via SWR with 5-minute refresh intervals
3. **Static Paths**: Generate article detail pages via `getStaticPaths` with `fallback: 'blocking'`

## Configuration Requirements

### Environment Variables
```bash
KUROCO_API=https://[site-name].g.kuroco.app
NEXT_PUBLIC_KUROCO_API=https://[site-name].g.kuroco.app  # Client-side access
SITE_URL=https://your-domain.com                         # For canonical URLs and OGP
```

### Next.js Configuration (next.config.js)
```javascript
module.exports = {
  output: 'export',              // Enable static export for KurocoFront
  trailingSlash: true,           # Required for KurocoFront compatibility
  images: {
    unoptimized: true,           # Required for static export
    domains: ['[site].g.kuroco-img.app']
  }
}
```

### KurocoFront Configuration (kuroco_front.json)
```json
{
  "rewrites": [
    { "source": ".*", "destination": "/index.html" }
  ],
  "redirects": [],
  "basic": [],
  "ip_restrictions": []
}
```

## SEO Implementation Strategy

### Static Generation Priorities
1. **Critical SEO Pages**: Homepage and article details must be static
2. **Meta Tags**: Generated at build time via `next-seo` library
3. **Structured Data**: JSON-LD schema embedded in static HTML
4. **Sitemaps**: Auto-generated via `next-sitemap` package

### Performance Targets
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- PageSpeed Insights: 90+ score for mobile and desktop
- Build time: < 5 minutes for full site generation

## Content Structure

### Kuroco CMS Data Model
- **Articles**: Main content with title, body, thumbnail, categories
- **Categories**: Content classification with slugs
- **News Sources**: External API configurations for content aggregation

### Key Fields for Development
- `topics_id`: Unique article identifier
- `slug`: URL-friendly identifier (may be empty, use topics_id as fallback)
- `inst_ymdhi`: Publication timestamp (ISO 8601)
- `thumbnail.url`: Optimized image URL from Kuroco CDN
- `contents_type_nm`: Category/content type name

## Deployment Workflow

### Static Export Process
1. `npm run build` - Generate optimized production build
2. `next export` - Create static files in `/out` directory
3. Deploy `/out` contents to KurocoFront via GitHub Actions

### Content Update Strategy
- **Static Content**: Rebuild required for featured articles and site structure
- **Dynamic Content**: Client-side updates via SWR without rebuild
- **Recommended**: Schedule builds every 6-12 hours for fresh static content

## Image Optimization

### Kuroco CDN Integration
- Images served from `[site].g.kuroco-img.app`
- Automatic optimization and WebP conversion
- Use `thumbnail.url` for optimized versions, `thumbnail.url_org` for originals

### Static Export Considerations
- Set `images.unoptimized: true` in next.config.js
- Implement manual responsive image handling
- Leverage Kuroco's built-in CDN optimization

## TypeScript Implementation

The project uses comprehensive TypeScript definitions for Kuroco API responses. Key interfaces:
- `Article`: Complete article data structure
- `ArticleListResponse` / `ArticleDetailResponse`: API response wrappers
- `PageInfo`: Pagination metadata
- `Thumbnail`: Image data structure