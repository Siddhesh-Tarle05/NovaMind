# NovaMind

NovaMind is an AI-powered personal learning platform. It combines a React web application with an Express API and a separate FastAPI learning-agent service.

## Project Structure

```text
NovaMind/
├── frontend/                       # React + Vite web application
├── backend/                        # Express API, authentication, tutor, and dashboard routes
└── personal-learning-agent-backend/ # FastAPI + LangGraph planning and progress agent
```

## Requirements

- Node.js 18 or newer
- Python 3.10 or newer
- MongoDB for the Express backend
- A Groq API key for live AI responses

## Run Locally

Start each service in its own terminal.

### 1. Express backend

```powershell
cd backend
npm install
node server.js
```

The API runs at `http://localhost:3000` and exposes a health check at `http://localhost:3000/api/health`.

Create `backend/.env` with the required MongoDB, JWT, server, frontend URL, and Groq settings. Never commit real credentials or API keys.

### 2. React frontend

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in a browser. Use `npm run build` to create a production build and `npm run lint` to check the frontend.

### 3. Personal learning agent

```powershell
cd personal-learning-agent-backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The agent API runs at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/docs`, and the health check is available at `http://localhost:8000/health`.

The agent can run with a mock LLM during development. Configure its `.env` file to enable a real Groq model, MongoDB state storage, or other optional integrations.

## Main API Areas

### Express backend

- `/auth` - registration and authentication
- `/api/doubt` - doubt solving
- `/api/tutor` - AI tutor conversations
- `/api/dashboard` - learner dashboard data
- `/api/health` - service health

### Personal learning agent

- `/api/workflow` - create and update learning plans
- `/api/tasks` - daily and weekly study tasks
- `/api/quizzes` - quiz schedules and submissions
- `/api/chat` - state-aware tutor chat
- `/api/state` - learner state
- `/api/mcp` - MCP tool discovery and calls

## Testing

Run the learning-agent tests with:

```powershell
cd personal-learning-agent-backend
pytest -q
```

## Security

Keep `.env` files local and excluded from Git. If a credential has ever been committed or shared, revoke and rotate it before deploying. Use separate development and production credentials.
