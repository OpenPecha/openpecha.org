# OpenPecha.org

## Project info

**Website**: https://openpecha.org

## Developer Setup

### Prerequisites

- Node.js (Latest LTS version recommended) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm (comes with Node.js)

### Development Environment Setup

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd openpecha.org
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Available Scripts**
   - `npm run dev` - Start development server with hot reload
   - `npm run build` - Build for production
   - `npm run build:dev` - Build for development
   - `npm run lint` - Run ESLint to check code quality
   - `npm run preview` - Preview production build locally

### Tech Stack

This project uses modern web technologies:

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: shadcn-ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Development Tools**:
  - ESLint for code linting
  - TypeScript for type checking
  - PostCSS for CSS processing
  - SWC for fast compilation

## How to Edit the Code

There are several ways to work with this codebase:

### Local Development

Work locally using your preferred IDE:

```sh
# Start the development server
npm run dev
```

The dev server will start with:
- Hot module replacement
- Error overlay
- Fast refresh

### GitHub Integration

- **Direct GitHub Editing**: Use GitHub's web interface to make quick edits
- **GitHub Codespaces**: For a full cloud development environment

## Local Deployment Guide

This guide walks you through setting up and running the application locally for development and testing.

### Quick Start

If you've already set up the development environment, you can quickly start the app:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Complete Local Setup

#### 1. Environment Setup

Ensure you have the prerequisites installed:
- Node.js (Latest LTS version) - Check with `node --version`
- npm (comes with Node.js) - Check with `npm --version`

#### 2. Project Setup

```sh
# Clone and navigate to the project
git clone <YOUR_GIT_URL>
cd openpecha.org

# Install all dependencies
npm install
```

#### 3. Development Server

Start the development server with hot reload:

```sh
npm run dev
```

**Features:**
- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **Error Overlay**: Helpful error messages in the browser
- **Fast Refresh**: React components update without losing state
- **TypeScript Support**: Real-time type checking

**Default URL**: `http://localhost:5173`

#### 4. Production Build (Local)

Build the application for production:

```sh
# Create production build
npm run build

# Preview the production build locally
npm run preview
```

The preview server will typically run on `http://localhost:4173`.

#### 5. Development vs Production Builds

| Command | Purpose | Optimizations | Use Case |
|---------|---------|---------------|----------|
| `npm run dev` | Development server | None (fast compilation) | Active development |
| `npm run build:dev` | Development build | Minimal | Testing build process |
| `npm run build` | Production build | Full (minification, tree-shaking) | Pre-deployment testing |
| `npm run preview` | Preview production | Serves built files | Final local testing |

### Troubleshooting

#### Port Already in Use
If the default port is occupied:
```sh
# Vite will automatically try the next available port
# Or specify a custom port:
npm run dev -- --port 3000
```

#### Clear Cache and Reinstall
If you encounter dependency issues:
```sh
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
Run type checking separately:
```sh
npx tsc --noEmit
```

#### Build Errors
Check for linting issues:
```sh
npm run lint
```

### Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit files in your IDE
3. **Test Changes**: View updates in browser (auto-reload)
4. **Code Quality**: Run `npm run lint` before committing
5. **Test Build**: Run `npm run build` to ensure production build works
6. **Preview**: Use `npm run preview` to test the production build locally

## Deployment

This is a static site built with Vite. Build and deploy the `dist/` directory to your preferred static hosting provider (e.g., GitHub Pages, Netlify, Vercel).

Build locally:

```sh
npm run build
```

- GitHub Pages: configure a workflow to publish the contents of `dist/` or push it to a `gh-pages` branch. See the [GitHub Pages documentation](https://docs.github.com/en/pages).
- Netlify/Vercel: set the build command to `npm run build` and the publish/output directory to `dist/`.

### Custom domain

This repository includes a `CNAME` file for `openpecha.org`. For setup instructions, see GitHub’s guide on [configuring a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Data Sources

### Google Sheets API

The models and datasets data is sourced from our Google Sheets database:
- **Google Sheets URL**: https://docs.google.com/spreadsheets/d/11C2F2CINJAHbrTn19I2z_h4xuf-d_QFnejxmiIU_LAc/edit?gid=0#gid=0

This spreadsheet contains the source data for:
- AI Models metadata (parameters, metrics, versions, etc.)
- Datasets information (size, tasks, languages, etc.)

The application fetches this data via Google Sheets API and caches it for performance.
