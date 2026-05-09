import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, deleteProject } from '../store/projectStore';
import './AdminDashboard.css';

export default function AdminDashboard({ onLogout, onEdit }) {
  const [projects, setProjects] = useState(getAllProjects());
  const [delConfirm, setDelConfirm] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleDelete = (id) => {
    deleteProject(id);
    setProjects(getAllProjects());
    setDelConfirm(null);
    showToast('Project deleted.');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">Gourish.</div>
        <nav className="admin-nav">
          <div className="admin-nav-item active">Projects</div>
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="admin-view-site">↗ View Site</a>
          <button className="admin-logout-btn" onClick={onLogout}>Log out</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <div className="admin-header-title">Projects</div>
            <div className="admin-header-sub">{projects.length} projects · all editable</div>
          </div>
          <Link to="/admin/new" className="admin-new-btn">+ Add Project</Link>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-section-label">
          <span>All projects</span>
          <span className="asl-count">{projects.length}</span>
        </div>

        {projects.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-title">No projects yet</div>
            <p className="admin-empty-desc">Click "Add Project" to create your first project.</p>
            <Link to="/admin/new" className="admin-new-btn">+ Add Project</Link>
          </div>
        ) : (
          <div className="admin-proj-list">
            {projects.map(p => (
              <ProjectRow
                key={p.id} project={p}
                onEdit={() => onEdit(p.id)}
                onDelete={() => setDelConfirm(p.id)}
              />
            ))}
          </div>
        )}

        {delConfirm && (
          <div className="admin-modal-overlay" onClick={() => setDelConfirm(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Delete project?</div>
              <p className="modal-desc">This permanently removes the project from your portfolio and cannot be undone.</p>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setDelConfirm(null)}>Cancel</button>
                <button className="modal-delete" onClick={() => handleDelete(delConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ProjectRow({ project, onEdit, onDelete }) {
  const bgMap = {
    'pv-1':'linear-gradient(135deg,#C8C4BB,#8C8880)',
    'pv-2':'linear-gradient(135deg,#A8C490,#6B9E52)',
    'pv-3':'linear-gradient(135deg,#D4B882,#A08848)',
    'pv-4':'linear-gradient(135deg,#7EB0D8,#4880B0)',
    'pv-5':'linear-gradient(135deg,#B4A8D8,#7860B8)',
    'pv-6':'linear-gradient(135deg,#D8A0A0,#B06868)',
  };
  return (
    <div className="admin-proj-row">
      <div
        className="apr-visual"
        style={project.thumbnail
          ? { backgroundImage:`url(${project.thumbnail})`, backgroundSize:'cover', backgroundPosition:'center' }
          : { background: bgMap[project.visual] || bgMap['pv-1'] }
        }
      />
      <div className="apr-info">
        <div className="apr-title">{project.title}</div>
        <div className="apr-meta">
          {project.year}
          {project.tags?.length > 0 && ` · ${project.tags.slice(0,3).join(', ')}`}
          {project.sections?.length > 0 && ` · ${project.sections.length} sections`}
        </div>
      </div>
      <div className="apr-badge live">Live</div>
      <div className="apr-actions">
        <a href={`/portfolio/${project.slug}`} target="_blank" rel="noreferrer" className="apr-action view">View ↗</a>
        <button className="apr-action edit" onClick={onEdit}>Edit</button>
        <button className="apr-action delete" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
