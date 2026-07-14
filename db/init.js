const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'landscaping',
});

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Read and execute schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);

    console.log('Database schema created successfully');

    // Insert sample data if desired
    const sampleProjects = [
      {
        name: 'Front Yard Flower Bed Refresh',
        category: 'Planting',
        description: 'Remove old soil, add new mulch, plant seasonal flowers and shrubs',
        location: 'Front',
        priority: 3,
        season: 'Spring',
        estimated_cost: 150,
        estimated_hours: 8,
        status: 'Planned',
        notes: 'Example project from rulebook',
      },
      {
        name: 'Back Patio Stone Replacement',
        category: 'Hardscape',
        description: 'Replace cracked flagstone sections, repoint mortar joints',
        location: 'Back',
        priority: 4,
        season: 'Summer',
        estimated_cost: 800,
        estimated_hours: 20,
        status: 'In Progress',
        notes: 'Example project from rulebook',
      },
    ];

    for (const project of sampleProjects) {
      await pool.query(
        `INSERT INTO projects
         (name, category, description, location, priority, season, estimated_cost,
          estimated_hours, status, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT DO NOTHING`,
        [
          project.name,
          project.category,
          project.description,
          project.location,
          project.priority,
          project.season,
          project.estimated_cost,
          project.estimated_hours,
          project.status,
          project.notes,
        ]
      );
    }

    console.log('Sample data inserted successfully');
    await pool.end();
    console.log('Database initialization complete');
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
}

initializeDatabase();
