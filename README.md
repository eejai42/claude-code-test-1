# 🌿 Landscaping Projects Tracker

A complete system for tracking and managing your landscaping projects with a rulebook, PostgreSQL database, and React web app.

## 📋 Components

### 1. **Rulebook** (`RULEBOOK.md`)
A comprehensive guide covering:
- Project status lifecycle (Planned → In Progress → Completed)
- Project categories and priorities
- Seasonal planning considerations
- Budget and time tracking
- Success criteria and maintenance schedules

### 2. **Database** (`db/`)
- **schema.sql**: PostgreSQL schema with projects table
- **init.js**: Database initialization script with sample data

### 3. **API** (`api/`)
- RESTful Express API with endpoints for:
  - Create, read, update, delete projects
  - Filter by status, category, location, priority, season
  - Get overall statistics and dashboards

### 4. **React App** (`app/`)
Beautiful, responsive UI for managing projects with:
- Project cards organized by status
- Add/edit/delete projects
- Advanced filtering
- Real-time statistics dashboard
- Cost and time tracking with variance analysis

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL (running locally or remote)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Edit `.env` with your database credentials:
   ```
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=landscaping
   ```

3. **Initialize the database**
   ```bash
   npm run db:init
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```
   This starts both the API (port 3001) and React app (port 3000) concurrently.

   Or run them separately:
   ```bash
   npm run api          # Terminal 1: API on http://localhost:3001
   npm run start:app    # Terminal 2: App on http://localhost:3000
   ```

## 📊 Features

### Project Management
- **Status Tracking**: Planned → In Progress → Completed → On Hold → Cancelled
- **Priority Levels**: 1-5 scale (Critical to Low)
- **Categories**: Planting, Hardscape, Water Features, Lawn Care, Tree Work, Seasonal, Misc
- **Locations**: Front, Back, Side, Overall

### Planning & Budgeting
- Estimated vs. actual costs with variance tracking
- Estimated vs. actual hours with variance tracking
- Seasonal planning support
- Date tracking (start/completion)

### Analytics
- Project count by status
- Total budgeted vs. actual spending
- Real-time statistics dashboard
- Filter and search capabilities

## 📝 API Endpoints

### Projects
- `GET /api/projects` - List all projects (with filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Statistics
- `GET /api/stats` - Get overall statistics

### Query Parameters
- `status` - Filter by status
- `category` - Filter by category
- `location` - Filter by location
- `priority` - Filter by priority level
- `season` - Filter by season

Example: `GET /api/projects?status=In%20Progress&priority=4`

## 🎨 UI Features

### Project Cards
- Priority badges with color coding
- Category emojis for quick identification
- Cost and time tracking with variance percentages
- Estimated vs. actual comparisons
- Edit and delete buttons
- Notes section for documentation

### Filters
- Status quick-filters (toggle buttons)
- Category dropdown
- Location dropdown
- Priority dropdown
- Season dropdown
- Clear all filters button

### Statistics Panel
- Total projects counter
- Projects by status breakdown
- Total spent vs. budgeted
- Real-time updates

## 📱 Project Data Structure

```json
{
  "id": 1,
  "name": "Front Yard Flower Bed",
  "category": "Planting",
  "description": "Plant seasonal flowers",
  "location": "Front",
  "priority": 3,
  "season": "Spring",
  "estimated_cost": 150.00,
  "actual_cost": 142.50,
  "estimated_hours": 8.0,
  "actual_hours": 7.5,
  "status": "Completed",
  "start_date": "2024-03-20",
  "completion_date": "2024-03-22",
  "notes": "Finished ahead of schedule!",
  "created_at": "2024-03-19T10:30:00Z",
  "updated_at": "2024-03-22T15:45:00Z"
}
```

## 🔧 Development

### Project Structure
```
├── RULEBOOK.md              # Guidelines and best practices
├── db/
│   ├── schema.sql          # Database schema
│   └── init.js             # Database initialization
├── api/
│   └── server.js           # Express API server
├── app/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── components/
│       │   ├── ProjectList.js
│       │   ├── ProjectCard.js
│       │   ├── ProjectForm.js
│       │   ├── FilterBar.js
│       │   └── StatsPanel.js
│       └── index.js
├── package.json
└── .env
```

### Scripts
- `npm run db:init` - Initialize database
- `npm run api` - Start API server only
- `npm run start:app` - Start React app only (with create-react-app)
- `npm run build:app` - Build production React app
- `npm run dev` - Start both API and app concurrently

## 🛠️ Customization

### Adding New Categories
Edit `RULEBOOK.md` and update:
1. Database constraint in `db/schema.sql`
2. Category list in `ProjectForm.js`

### Changing Colors
Modify the priority color mappings in `ProjectCard.js`

### Adjusting Filter Options
Edit the arrays in `FilterBar.js`

## 📚 Best Practices (from Rulebook)

1. **Fill in all required fields**: name, category, location
2. **Set realistic estimates**: for cost and hours
3. **Track actual values**: update as work progresses
4. **Document changes**: use notes for scope adjustments
5. **Review seasonally**: plan next season 3 months ahead
6. **Monitor variance**: if actual exceeds budget by >20%, document reason

## 🐛 Troubleshooting

### Database Connection Failed
- Verify PostgreSQL is running
- Check `.env` credentials
- Ensure database `landscaping` exists (created by init script)

### Port Already in Use
- API: Change `PORT` in `.env`
- App: Use `PORT=3333 npm start` for React app

### CORS Issues
- Verify `REACT_APP_API_URL` in `.env` matches API URL
- Check API CORS middleware in `api/server.js`

## 📄 License

ISC

## 🤝 Contributing

This is a personal project management tool. Modify as needed for your landscaping journey!
