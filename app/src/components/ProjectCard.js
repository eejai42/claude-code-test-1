import React from 'react';
import './ProjectCard.css';

function ProjectCard({ project, onEdit, onDelete }) {
  const priorityColors = {
    1: '#10b981',
    2: '#3b82f6',
    3: '#f59e0b',
    4: '#ef4444',
    5: '#dc2626',
  };

  const priorityLabels = {
    1: 'Low',
    2: 'Normal',
    3: 'Medium',
    4: 'High',
    5: 'Critical',
  };

  const categoryEmojis = {
    'Planting': '🌱',
    'Hardscape': '🪨',
    'Water Features': '💧',
    'Lawn Care': '🌾',
    'Tree Work': '🌳',
    'Seasonal': '🍂',
    'Misc': '🛠️',
  };

  const costVariance = project.actual_cost && project.estimated_cost
    ? Math.round(((project.actual_cost - project.estimated_cost) / project.estimated_cost) * 100)
    : null;

  const hoursVariance = project.actual_hours && project.estimated_hours
    ? Math.round(((project.actual_hours - project.estimated_hours) / project.estimated_hours) * 100)
    : null;

  return (
    <div className="project-card">
      <div className="card-header">
        <div className="card-title">
          <span className="category-emoji">{categoryEmojis[project.category] || '📋'}</span>
          <div>
            <h3>{project.name}</h3>
            <p className="location">{project.location}</p>
          </div>
        </div>
        <div className="priority-badge" style={{ backgroundColor: priorityColors[project.priority] }}>
          {priorityLabels[project.priority]}
        </div>
      </div>

      {project.description && (
        <p className="description">{project.description}</p>
      )}

      <div className="card-meta">
        <div className="meta-item">
          <span className="label">Category</span>
          <span className="value">{project.category}</span>
        </div>
        {project.season && (
          <div className="meta-item">
            <span className="label">Season</span>
            <span className="value">{project.season}</span>
          </div>
        )}
      </div>

      <div className="costs-section">
        {project.estimated_cost && (
          <div className="cost-row">
            <span className="label">Budget</span>
            <div className="cost-values">
              <span>${project.estimated_cost.toFixed(2)}</span>
              {project.actual_cost && (
                <span className={`actual ${costVariance > 0 ? 'over' : 'under'}`}>
                  ${project.actual_cost.toFixed(2)} ({costVariance > 0 ? '+' : ''}{costVariance}%)
                </span>
              )}
            </div>
          </div>
        )}
        {project.estimated_hours && (
          <div className="cost-row">
            <span className="label">Hours</span>
            <div className="cost-values">
              <span>{project.estimated_hours.toFixed(1)}h est.</span>
              {project.actual_hours && (
                <span className={hoursVariance > 0 ? 'over' : 'under'}>
                  {project.actual_hours.toFixed(1)}h actual ({hoursVariance > 0 ? '+' : ''}{hoursVariance}%)
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {project.notes && (
        <div className="notes-section">
          <strong>Notes:</strong> {project.notes}
        </div>
      )}

      <div className="card-dates">
        {project.start_date && (
          <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>
        )}
        {project.completion_date && (
          <span>Completed: {new Date(project.completion_date).toLocaleDateString()}</span>
        )}
      </div>

      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(project)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(project.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ProjectCard;
