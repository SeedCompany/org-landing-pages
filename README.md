# Org Landing Pages

Org Landing Pages is a dynamic and responsive web application for creating and managing landing pages for various campaigns. Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), this project integrates with Sanity CMS to fetch and render campaign data, including rich text content and images.

## Features

- **Dynamic Campaign Pages**: Automatically generate landing pages based on campaign data from Sanity CMS.
- **Reusable Templates**: Includes multiple templates (e.g., Marketing, Sustainers) for different campaign types.
- **Rich Text Rendering**: Supports Portable Text for rendering headings, paragraphs, and other rich text elements.
- **Responsive Design**: Fully responsive layouts using Tailwind CSS.
- **Sanity Integration**: Fetches data dynamically from Sanity CMS, including images and Portable Text content.

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Rich Text Rendering**: [@portabletext/to-html](https://github.com/portabletext/to-html)

## Installation

Clone the repository:
   ```bash
   git clone https://github.com/your-username/org-landing-pages.git
   cd org-landing-pages

Create a .env.local file - copy the environment variables from the .env file and replace the values with the proper values in the .env.local
