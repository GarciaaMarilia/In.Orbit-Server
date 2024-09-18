# In.Orbit

A simple Node.js application for tracking personal goals, built using Fastify, Drizzle ORM, PostgreSQL, Zod for validation, and TypeScript for type safety.

## Features

- **Fastify**: Lightweight and fast web framework for Node.js.
- **Drizzle ORM**: Database ORM for interacting with PostgreSQL.
- **PostgreSQL**: Relational database for storing goals and related data.
- **Zod**: Schema-based validation for request and response objects.
- **TypeScript**: Strongly-typed JavaScript for better developer experience.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 16)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional, for easier PostgreSQL setup)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GarciaaMarilia/In.Orbit
cd In.Orbit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file in the root of the project with the following content:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/inorbit
PORT=3000
```

### 4. Set up the database

If you are using Docker, you can spin up a PostgreSQL instance with the following command:

```bash
docker run --name inorbit -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=inorbit -p 5432:5432 -d postgres
```

Then, run the database migrations using Drizzle ORM:

```bash
npm run db:migrate
```

### 5. Running the application

Start the development server:

```bash
npm run dev
```

### 6. API Endpoints

Here are some example endpoints available in the application:

- **POST** /goals: Create a new goal (validated using Zod).
- **GET** /pending-goals: Fetch all personal pending goals.
- **GET** /summary Get week summary.
- **POST** /completions Create a completition.

## Project Structure


📂 personal-goals-tracker
├── 📂 .migrations           # Database migration files
├── 📂 node_modules          # Installed Node.js packages
├── 📂 src                   # Main source code folder
│   ├── 📂 db                # Database-related files
│   │   ├── index.ts         # Drizzle ORM configuration and initialization
│   │   ├── schema.ts        # Database schema definitions
│   │   └── seed.ts          # Script for seeding initial data into the database
│   ├── 📂 functions         # Business logic and core functionalities
│   │   ├── create-goal-completion.ts  # Logic to mark a goal as complete
│   │   ├── create-goal.ts            # Logic for creating new goals
│   │   ├── get-week-pending-goals.ts # Logic to retrieve pending goals for the week
│   │   └── get-week-summary.ts       # Logic to generate weekly goal summary
│   ├── 📂 http              # HTTP server-related files
│   │   └── server.ts        # Fastify server setup and initialization
│   ├── 📂 routes            # Route definitions and handlers
│   │   ├── create-completion.ts   # Route for marking a goal as complete
│   │   ├── create-goal.ts         # Route for creating new goals
│   │   ├── get-pending-goals.ts   # Route for fetching pending goals of the week
│   │   └── get-week-summary.ts    # Route for getting the weekly summary of goals
│   └── env.ts              # Environment-related configuration
├── .env                    # Environment variables for the project
├── biome.json               # Biome configuration (optional linter or formatter settings)
├── docker-compose.yml       # Docker Compose file for setting up the application with Postgres
├── drizzle.config.ts        # Drizzle ORM configuration file
├── package-lock.json        # Package lock file for Node.js dependencies
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript configuration file
