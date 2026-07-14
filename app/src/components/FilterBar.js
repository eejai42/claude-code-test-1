import React from 'react';
import './FilterBar.css';

function FilterBar({ filters, onFilterChange }) {
  const categories = ['Planting', 'Hardscape', 'Water Features', 'Lawn Care', 'Tree Work', 'Seasonal', 'Misc'];
  const locations = ['Front', 'Back', 'Side', 'Overall'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const statuses = ['Planned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'];

  const handleFilterChange = (filterName, value) => {
    onFilterChange({
      ...filters,
      [filterName]: value === filters[filterName] ? '' : value,
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Status:</label>
        <div className="filter-options">
          {statuses.map(status => (
            <button
              key={status}
              className={`filter-btn ${filters.status === status ? 'active' : ''}`}
              onClick={() => handleFilterChange('status', status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Category:</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Location:</label>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          className="filter-select"
        >
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Priority:</label>
        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
          className="filter-select"
        >
          <option value="">All Priorities</option>
          <option value="5">Critical (5)</option>
          <option value="4">High (4)</option>
          <option value="3">Medium (3)</option>
          <option value="2">Normal (2)</option>
          <option value="1">Low (1)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Season:</label>
        <select
          value={filters.season}
          onChange={(e) => onFilterChange({ ...filters, season: e.target.value })}
          className="filter-select"
        >
          <option value="">All Seasons</option>
          {seasons.map(season => (
            <option key={season} value={season}>{season}</option>
          ))}
        </select>
      </div>

      {Object.values(filters).some(f => f) && (
        <button
          className="btn-clear-filters"
          onClick={() => onFilterChange({ status: '', category: '', location: '', priority: '', season: '' })}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
