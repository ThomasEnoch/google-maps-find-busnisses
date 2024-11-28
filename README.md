# Business Lead Generator

A Next.js application that helps you find businesses in any city. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔍 Search for businesses by city and type
- 📊 View results in a clean, organized table
- 📥 Export results to Excel
- 🎨 Modern UI with shadcn/ui components
- ✨ Real-time form validation
- 🌐 Powered by Google Places API

## Prerequisites

- Node.js 16.8 or later
- A Google Places API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Google Places API key:
   ```
   GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter a city name (e.g., "San Francisco")
2. Enter a business type (e.g., "restaurants", "hotels")
3. Click "Search" to find businesses
4. Use the "Export to Excel" button to download results

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [react-hook-form](https://react-hook-form.com/) - Form handling
- [zod](https://zod.dev/) - Schema validation
- [XLSX](https://www.npmjs.com/package/xlsx) - Excel export

## API Usage

The application uses the following Google Places API endpoints:
- Places Text Search API - Find businesses
- Place Details API - Get additional business information

Make sure your API key has access to these services enabled in the Google Cloud Console.
