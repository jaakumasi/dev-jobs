# Dev Jobs

A Next.js web application for searching and browsing developer job listings.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contact Information](#contact-information)

## Project Description

Dev Jobs is a Next.js web application designed to simplify the process of searching and browsing developer job listings. It provides a user-friendly interface where users can easily find relevant job opportunities and apply directly through the platform. The application leverages Next.js for server-side rendering and smooth client-side navigation.

## Features

- Search and browse developer job listings
- Apply to job listings directly through the platform
- Filter jobs by title, company, location, and full-time availability
- Toggle between preferred themes

## Demo

A live demo of the Dev Jobs web application is available at [Demo Link](https://dev-jobs.vercel.app).

## Installation

To run the Dev Jobs application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/jaakumasi/dev-jobs.git
```

2. Install the required dependencies:

```bash
cd dev-jobs
npm install
```

3. Start the development server:

```bash
npm run dev
```

The Dev Jobs application will be accessible at `http://localhost:3000`.

## Folder Structure

The project follows the standard Next.js folder structure. Here's an overview of the main directories:

- `/app`: Contains the Next.js pages for different routes, as well as the api folder.
- `/app/components`: Includes reusable components used throughout the application.
- `/app/api`: Contains the api.
- `/public`: Includes static assets such as images and fonts.

For a more detailed understanding of the folder and file structure, please refer to the Next.js documentation.

## API Documentation

The Dev Jobs application utilizes the following API endpoint:

**POST /api/jobs/**

This endpoint is used to retrieve job listings based on search criteria. The request should include the following data:

- `title|company`: The job title or company recruiting.
- `location`: The desired job location.
- `fullTimeOnly`: Boolean value indicating whether only full-time positions should be included.

## Deployment

The Dev Jobs application can be deployed to various hosting platforms such as Vercel, Heroku, or Netlify. Please follow the platform-specific deployment instructions provided by the hosting provider of your choice.

## Contact Information

For any inquiries or feedback regarding the Dev Jobs application, please reach out:

- Email: [jeromeakumasi01@gmail.com](mailto:jeromeakumasi01@gmail.com)
- GitHub: [jaakumasi](https://github.com/jaakumasi)

---
