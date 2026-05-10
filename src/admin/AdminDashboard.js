import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, deleteProject } from '../store/projectStore';
import './AdminDashboard.css';

export default function AdminDashboard({ onLogout, onEdit }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [delConfirm, setDelConfirm] = useState(null);
  const [toast, setToast]       = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  async function load() {
    setLoading(true);
    const all = await getAllProjects();
    setProjects(all);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      await load();
      showToast('Project deleted.');
    } catch (e) {
      showToast('Error deleting project. Try again.');
    }
    setDelConfirm(null);
  };

  const bgMap = {
    'pv-1':'linear-gradient(135deg,#C8C4BB,#8C8880)',
    'pv-2':'linear-gradient(135deg,#A8C490,#6B9E52)',
    'pv-3':'linear-gradient(135deg,#D4B882,#A08848)',
    'pv-4':'linear-gradient(135deg,#7EB0D8,#4880B0)',
    'pv-5':'linear-gradient(135deg,#B4A8D8,#7860B8)',
    'pv-6':'linear-gradient(135deg,#D8A0A0,#B06868)',
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
            <div className="admin-header-sub">
              {loading ? 'Loading…' : `${projects.length} projects · all editable · synced to Supabase`}
            </div>
          </div>
          <Link to="/admin/new" className="admin-new-btn">+ Add Project</Link>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        <div className="admin-section-label">
          <span>All projects</span>
          {!loading && <span className="asl-count">{projects.length}</span>}
        </div>

        {loading ? (
          <div className="admin-loading">
            {[1,2,3,4].map(i => <div key={i} className="admin-row-skeleton" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-title">No projects yet</div>
            <p className="admin-empty-desc">Click "Add Project" to create your first project.</p>
            <Link to="/admin/new" className="admin-new-btn">+ Add Project</Link>
          </div>
        ) : (
          <div className="admin-proj-list">
            {projects.map(p => (
              <div key={p.id} className="admin-proj-row">
                <div className="apr-visual"
                  style={p.thumbnail
                    ? {backgroundImage:`url(${p.thumbnail})`, backgroundSize:'cover', backgroundPosition:'center'}
                    : {background: bgMap[p.visual] || bgMap['pv-1']}
                  }
                />
                <div className="apr-info">
                  <div className="apr-title">{p.title}</div>
                  <div className="apr-meta">
                    {p.year}{p.tags?.length > 0 && ` · ${p.tags.slice(0,3).join(', ')}`}
                    {p.sections?.length > 0 && ` · ${p.sections.length} sections`}
                  </div>
                </div>
                <div className="apr-badge live">Live</div>
                <div className="apr-actions">
                  <a href={`/portfolio/${p.slug}`} target="_blank" rel="noreferrer" className="apr-action view">View ↗</a>
                  <button className="apr-action edit" onClick={() => onEdit(p.id)}>Edit</button>
                  <button className="apr-action delete" onClick={() => setDelConfirm(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {delConfirm && (
          <div className="admin-modal-overlay" onClick={() => setDelConfirm(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Delete project?</div>
              <p className="modal-desc">This permanently removes the project from Supabase. All visitors will immediately stop seeing it.</p>
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
