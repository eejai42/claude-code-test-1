import React from 'react';
import './StatsPanel.css';

function StatsPanel({ stats }) {
  const statCards = [
    {
      label: 'Total Projects',
      value: stats.total_projects || 0,
      color: '#8b5cf6',
      icon: '📋',
    },
    {
      label: 'In Progress',
      value: stats.in_progress || 0,
      color: '#3b82f6',
      icon: '⚙️',
    },
    {
      label: 'Completed',
      value: stats.completed || 0,
      color: '#22c55e',
      icon: '✅',
    },
    {
      label: 'Planned',
      value: stats.planned || 0,
      color: '#8b5cf6',
      icon: '📅',
    },
    {
      label: 'Total Spent',
      value: `$${(stats.total_spent || 0).toFixed(2)}`,
      color: '#f59e0b',
      icon: '💰',
    },
    {
      label: 'Total Budgeted',
      value: `$${(stats.total_budgeted || 0).toFixed(2)}`,
      color: '#06b6d4',
      icon: '📊',
    },
  ];

  return (
    <div className="stats-panel">
      {statCards.map((card, index) => (
        <div key={index} className="stat-card" style={{ borderLeftColor: card.color }}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-content">
            <div className="stat-label">{card.label}</div>
            <div className="stat-value" style={{ color: card.color }}>
              {card.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsPanel;
