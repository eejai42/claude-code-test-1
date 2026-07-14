import React, { useState, useEffect } from 'react';
import './ProjectForm.css';

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Planting',
    description: '',
    location: 'Front',
    priority: 3,
    season: '',
    estimated_cost: '',
    actual_cost: '',
    estimated_hours: '',
    actual_hours: '',
    status: 'Planned',
    start_date: '',
    completion_date: '',
    notes: '',
  });

  const categories = ['Planting', 'Hardscape', 'Water Features', 'Lawn Care', 'Tree Work', 'Seasonal', 'Misc'];
  const locations = ['Front', 'Back', 'Side', 'Overall'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const statuses = ['Planned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'];

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        category: project.category || 'Planting',
        description: project.description || '',
        location: project.location || 'Front',
        priority: project.priority || 3,
        season: project.season || '',
        estimated_cost: project.estimated_cost || '',
        actual_cost: project.actual_cost || '',
        estimated_hours: project.estimated_hours || '',
        actual_hours: project.actual_hours || '',
        status: project.status || 'Planned',
        start_date: project.start_date || '',
        completion_date: project.completion_date || '',
        notes: project.notes || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('cost') || name.includes('hours')
        ? value === '' ? '' : parseFloat(value)
        : name === 'priority'
        ? parseInt(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.location) {
      alert('Please fill in name, category, and location');
      return;
    }
    onSave(formData);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Basic Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Project Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Front Yard Flower Bed"
              required
            />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Location *</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange} required>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the project details..."
            rows="3"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Planning</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              {[1, 2, 3, 4, 5].map(p => (
                <option key={p} value={p}>
                  {p === 1 ? 'Low' : p === 2 ? 'Normal' : p === 3 ? 'Medium' : p === 4 ? 'High' : 'Critical'}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Season</label>
            <select name="season" value={formData.season} onChange={handleChange}>
              <option value="">Select season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Estimated Cost ($)</label>
            <input
              type="number"
              name="estimated_cost"
              value={formData.estimated_cost}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
            />
          </div>
          <div className="form-group">
            <label>Estimated Hours</label>
            <input
              type="number"
              name="estimated_hours"
              value={formData.estimated_hours}
              onChange={handleChange}
              step="0.5"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Tracking</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Completion Date</label>
            <input
              type="date"
              name="completion_date"
              value={formData.completion_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Actual Cost ($)</label>
            <input
              type="number"
              name="actual_cost"
              value={formData.actual_cost}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
            />
          </div>
          <div className="form-group">
            <label>Actual Hours</label>
            <input
              type="number"
              name="actual_hours"
              value={formData.actual_hours}
              onChange={handleChange}
              step="0.5"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Notes</h3>
        <div className="form-group">
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes, learnings, or issues..."
            rows="3"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-save">Save Project</button>
      </div>
    </form>
  );
}

export default ProjectForm;
