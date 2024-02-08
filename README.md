# Smart App

## Overview

The Smart App is a desktop-compatible web application developed using Next.js, deployed on Vercel, with MongoDB as the database. It serves as a centralized platform for managing thousands of client data and documents in one place, providing users with efficient organization and easy access to essential information.

## Key Features

- **Centralized Data Management**: Consolidate and organize thousands of client data and documents in a single, centralized platform, eliminating the need for multiple disparate systems.

- **User Authentication and Authorization**: Secure user authentication and role-based access control (RBAC) ensure that only authorized users can access and manage sensitive client data.

- **Customizable Client Profiles**: Create and customize client profiles with detailed information such as contact details, preferences, interactions, and document attachments.

- **Document Management**: Upload, store, and manage various types of documents associated with clients, including contracts, agreements, invoices, and more.

- **Search and Filter Functionality**: Efficiently search for specific clients or documents using advanced search and filter options based on various criteria, such as client name, document type, date, etc.

- **Dashboard Feature: Due Date Overview**: The Dashboard Feature in the Smart App provides users with an overview of due dates for 6 distinct fields in 6 different time frames, ensuring efficient task management and prioritization. It categorizes data into fields such as OD DueDate, TP DueDate, Emission DueDate, Tax DueDate, Fitness DueDate, and Permit DueDate, presenting them in time frames ranging from Today to Beyond. Through visual representation and an interactive interface, users can easily prioritize tasks, plan their schedules, and improve productivity.

- **Integration with Third-Party Tools**: Seamlessly integrate with third-party tools and services for enhanced functionality, such as email clients, calendar applications, or CRM systems.

- **Data Insights and Reporting**: Generate reports and gain valuable insights into client data trends, interactions, and performance metrics to make informed business decisions.

- **Desktop Compatibility**: Optimized for desktop use, providing a responsive and user-friendly experience across desktop devices.

## Production App

Check out the production app at [Smart Leads](https://www.smartleads.co.in) to experience firsthand how it centralizes the management of client data and documents in one place.

## Technology Stack

- **Frontend**: Next.js Framework for server-side rendering and a responsive user interface.
- **Backend**: Since Next.js is a full-stack application development framework, server-side logic, GraphQL API endpoint and MongoDB Integration for storing and managing issue data is also implemented with Next.js
- **Deployment**: The application is deployed in Vercel and DB is deployed on the MongoDB Cloud for scalability, reliability, and seamless integration with other GCP services.

## Next.js Full Stack Framework Features

**Frontend Features:**

- **Server-side Rendering (SSR):** Render React components on the server side for faster page load times and improved SEO.
- **Static Site Generation (SSG):** Pre-render pages at build time for faster loading and better performance.
- **Client-side Routing:** Built-in routing system for client-side navigation without page reloads.
- **Automatic Code Splitting:** Split code into smaller bundles for improved performance.
- **CSS and Image Support:** Import CSS files and optimize images with built-in support.
- **API Routes:** Create API endpoints within the application for server-side logic.

**Backend Features:**

- **API Routes:** Easily create API endpoints in the `pages/api` directory for server-side logic.
- **Server-side Logic:** Run server-side logic within API routes or during server-side rendering.
- **Middleware Support:** Add custom logic or modify incoming requests with middleware functions.
- **Authentication:** Integrate authentication libraries or services for user authentication.
- **Database Integration:** Interact with databases such as MongoDB, PostgreSQL, or MySQL using libraries like `mongoose`, `pg`, or `mysql`.

  
## Installation

1. Clone this repository: `git clone https://github.com/ThanushKrishna/smart.git`
2. Navigate to the project directory: `cd smart`
3. Install dependencies: `npm install`

## Usage

Instructions on how to use your project or any specific commands that users need to run.

To start the project in development: **npm run dev**
<br/>
To start the project in Production: **npm run build**


## Contributing

I welcome contributions from the community! If you'd like to contribute, please follow these steps:
1. Fork this repository
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to your forked repository: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).
