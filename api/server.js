const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Database connection pool
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'landscaping',
};

// Only add password if it's explicitly set
if (process.env.DB_PASSWORD) {
  dbConfig.password = process.env.DB_PASSWORD;
}

const pool = new Pool(dbConfig);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET all projects with optional filters
app.get('/api/projects', async (req, res) => {
  try {
    const { status, category, location, priority, season } = req.query;
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (status) {
      query += ` AND status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }
    if (location) {
      query += ` AND location = $${paramCount}`;
      params.push(location);
      paramCount++;
    }
    if (priority) {
      query += ` AND priority = $${paramCount}`;
      params.push(parseInt(priority));
      paramCount++;
    }
    if (season) {
      query += ` AND season = $${paramCount}`;
      params.push(season);
      paramCount++;
    }

    query += ' ORDER BY priority DESC, created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create new project
app.post('/api/projects', async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      location,
      priority = 3,
      season,
      estimated_cost,
      estimated_hours,
      status = 'Planned',
      start_date,
      notes,
    } = req.body;

    if (!name || !category || !location) {
      return res.status(400).json({ error: 'Missing required fields: name, category, location' });
    }

    const result = await pool.query(
      `INSERT INTO projects
       (name, category, description, location, priority, season, estimated_cost,
        estimated_hours, status, start_date, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [name, category, description, location, priority, season, estimated_cost, estimated_hours, status, start_date, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      location,
      priority,
      season,
      estimated_cost,
      actual_cost,
      estimated_hours,
      actual_hours,
      status,
      start_date,
      completion_date,
      notes,
    } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }
    if (category !== undefined) {
      updates.push(`category = $${paramCount}`);
      values.push(category);
      paramCount++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    if (location !== undefined) {
      updates.push(`location = $${paramCount}`);
      values.push(location);
      paramCount++;
    }
    if (priority !== undefined) {
      updates.push(`priority = $${paramCount}`);
      values.push(priority);
      paramCount++;
    }
    if (season !== undefined) {
      updates.push(`season = $${paramCount}`);
      values.push(season);
      paramCount++;
    }
    if (estimated_cost !== undefined) {
      updates.push(`estimated_cost = $${paramCount}`);
      values.push(estimated_cost);
      paramCount++;
    }
    if (actual_cost !== undefined) {
      updates.push(`actual_cost = $${paramCount}`);
      values.push(actual_cost);
      paramCount++;
    }
    if (estimated_hours !== undefined) {
      updates.push(`estimated_hours = $${paramCount}`);
      values.push(estimated_hours);
      paramCount++;
    }
    if (actual_hours !== undefined) {
      updates.push(`actual_hours = $${paramCount}`);
      values.push(actual_hours);
      paramCount++;
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }
    if (start_date !== undefined) {
      updates.push(`start_date = $${paramCount}`);
      values.push(start_date);
      paramCount++;
    }
    if (completion_date !== undefined) {
      updates.push(`completion_date = $${paramCount}`);
      values.push(completion_date);
      paramCount++;
    }
    if (notes !== undefined) {
      updates.push(`notes = $${paramCount}`);
      values.push(notes);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(req.params.id);

    const query = `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// GET statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT
        COUNT(*) as total_projects,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'Planned' THEN 1 ELSE 0 END) as planned,
        SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) as on_hold,
        SUM(COALESCE(actual_cost, 0)) as total_spent,
        SUM(COALESCE(estimated_cost, 0)) as total_budgeted
      FROM projects
    `);
    res.json(stats.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

app.listen(port, () => {
  console.log(`Landscaping API server running on http://localhost:${port}`);
});
