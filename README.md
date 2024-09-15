# Schedulr

Schedulr is a scheduling platform built with **Next.js**, **MongoDB**, and **TypeScript** that streamlines the management of bookings and appointments. It integrates with **Google Calendar** through the **Nylas API**, enabling users to manage availability dynamically and create events in real time.

## Features

- Manage bookings and appointments effortlessly.
- Seamless integration with Google Calendar for real-time availability.
- Event creation and management using the Nylas API.
- Built with Next.js for server-side rendering and optimized performance.
- MongoDB as the database solution for storing scheduling data.

## Technologies

- **Next.js**: Server-side rendering, routing, and frontend logic.
- **TypeScript**: Type safety for both the backend and frontend.
- **MongoDB**: NoSQL database for storing user and scheduling data.
- **Nylas API**: Integration with Google Calendar for managing events and availability.
- **Nodemailer** (optional): For sending reminder emails for appointments.

## Installation

To set up this project locally, follow the steps below:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- Nylas API account (for Google Calendar integration)
- Environment variables for MongoDB, Nylas API, and other services

### Clone the Repository

```bash
git clone https://github.com/yourusername/schedulr.git
cd schedulr
```
Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

Set up Environment Variables

Create a .env.local file at the root of the project and add the following environment variables:

```bash
MONGODB_URI=mongodb+srv://<your-mongodb-uri>
NYLAS_CLIENT_ID=<your-nylas-client-id>
NYLAS_CLIENT_SECRET=<your-nylas-client-secret>
NYLAS_ACCESS_TOKEN=<your-nylas-access-token>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```


Run the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
```
