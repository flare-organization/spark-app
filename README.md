# Team Flare — Package Manager

## Setup project 🛠️ <!-- not ai emoji -->

Before setting up the project, make sure you have the following installed:

- **Docker**
- **Maven**
- **Node.js**
- **Java JDK 17+**

### Generate OpenApi code

Run the following command in the root of the project:

```bash
mvn generate-sources
```
This will:

- Generate Java DTOs + API models for the backend
- Generate TypeScript interfaces for the frontend

### Backend (Java)

1. Go to: `backend/target/generated-sources/`
2. Locate the `java` folder.
3. Right-click the folder and select: **Mark Directory as → Generated Sources Root**

### Frontend (TypeScript)

1. Go to: `frontend/target/generated-sources/openapi`
2. Right-click the `openapi` folder.
3. Select: **Mark Directory as → Generated Sources Root**