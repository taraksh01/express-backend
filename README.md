# Express TypeScript Starter

This is a starter project for building a backend application with Express and TypeScript.

## Features

- Express server setup
- TypeScript configuration
- Nodemon for development
- Health check route
- ESLint for linting
- Proper project structure

## Installation

<details>
  <summary>Using `pnpm`</summary>

To install the package globally, run:

```bash
pnpm install -g expresss-ts@latest
```

To run the package without installing, use:

```bash
pnpm dlx expresss-ts@latest <project-name>
```

</details>

<details>
  <summary>Using `npm`</summary>

To install the package globally, run:

```bash
npm install -g expresss-ts@latest
```

To run the package without installing, use:

```bash
npx expresss-ts@latest <project-name>
```

</details>

## Getting Started

**Note**: This project uses `pnpm` as the default package manager. If you prefer using other package managers, you can replace `pnpm` with your preferred package manager in the scripts.

1. Clone this repository
2. Run `pnpm install` to install dependencies
3. Create a `.env` file in the root directory and add your environment variables (see `.env.example`)
4. Run `pnpm dev` to start the development server
5. Visit `http://localhost:5555/api/health` to check if the server is running

## Scripts

- `pnpm dev`: Start the development server with Nodemon
- `pnpm build`: Build the TypeScript code
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint

## Project Structure

```
src/
├── controllers/
│   ├── health.controllers.ts
│   └── example.controllers.ts
├── db/
│   └── connection.ts
├── models/
│   └── example.model.ts
├── routes/
│   ├── health.routes.ts
│   └── example.routes.ts
├── types/
│   └── example.types.ts
├── utils/
│   ├── ApiError.ts
│   ├── ApiResponse.ts
│   ├── AsyncHandler.ts
│   └── example.utils.ts
└── index.ts
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details. Feel free to use this project or fork it on GitHub.

```

```
