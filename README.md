# Team Flare — Package Manager

## Setup project 🛠️ <!-- not ai emoji -->

Before setting up the project, make sure you have the following installed:

- **Docker**
- **Maven**
- **Node.js**
- **Java JDK 21**

## Getting the app running 🚀

From the project root, run:

```bash
npm run update-code
```
This will:
- Install all the dependencies
- Generate Java DTOs + API models for the backend
- Generate TypeScript interfaces/DTO's for the frontend

### Run te app

Normally you would use run profiles to run the app, but for now let's just use the CLI to start the application

In the **root** folder, run the following command to start the Postgres container:
```bash
docker compose up -d
```

Navigate to the **backend** folder and run:
```bash
mvn spring-boot:run "-Dspring-boot.run.profiles=demo"
```

Open another terminal, navigate to the frontend folder, and run the following command:
```bash
npm run dev
```

**Frontend application:**
http://localhost:5173/
When you visit this URL in your browser, you should see the application running.

**API documentation (Swagger UI):**
http://localhost:8080/swagger-ui/index.html
Here you can explore all available backend API endpoints, including request/response models and try them out directly from the browser.
### Making it ready for developing in IntelliJ 💻

To let IntelliJ recognize all generated code, we need to mark the directories as **Generated Sources Root**.

#### Let's start with the backend (Java)

1. Go to: `backend/target/generated-sources/`
2. Locate the `java` folder.
3. Right-click the folder and select: **Mark Directory as → Generated Sources Root**

#### Moving on to the frontend (TypeScript)

1. Go to: `frontend/target/generated-sources/openapi`
2. Right-click the `openapi` folder.
3. Select: **Mark Directory as → Generated Sources Root**