import React from 'react';
import ProjectCard from './ProjectCard';
import './ProjectList.css';

function ProjectList({ projects, onEdit, onDelete }) {
  const groupedByStatus = {
    'In Progress': projects.filter(p => p.status === 'In Progress'),
    'Planned': projects.filter(p => p.status === 'Planned'),
    'Completed': projects.filter(p => p.status === 'Completed'),
    'On Hold': projects.filter(p => p.status === 'On Hold'),
    'Cancelled': projects.filter(p => p.status === 'Cancelled'),
  };

  return (
    <div className="project-list">
      {Object.entries(groupedByStatus).map(([status, statusProjects]) => {
        if (statusProjects.length === 0) return null;

        const statusColors = {
          'In Progress': '#3b82f6',
          'Planned': '#8b5cf6',
          'Completed': '#22c55e',
          'On Hold': '#f59e0b',
          'Cancelled': '#ef4444',
        };

        return (
          <div key={status} className="status-group">
            <div className="status-header" style={{ borderLeftColor: statusColors[status] }}>
              <h2>{status}</h2>
              <span className="count">{statusProjects.length}</span>
            </div>
            <div className="projects-grid">
              {statusProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
