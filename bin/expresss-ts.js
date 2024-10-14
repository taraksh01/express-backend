#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please specify the project name");
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

// Create project directory
fs.mkdirSync(projectDir, { recursive: true });

// Create src directory and its subdirectories
const srcDirs = ["controllers", "routes", "models", "db", "types", "utils"];

fs.mkdirSync(path.join(projectDir, "src"));
srcDirs.forEach((dir) => fs.mkdirSync(path.join(projectDir, "src", dir)));

// Create files
const files = [
  {
    path: "src/controllers/example.controllers.ts",
    content: `import { Request, Response } from "express";\nimport { ExampleItem } from "../types/example.types";\nimport { capitalizeString, generateRandomId } from "../utils/example.utils";\nimport ApiError from "../utils/ApiError";\nimport ApiResponse from "../utils/ApiResponse";\nimport AsyncHandler from "../utils/AsyncHandler";\n\nexport const getExample = AsyncHandler(async (req: Request, res: Response) => {\n  try {\n    const exampleItem: ExampleItem = {\n      id: generateRandomId(),\n      name: capitalizeString("example"),\n      description: "This is an example item",\n    };\n\n    res.status(200).json(new ApiResponse(200, exampleItem));\n  } catch (error) {\n    throw new ApiError(500, "Failed to get example item");\n  }\n});\n\nexport const postExample = AsyncHandler(async (req: Request, res: Response) => {\n  try {\n    const { name, description } = req.body;\n    const newExampleItem: ExampleItem = {\n      id: generateRandomId(),\n      name, description\n    };\n\n    res.status(201).json(new ApiResponse(201, newExampleItem));\n  } catch (error) {\n    throw new ApiError(500, "Failed to create example item");\n  }\n});`,
  },
  {
    path: "src/routes/example.routes.ts",
    content: `import { Router } from "express";\nimport { getExample, postExample } from "../controllers/example.controllers";\n\nconst router = Router();\n\nrouter.get("/", getExample);\nrouter.post("/", postExample);\n\nexport default router;`,
  },
  {
    path: "src/controllers/health.controllers.ts",
    content: `import { Request, Response } from "express";\nimport ApiError from "../utils/ApiError";\nimport ApiResponse from "../utils/ApiResponse";\nimport AsyncHandler from "../utils/AsyncHandler";\n\nexport const getHealth = AsyncHandler(async (req: Request, res: Response) => {\n  try {\n    res.status(200).json(new ApiResponse(200, { status: "OK" }, "Server is healthy"));\n  } catch (error) {\n    throw new ApiError(500, "Failed to get health status");\n  }\n});`,
  },
  {
    path: "src/routes/health.routes.ts",
    content: `import { Router } from "express";\nimport { getHealth } from "../controllers/health.controllers";\n\nconst router = Router();\n\nrouter.get("/", getHealth);\n\nexport default router;`,
  },
  {
    path: "src/models/example.model.ts",
    content: `// This is an example model`,
  },
  {
    path: "src/types/example.types.ts",
    content: `export interface ExampleType {\n  id: string;\n  name: string;\n  description: string;\n}`,
  },
  {
    path: "src/utils/example.utils.ts",
    content: `export const capitalizeString = (str:string) => {\n  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();\n}\n\nexport const generateRandomId = () => {\n  return Math.random().toString(36).substring(2, 9);\n}\n;`,
  },
  {
    path: "src/db/connection.ts",
    content: `// Write your database connection here`,
  },
  {
    path: "src/utils/ApiError.ts",
    content: `class ApiError extends Error {\n  statusCode: number;\n  data: null | any;\n  message: string;\n  success: boolean;\n  errors: any[];\n\n  constructor(statusCode: number, message = "Something went wrong", errors: any[] = [], stack = "") {\n    super(message);\n    this.statusCode = statusCode;\n    this.data = null;\n    this.message = message;\n    this.success = false;\n    this.errors = errors;\n\n    if (stack) {\n      this.stack = stack;\n    } else {\n      Error.captureStackTrace(this, this.constucor);\n    }\n  }\n}\n\nexport default ApiError;`,
  },
  {
    path: "src/utils/ApiResponse.ts",
    content: `class ApiResponse {\n  statusCode: number;\n  data: any;\n  message: string;\n  success: boolean;\n\n  constructor(statusCode: number, data: any, message = "This is a success response") {\n    this.statusCode = statusCode;\n    this.data = data;\n    this.message = message;\n    this.success = statusCode < 400;\n  }\n}\n\nexport default ApiResponse;`,
  },
  {
    path: "src/utils/AsyncHandler.ts",
    content: `import { Request, Response, NextFunction } from "express";\n\ntype AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;\n\nconst AsyncHandler = (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {\n  Promise.resolve(execution(req, res, next)).catch((error) => {\n    next(error);\n  });\n};\n\nexport default AsyncHandler;\n`,
  },
  {
    path: "src/index.ts",
    content: `import express from "express";\nimport dotenv from "dotenv";\nimport healthRoutes from "./routes/health.routes";\nimport exampleRoutes from "./routes/example.routes";\n\ndotenv.config();\n\nconst app = express();\nconst port = process.env.PORT || 5555;\n\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\n\n// API routes\napp.use("/api/health", healthRoutes);\napp.use("/api/example", exampleRoutes);\n\napp.listen(port, () => {\n  console.log(\`Server is running on port \${port}\`);\n});`,
  },
  { path: ".env", content: `PORT=5555` },
  {
    path: ".gitignore",
    content: `# Dependency directories\nnode_modules/\n\n# Build output\ndist/\n\n# Environment variables\n.env\n\n# Logs\n*.log\n\n# OS generated files\n.DS_Store\nThumbs.db\n\n# Editor directories and files\n.vscode/\n.idea/\n*.swp\n*.swo\n\n# TypeScript cache\n*.tsbuildinfo\n\n# npm debug logs\nnpm-debug.log*\n\n# yarn debug logs\nyarn-debug.log*\nyarn-error.log*\n\n# pnpm debug logs\npnpm-debug.log*`,
  },
  {
    path: "package.json",
    content: `{\n  "name": "${
      projectName === "." ? path.basename(currentDir) : projectName
    }",\n  "version": "1.0.0",\n  "description": "Express TypeScript Starter",\n  "main": "dist/index.js",\n  "scripts": {\n    "start": "node dist/index.js",\n    "build": "tsc",\n    "dev": "nodemon --exec ts-node src/index.ts",\n    "lint": "eslint . --ext .ts"\n  },\n  "keywords": ["${
      projectName === "." ? path.basename(currentDir) : projectName
    }"],\n  "author": "",\n  "dependencies": {\n    "dotenv": "^16.4.5",\n    "express": "^4.21.1"\n  },\n  "devDependencies": {\n    "@types/express": "^5.0.0",\n    "@types/node": "^22.7.5",\n    "@typescript-eslint/eslint-plugin": "^8.8.1",\n    "@typescript-eslint/parser": "^8.8.1",\n    "eslint": "^9.12.0",\n    "nodemon": "^3.1.7",\n    "ts-node": "^10.9.2",\n    "typescript": "^5.6.3"\n  }\n}`,
  },
  {
    path: ".eslintrc.json",
    content: `{\n  "parser": "@typescript-eslint/parser",\n  "extends": ["plugin:@typescript-eslint/recommended"],\n  "parserOptions": {\n    "ecmaVersion": 2018,\n    "sourceType": "module"\n  },\n  "rules": {}\n}`,
  },
  {
    path: "README.md",
    content: `# Express TypeScript Starter\n\nThis is a starter project for building a backend application with Express and TypeScript.\n\n## Features\n\n- Express server setup\n- TypeScript configuration\n- Nodemon for development\n- Health check route\n- ESLint for linting\n- Proper project structure\n\n## Getting Started\n\n**Note**: This project uses \`pnpm\` as the default package manager. If you prefer using other package managers, you can replace \`pnpm\` with your preferred package manager in the scripts.\n\n1. Clone this repository\n2. Run \`pnpm install\` to install dependencies\n3. Create a \`.env\` file in the root directory and add your environment variables (see \`.env.example\`)\n4. Run \`pnpm dev\` to start the development server\n5. Visit \`http://localhost:5555/api/health\` to check if the server is running\n\n## Scripts\n\n- \`pnpm dev\`: Start the development server with Nodemon\n- \`pnpm build\`: Build the TypeScript code\n- \`pnpm start\`: Start the production server\n- \`pnpm lint\`: Run ESLint\n\n## Project Structure\n\n\`\`\`\nsrc/\n├── controllers/\n│   ├── health.controller.ts\n│   └── example.controller.ts\n├── routes/\n│   ├── index.ts\n│   ├── health.route.ts\n│   └── example.route.ts\n├── services/\n│   ├── health.service.ts\n│   └── example.service.ts\n├── types/\n│   ├── health.type.ts\n│   └── example.type.ts\n├── utils/\n│   ├── health.util.ts\n│   └── example.util.ts\n└── index.ts\n\`\`\`\n\n## License\n\nThis project is licensed under the MIT License. See the \`LICENSE\` file for more details. Feel free to use this project or fork it on GitHub.`,
  },
  {
    path: "tsconfig.json",
    content: `{\n  "compilerOptions": {\n    "target": "es6",\n    "module": "commonjs",\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "**/*.spec.ts"]\n   }`,
  },
];

files.forEach((file) => {
  fs.writeFileSync(path.join(projectDir, file.path), file.content);
});

// Initialize npm and install dependencies
process.chdir(projectDir);
execSync("npm install", { stdio: "inherit" });

console.log("Project created successfully!");
console.log(`To get started, run the following commands:`);
console.log(`cd ${projectName}`);
console.log("npm run dev");
