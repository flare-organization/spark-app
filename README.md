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

When you now visit http://localhost:5173/ in you browser, you should see the project running.

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