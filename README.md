# RadiusStore - E-Commerce Inventory & Stock Management Dashboard

RadiusStore is a React-based single-page application designed for managing inventory and stock operations. It combines modern functional component paradigms and React Hooks alongside traditional class component lifecycles for audit logging.

## Project Directory Structure

```plaintext
src/
├── components/
│   ├── class/
│   │   └── AuditLogger.jsx
│   └── functional/
│       ├── CardWrapper.jsx
│       ├── Header.jsx
│       ├── InventoryMetrics.jsx
│       ├── ProductCard.jsx
│       ├── ProductForm.jsx
│       ├── ProductList.jsx
│       └── ThemeToggle.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Features & Implementation

- **Component-Based Architecture**: Reusable functional components (`Header`, `InventoryMetrics`, `ProductForm`, `ProductList`, `ProductCard`, `ThemeToggle`) and class component (`AuditLogger`).
- **CardWrapper Container**: Built using `props.children` to provide consistent styling across dashboard cards and metrics.
- **Class Component & Lifecycle**: `AuditLogger` tracks product additions, stock changes, and deletions:
  - `componentDidMount()`: Loads previous logs from `localStorage` and registers event listeners.
  - `componentDidUpdate()`: Persists changes to `localStorage` and triggers transient toast notifications.
  - `componentWillUnmount()`: Cleans up timers and event listeners.
- **React Hooks**:
  - `useState`: Manages products, filters, search terms, and form fields.
  - `useEffect`: Syncs inventory with `localStorage` and updates `document.title` dynamically.
  - `useContext`: Provides global theme state (`light`/`dark`) through `ThemeContext`.
  - `useRef`: Auto-focuses the product name input on initial mount and after form submissions.
  - `useMemo` & `useCallback`: Optimizes filtering, stock metric calculations, and memoizes event handler references.
- **Stock Badges & Conditional Rendering**: Stock states display dynamic status badges (`In Stock`, `Low Stock`, `Out of Stock`) and empty states when no items match filters.

## Setup and Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Task 6: Theoretical Analysis — Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

Client-Side Rendering (CSR) and Server-Side Rendering (SSR) represent two distinct rendering paradigms with significant architectural trade-offs. In a CSR architecture (such as this Vite + React SPA), the server delivers a minimal, empty HTML document containing a JavaScript bundle link. The client's browser downloads, parses, and executes this JavaScript bundle, dynamically constructing the DOM, mounting components, and initiating client-side API requests to populate data. In contrast, SSR (as implemented in frameworks like Next.js) executes the React component tree on the web server upon each request, generating fully rendered HTML markup populated with initial data before streaming it to the browser. Once loaded, client-side hydration attaches event handlers, making the view interactive.

For an enterprise-grade e-commerce application like an inventory dashboard, these differences create distinct operational trade-offs. CSR offers lower hosting costs and minimal server overhead because static assets can be distributed globally across CDNs without dedicated Node.js runtime servers. Once the initial bundle downloads, subsequent view transitions and data filtering occur instantly on the client without full-page reloads, providing a responsive desktop-like user experience. However, CSR suffers from a slower Initial Page Load and longer Time to Interactive (TTI), particularly on low-powered mobile devices or congested networks. Furthermore, basic CSR provides poor Search Engine Optimization (SEO) because web crawlers may fail to parse JavaScript-rendered content before indexing. SSR excels in First Contentful Paint (FCP) and SEO indexing, ensuring product listings are immediately visible to search bots and users alike. Nevertheless, SSR introduces higher hosting complexity, increased server resource utilization, elevated TTFB (Time to First Byte) under heavy load, and demands infrastructure capable of running continuous server-side runtimes.
