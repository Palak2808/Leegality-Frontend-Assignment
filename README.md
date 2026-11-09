# Product Listing Page

A responsive product listing application built using React, TypeScript, and Tailwind CSS. The application allows users to browse products, search by keywords, filter by category, brand and price range, and navigate through paginated product results.

## Live Demo


(https://palak-product-listing.netlify.app)

## GitHub Repository

(https://github.com/Palak2808/Leegality-Frontend-Assignment)

## Tech Stack

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

## Features

- Fetch and display products from an external API.
- Search products by title, category, and brand.
- Filter products by category.
- Filter products by multiple brands.
- Apply minimum and maximum price filters.
- Combine multiple filters simultaneously.
- URL-based filter and search state using query parameters.
- Pagination with 8 products per page.
- Dynamic pagination displaying a maximum of 5 page numbers at a time.
- Loading and error states with retry functionality.
- Clear all applied filters.
- Responsive layout for different screen sizes.

## Setup Instructions

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_LINK
   ```

2. Navigate to the project directory:

   ```bash
   cd product-listing
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL provided by Vite in your browser.

### Production Build

To create an optimized production build, run:

```bash
npm run build
```

## Assumptions Made

- Product and category data are retrieved from an external API.
- Product filtering and pagination are handled on the client side after fetching the product data.
- A product can belong to one category and may have an associated brand.
- Multiple brands can be selected simultaneously.
- Minimum and maximum price filters can be applied independently or together.
- Search matches product titles, categories, and brands.
- Changing any filter resets pagination to the first page.
- Search and filter selections are maintained in URL query parameters so the current listing state can be shared or revisited.
- Products are displayed in groups of 8 per page.
- Pagination displays a maximum of 5 page numbers at a time.

## Architectural Decisions

**1. Component-Based Architecture**

The application is divided into reusable components to keep responsibilities separate and make the code easier to maintain.

- `ProductListing`: Main page component responsible for fetching data, managing filters, and displaying products.
- `FiltersSidebar`: Handles category, brand, and price filters.
- `ProductCard`: Displays individual product information.
- `Pagination`: Handles page navigation.
- `LoadingState`: Displays the loading UI.
- `ErrorState`: Handles API errors and retry functionality.

**2. Separation of API Logic**

API calls are maintained in a separate service layer rather than being directly written inside UI components. This keeps data-fetching logic separate from presentation logic.

**3. URL-Based State Management**

React Router's `useSearchParams` is used to maintain search, category, brand, price, and pagination state in the URL. This makes filtered results easier to share and revisit.

**4. React Hooks and Performance**

- `useState` manages products, categories, loading, and error states.
- `useEffect` handles initial data fetching.
- `useMemo` prevents unnecessary recalculation of brands, filtered products, and visible products.
- `Promise.all` fetches product and category data concurrently.

**5. Responsive UI**

Tailwind CSS is used to build a responsive layout that adapts to different screen sizes, providing a consistent browsing experience across desktop, tablet, and mobile devices.

## Improvements If Given More Time

- Add unit and integration tests using Vitest and React Testing Library.
- Implement debounced search to avoid unnecessary filtering on every keystroke.
- Introduce server-side filtering and pagination for better performance with larger datasets.
- Add sorting options such as price (low to high), price (high to low), and newest arrivals.
- Improve accessibility with keyboard navigation, semantic markup, and appropriate ARIA attributes.
- Add product detail pages with individual product information.
- Introduce API caching and request cancellation to improve data-fetching efficiency.
- Add more comprehensive validation and edge-case handling for filters.

---

**Author:** Palak Jindal