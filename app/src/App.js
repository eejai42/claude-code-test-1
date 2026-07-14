import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    location: '',
    priority: '',
    season: '',
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`${API_URL}/projects?${params}`);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, [filters]);

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        setProjects(projects.filter(p => p.id !== id));
        fetchStats();
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        await axios.put(`${API_URL}/projects/${editingProject.id}`, projectData);
      } else {
        await axios.post(`${API_URL}/projects`, projectData);
      }
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
      fetchStats();
    } catch (err) {
      setError('Failed to save project');
      console.error(err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>🌿 Landscaping Projects</h1>
            <p className="subtitle">Track and manage your yard projects</p>
          </div>
          <button className="btn-primary" onClick={handleAddProject}>
            + New Project
          </button>
        </div>
      </header>

      {stats && <StatsPanel stats={stats} />}

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingProject ? 'Edit Project' : 'New Project'}</h2>
                <button className="btn-close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="no-projects">
            <p>No projects found. {filters.status || filters.category ? 'Try adjusting your filters.' : 'Click "New Project" to get started!'}</p>
          </div>
        ) : (
          <ProjectList
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        )}
      </main>
    </div>
  );
}

export default App;
