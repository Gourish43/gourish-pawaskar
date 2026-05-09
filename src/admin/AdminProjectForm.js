import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addProject, updateProject, getAllProjects,
  slugify, SECTION_TYPES, VISUAL_OPTIONS
} from '../store/projectStore';
import './AdminProjectForm.css';

const genId = () => Math.random().toString(36).slice(2, 10);

const DEFAULT_SECTION = (type = 'overview') => ({
  id: genId(),
  type,
  customLabel: '',
  title: '',
  content: '',
  bulletPoints: [''],
  steps: [{ num: '01', name: '', desc: '' }],
  metrics: [{ num: '', label: '' }],
  highlightText: '',
  images: [],         // [{id, url, caption, position}]
  showHighlight: false,
  showBullets: false,
  showSteps: false,
  showMetrics: false,
  showImages: false,
});

export default function AdminProjectForm({ editId, onSave }) {
  const existingProject = editId
    ? getAllProjects().find(p => p.id === editId)
    : null;

  // ── BASIC FIELDS ──
  const [title, setTitle]         = useState(existingProject?.title || '');
  const [desc, setDesc]           = useState(existingProject?.desc || '');
  const [year, setYear]           = useState(existingProject?.year || '');
  const [visual, setVisual]       = useState(existingProject?.visual || 'pv-1');
  const [tagInput, setTagInput]   = useState('');
  const [tags, setTags]           = useState(existingProject?.tags || []);
  const [heroStats, setHeroStats]   = useState(existingProject?.heroStats || [{ val: '', label: '' }]);
  const [accentBg, setAccentBg]     = useState(existingProject?.accentBg || '');
  const [thumbnail, setThumbnail]   = useState(existingProject?.thumbnail || null);
  const [thumbDrag, setThumbDrag]   = useState(false);
  const thumbInputRef               = useRef(null);

  // ── SECTIONS ──
  const [sections, setSections] = useState(
    existingProject?.sections?.length > 0
      ? existingProject.sections
      : [DEFAULT_SECTION('overview')]
  );

  // ── UI STATE ──
  const [activeSection, setActiveSection] = useState(0);
  const [showSectionPicker, setShowSectionPicker] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [errors, setErrors]   = useState({});
  const [previewTab, setPreviewTab] = useState('form'); // 'form' | 'preview'
  const fileRefs = useRef({});

  // ── TAG HANDLERS ──
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) { setTags(prev => [...prev, t]); }
    setTagInput('');
  };
  const removeTag = (t) => setTags(prev => prev.filter(x => x !== t));

  // ── HERO STAT HANDLERS ──
  const updateHeroStat = (i, key, val) => {
    setHeroStats(prev => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  };
  const addHeroStat  = () => setHeroStats(prev => [...prev, { val: '', label: '' }]);
  const removeHeroStat = (i) => setHeroStats(prev => prev.filter((_, idx) => idx !== i));

  // ── SECTION HANDLERS ──
  const addSection = (type) => {
    setSections(prev => [...prev, DEFAULT_SECTION(type)]);
    setActiveSection(sections.length);
    setShowSectionPicker(false);
  };

  const removeSection = (idx) => {
    setSections(prev => prev.filter((_, i) => i !== idx));
    setActiveSection(Math.max(0, activeSection - 1));
  };

  const moveSection = (idx, dir) => {
    const next = idx + dir;
    if (next < 0 || next >= sections.length) return;
    setSections(prev => {
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
    setActiveSection(next);
  };

  const updateSection = useCallback((idx, key, val) => {
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, [key]: val } : s));
  }, []);

  // ── THUMBNAIL HANDLER ──
  const handleThumbnail = (files) => {
    const file = Array.from(files).find(f => f.type.startsWith('image/'));
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setThumbnail(e.target.result);
    reader.readAsDataURL(file);
  };

  // ── IMAGE HANDLERS ──
  const handleImageUpload = (sectionIdx, files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = { id: genId(), url: e.target.result, caption: '', position: 'full' };
        setSections(prev => prev.map((s, i) =>
          i === sectionIdx ? { ...s, images: [...(s.images || []), img] } : s
        ));
      };
      reader.readAsDataURL(file);
    });
  };

  const updateImage = (sectionIdx, imgId, key, val) => {
    setSections(prev => prev.map((s, i) =>
      i === sectionIdx
        ? { ...s, images: s.images.map(img => img.id === imgId ? { ...img, [key]: val } : img) }
        : s
    ));
  };

  const removeImage = (sectionIdx, imgId) => {
    setSections(prev => prev.map((s, i) =>
      i === sectionIdx ? { ...s, images: s.images.filter(img => img.id !== imgId) } : s
    ));
  };

  // ── BULLET / STEP / METRIC HANDLERS ──
  const updateBullet = (sIdx, bIdx, val) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== sIdx) return s;
      const bullets = [...s.bulletPoints];
      bullets[bIdx] = val;
      return { ...s, bulletPoints: bullets };
    }));
  };
  const addBullet    = (sIdx) => setSections(prev => prev.map((s, i) => i === sIdx ? { ...s, bulletPoints: [...s.bulletPoints, ''] } : s));
  const removeBullet = (sIdx, bIdx) => setSections(prev => prev.map((s, i) => i === sIdx ? { ...s, bulletPoints: s.bulletPoints.filter((_, j) => j !== bIdx) } : s));

  const updateStep = (sIdx, stIdx, key, val) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== sIdx) return s;
      const steps = s.steps.map((st, j) => j === stIdx ? { ...st, [key]: val } : st);
      return { ...s, steps };
    }));
  };
  const addStep    = (sIdx) => setSections(prev => prev.map((s, i) => i === sIdx ? { ...s, steps: [...s.steps, { num: String(s.steps.length + 1).padStart(2, '0'), name: '', desc: '' }] } : s));
  const removeStep = (sIdx, stIdx) => setSections(prev => prev.map((s, i) => i === sIdx ? { ...s, steps: s.steps.filter((_, j) => j !== stIdx) } : s));

  const updateMetric = (sIdx, mIdx, key, val) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== sIdx) return s;
      const metrics = s.metrics.map((m, j) => j === mIdx ? { ...m, [key]: val } : m);
      return { ...s, metrics };
    }));
  };
  const addMetric    = (sIdx) => setSections(prev => prev.map((s, i) => i === sIdx ? { ...s, metrics: [...s.metrics, { num: '', label: '' }] } : s));
  const removeMetric = (sIdx, mIdx) => setSections(prev => prev.map((s, i) => i === sIdx ? { ...s, metrics: s.metrics.filter((_, j) => j !== mIdx) } : s));

  // ── VALIDATE & SAVE ──
  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Project title is required';
    if (!desc.trim())  e.desc  = 'Short description is required';
    if (!year.trim())  e.year  = 'Year / date range is required';
    if (tags.length === 0) e.tags = 'Add at least one tag';
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    const slug = slugify(title);
    const project = {
      id: editId || genId(),
      slug,
      to: `/portfolio/${slug}`,
      visual, thumbnail: thumbnail || null,
      tags, title, desc, year,
      heroStats: heroStats.filter(s => s.val && s.label),
      accentBg: accentBg || undefined,
      sections,
      hardcoded: false,
      createdAt: existingProject?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    if (editId) { updateProject(editId, project); }
    else        { addProject(project); }
    setSaving(false);
    setSaved(true);
    setTimeout(() => { onSave(); }, 1200);
  };

  const sec = sections[activeSection];
  const sectionTypeMeta = SECTION_TYPES.find(t => t.type === sec?.type) || SECTION_TYPES[0];

  return (
    <div className="apf-layout">
      {/* SIDEBAR */}
      <aside className="apf-sidebar">
        <div className="apf-sidebar-top">
          <button className="apf-back" onClick={onSave}>← Projects</button>
          <div className="apf-sidebar-title">{editId ? 'Edit Project' : 'New Project'}</div>
        </div>

        {/* Section list */}
        <div className="apf-section-list">
          <div className="apf-section-list-label">Sections</div>
          {sections.map((s, i) => {
            const meta = SECTION_TYPES.find(t => t.type === s.type) || SECTION_TYPES[0];
            return (
              <div
                key={s.id}
                className={`apf-section-item ${activeSection === i ? 'active' : ''}`}
                onClick={() => setActiveSection(i)}
              >
                <span className="apf-section-item-label">
                  {s.type === 'custom' ? (s.customLabel || 'Custom Section') : meta.label}
                </span>
                <div className="apf-section-item-actions">
                  <button onClick={(e) => { e.stopPropagation(); moveSection(i, -1); }} disabled={i === 0} title="Move up">↑</button>
                  <button onClick={(e) => { e.stopPropagation(); moveSection(i, 1); }} disabled={i === sections.length - 1} title="Move down">↓</button>
                  <button onClick={(e) => { e.stopPropagation(); removeSection(i); }} className="remove-btn" title="Remove section">×</button>
                </div>
              </div>
            );
          })}

          <button className="apf-add-section-btn" onClick={() => setShowSectionPicker(p => !p)}>
            + Add Section
          </button>

            {showSectionPicker && (
              <div className="section-picker">
                {SECTION_TYPES.map(t => (
                  <button key={t.type} className="section-picker-item" onClick={() => addSection(t.type)}>
                    <div>
                      <div className="spi-label">{t.label}</div>
                      <div className="spi-desc">{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
        </div>

        <div className="apf-sidebar-save">
          <button className="apf-save-btn" onClick={handleSave} disabled={saving || saved}>
            {saved ? '✓ Saved!' : saving ? 'Saving…' : (editId ? 'Save Changes' : 'Publish Project')}
          </button>
        </div>
      </aside>

      {/* MAIN FORM */}
      <main className="apf-main">
        <div className="apf-tabs">
          <button className={`apf-tab ${previewTab === 'form' ? 'active' : ''}`} onClick={() => setPreviewTab('form')}>Edit</button>
          <button className={`apf-tab ${previewTab === 'preview' ? 'active' : ''}`} onClick={() => setPreviewTab('preview')}>Card Preview</button>
        </div>

        {previewTab === 'preview' ? (
          <CardPreview title={title} tags={tags} visual={visual} thumbnail={thumbnail} />
        ) : (
          <div className="apf-form-body">

            {/* ── BASIC INFO ── */}
            <div className="apf-card">
              <div className="apf-card-title">Project Info</div>

              {/* THUMBNAIL UPLOAD */}
              <div className="apf-field">
                <label>Card Thumbnail <span className="apf-hint">(main image shown as full card background)</span></label>
                <div
                  className={`thumb-dropzone ${thumbDrag ? 'dragging' : ''} ${thumbnail ? 'has-image' : ''}`}
                  onDragOver={e => { e.preventDefault(); setThumbDrag(true); }}
                  onDragLeave={() => setThumbDrag(false)}
                  onDrop={e => { e.preventDefault(); setThumbDrag(false); handleThumbnail(e.dataTransfer.files); }}
                  onClick={() => thumbInputRef.current?.click()}
                >
                  <input
                    ref={thumbInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => handleThumbnail(e.target.files)}
                  />
                  {thumbnail ? (
                    <>
                      <img src={thumbnail} alt="Thumbnail" className="thumb-preview-img" />
                      <div className="thumb-overlay-hint">Click or drop to replace</div>
                    </>
                  ) : (
                    <div className="thumb-empty">
                      <div className="thumb-empty-text">Drop your project thumbnail here</div>
                      <div className="thumb-empty-sub">or click to browse · PNG, JPG, WebP recommended · min 800×500px</div>
                      <button type="button" className="thumb-browse-btn" onClick={e => { e.stopPropagation(); thumbInputRef.current?.click(); }}>
                        Browse image
                      </button>
                    </div>
                  )}
                </div>
                {thumbnail && (
                  <button className="thumb-remove-btn" onClick={() => setThumbnail(null)}>
                    Remove thumbnail
                  </button>
                )}
              </div>

              {/* GRADIENT FALLBACK — shown only when no thumbnail */}
              {!thumbnail && (
                <div className="apf-field">
                  <label>Fallback Card Color <span className="apf-hint">(used when no thumbnail is uploaded)</span></label>
                  <div className="visual-picker">
                    {VISUAL_OPTIONS.map(v => (
                      <button
                        key={v.value}
                        className={`visual-opt ${visual === v.value ? 'selected' : ''}`}
                        style={{ background: v.preview }}
                        onClick={() => setVisual(v.value)}
                        title={v.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="apf-field-row">
                <div className={`apf-field ${errors.title ? 'has-err' : ''}`}>
                  <label>Project Title *</label>
                  <input value={title} onChange={e => { setTitle(e.target.value); setErrors(p => ({...p, title:''})); }} placeholder="e.g. FinTech Dashboard Redesign" />
                  {errors.title && <span className="apf-err">{errors.title}</span>}
                </div>
                <div className={`apf-field ${errors.year ? 'has-err' : ''}`}>
                  <label>Year / Date Range *</label>
                  <input value={year} onChange={e => { setYear(e.target.value); setErrors(p => ({...p, year:''})); }} placeholder="e.g. Jan – Jun 2025" />
                  {errors.year && <span className="apf-err">{errors.year}</span>}
                </div>
              </div>

              <div className={`apf-field ${errors.desc ? 'has-err' : ''}`}>
                <label>Short Description * <span className="apf-hint">(used in case study page header)</span></label>
                <textarea rows={3} value={desc} onChange={e => { setDesc(e.target.value); setErrors(p => ({...p, desc:''})); }} placeholder="Brief description of the project…" />
                {errors.desc && <span className="apf-err">{errors.desc}</span>}
              </div>

              {/* TAGS */}
              <div className={`apf-field ${errors.tags ? 'has-err' : ''}`}>
                <label>Tags * <span className="apf-hint">First tag = category shown on card · Press Enter or comma to add</span></label>
                <div className="tag-input-wrap">
                  {tags.map(t => (
                    <span key={t} className="tag-chip">{t}<button onClick={() => removeTag(t)}>×</button></span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); } }}
                    placeholder={tags.length === 0 ? 'Figma, SaaS, Mobile…' : ''}
                    className="tag-input"
                  />
                </div>
                {errors.tags && <span className="apf-err">{errors.tags}</span>}
              </div>

              <div className="apf-field">
                <label>Page Accent Background <span className="apf-hint">(CSS gradient for case study hero, optional)</span></label>
                <input value={accentBg} onChange={e => setAccentBg(e.target.value)} placeholder="linear-gradient(150deg, #EAF3DE 0%, #F7F6F3 70%)" />
              </div>

              {/* HERO STATS */}
              <div className="apf-field">
                <label>Hero Stats <span className="apf-hint">(shown at top of case study page)</span></label>
                {heroStats.map((s, i) => (
                  <div key={i} className="hero-stat-row">
                    <input value={s.val} onChange={e => updateHeroStat(i, 'val', e.target.value)} placeholder="e.g. 4 months" className="hs-val" />
                    <input value={s.label} onChange={e => updateHeroStat(i, 'label', e.target.value)} placeholder="e.g. Time to ship" className="hs-label" />
                    <button className="hs-remove" onClick={() => removeHeroStat(i)} disabled={heroStats.length === 1}>×</button>
                  </div>
                ))}
                <button className="apf-add-row-btn" onClick={addHeroStat}>+ Add stat</button>
              </div>
            </div>

            {/* ── ACTIVE SECTION EDITOR ── */}
            {sec && (
              <div className="apf-card section-editor">
                <div className="apf-card-title">
                  {sec.type === 'custom'
                    ? <input value={sec.customLabel} onChange={e => updateSection(activeSection, 'customLabel', e.target.value)} placeholder="Section name…" className="custom-label-input" />
                    : <span>{sectionTypeMeta.label}</span>
                  }
                  <span className="section-editor-num">Section {activeSection + 1} of {sections.length}</span>
                </div>

                {/* Section Title */}
                <div className="apf-field">
                  <label>Section Title</label>
                  <input value={sec.title} onChange={e => updateSection(activeSection, 'title', e.target.value)} placeholder={`e.g. ${sectionTypeMeta.label}`} />
                </div>

                {/* Main Content */}
                <div className="apf-field">
                  <label>Main Text</label>
                  <textarea rows={5} value={sec.content} onChange={e => updateSection(activeSection, 'content', e.target.value)} placeholder="Write the main paragraph content for this section…" />
                </div>

                {/* ── IMAGE UPLOAD ── */}
                <div className="section-feature">
                  <div className="sf-header" onClick={() => updateSection(activeSection, 'showImages', !sec.showImages)}>
                    <div className="sf-toggle">{sec.showImages ? '▼' : '▶'}</div>
                    <div className="sf-label">Images</div>
                    <div className="sf-count">{(sec.images || []).length} added</div>
                  </div>
                  {sec.showImages && (
                    <div className="sf-body">
                      <ImageUploader
                        images={sec.images || []}
                        sectionIdx={activeSection}
                        onUpload={handleImageUpload}
                        onUpdate={updateImage}
                        onRemove={removeImage}
                        fileRef={el => fileRefs.current[`img-${activeSection}`] = el}
                      />
                    </div>
                  )}
                </div>

                {/* ── HIGHLIGHT BOX ── */}
                <div className="section-feature">
                  <div className="sf-header" onClick={() => updateSection(activeSection, 'showHighlight', !sec.showHighlight)}>
                    <div className="sf-toggle">{sec.showHighlight ? '▼' : '▶'}</div>
                    <div className="sf-label">Highlight Quote / Callout</div>
                  </div>
                  {sec.showHighlight && (
                    <div className="sf-body">
                      <textarea rows={3} value={sec.highlightText} onChange={e => updateSection(activeSection, 'highlightText', e.target.value)} placeholder="Key insight, tension, or question to highlight…" />
                    </div>
                  )}
                </div>

                {/* ── BULLET POINTS ── */}
                <div className="section-feature">
                  <div className="sf-header" onClick={() => updateSection(activeSection, 'showBullets', !sec.showBullets)}>
                    <div className="sf-toggle">{sec.showBullets ? '▼' : '▶'}</div>
                    <div className="sf-label">Bullet Points</div>
                    <div className="sf-count">{sec.bulletPoints?.filter(b => b).length || 0} items</div>
                  </div>
                  {sec.showBullets && (
                    <div className="sf-body">
                      {sec.bulletPoints.map((b, bIdx) => (
                        <div key={bIdx} className="bullet-row">
                          <input value={b} onChange={e => updateBullet(activeSection, bIdx, e.target.value)} placeholder={`Point ${bIdx + 1}…`} />
                          <button onClick={() => removeBullet(activeSection, bIdx)} disabled={sec.bulletPoints.length === 1}>×</button>
                        </div>
                      ))}
                      <button className="apf-add-row-btn" onClick={() => addBullet(activeSection)}>+ Add point</button>
                      <p className="apf-hint-text">Tip: Use <code>**bold**</code> at start for bold text.</p>
                    </div>
                  )}
                </div>

                {/* ── PROCESS STEPS ── */}
                <div className="section-feature">
                  <div className="sf-header" onClick={() => updateSection(activeSection, 'showSteps', !sec.showSteps)}>
                    <div className="sf-toggle">{sec.showSteps ? '▼' : '▶'}</div>
                    <div className="sf-label">Process Steps</div>
                    <div className="sf-count">{sec.steps?.length || 0} steps</div>
                  </div>
                  {sec.showSteps && (
                    <div className="sf-body">
                      {sec.steps.map((st, stIdx) => (
                        <div key={stIdx} className="step-row">
                          <input value={st.num} onChange={e => updateStep(activeSection, stIdx, 'num', e.target.value)} className="step-num" placeholder="01" />
                          <div className="step-fields">
                            <input value={st.name} onChange={e => updateStep(activeSection, stIdx, 'name', e.target.value)} placeholder="Step name…" />
                            <textarea rows={2} value={st.desc} onChange={e => updateStep(activeSection, stIdx, 'desc', e.target.value)} placeholder="Step description…" />
                          </div>
                          <button onClick={() => removeStep(activeSection, stIdx)} disabled={sec.steps.length === 1}>×</button>
                        </div>
                      ))}
                      <button className="apf-add-row-btn" onClick={() => addStep(activeSection)}>+ Add step</button>
                    </div>
                  )}
                </div>

                {/* ── METRICS ── */}
                <div className="section-feature">
                  <div className="sf-header" onClick={() => updateSection(activeSection, 'showMetrics', !sec.showMetrics)}>
                    <div className="sf-toggle">{sec.showMetrics ? '▼' : '▶'}</div>
                    <div className="sf-label">Metric Strip</div>
                    <div className="sf-count">{sec.metrics?.length || 0} metrics</div>
                  </div>
                  {sec.showMetrics && (
                    <div className="sf-body">
                      <div className="metrics-grid">
                        {sec.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="metric-row">
                            <input value={m.num} onChange={e => updateMetric(activeSection, mIdx, 'num', e.target.value)} placeholder="Value (e.g. 20%)" className="metric-num" />
                            <input value={m.label} onChange={e => updateMetric(activeSection, mIdx, 'label', e.target.value)} placeholder="Label (e.g. Faster handoff)" className="metric-lbl" />
                            <button onClick={() => removeMetric(activeSection, mIdx)} disabled={sec.metrics.length === 1}>×</button>
                          </div>
                        ))}
                      </div>
                      <button className="apf-add-row-btn" onClick={() => addMetric(activeSection)}>+ Add metric</button>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}

// ── IMAGE UPLOADER SUB-COMPONENT ──
function ImageUploader({ images, sectionIdx, onUpload, onUpdate, onRemove, fileRef }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    onUpload(sectionIdx, e.dataTransfer.files);
  };

  return (
    <div className="image-uploader">
      {/* Drop zone */}
      <div
        className={`image-dropzone ${dragging ? 'dragging' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple style={{display:'none'}}
          onChange={e => onUpload(sectionIdx, e.target.files)} />
        <div className="dropzone-text">Drop images here or click to upload</div>
        <div className="dropzone-hint">PNG, JPG, GIF, WebP · Multiple files supported</div>
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="image-grid">
          {images.map(img => (
            <div key={img.id} className="image-card">
              <div className="image-preview-wrap">
                <img src={img.url} alt={img.caption || 'Upload'} />
                <button className="image-remove" onClick={() => onRemove(sectionIdx, img.id)}>×</button>
              </div>
              <input
                value={img.caption}
                onChange={e => onUpdate(sectionIdx, img.id, 'caption', e.target.value)}
                placeholder="Image caption (optional)"
                className="image-caption-input"
              />
              <select
                value={img.position}
                onChange={e => onUpdate(sectionIdx, img.id, 'position', e.target.value)}
                className="image-position-select"
              >
                <option value="full">Full width</option>
                <option value="half">Half width</option>
                <option value="inline">Inline</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CARD PREVIEW ──
function CardPreview({ title, tags, visual, thumbnail }) {
  const bgMap = {
    'pv-1': 'linear-gradient(145deg,#C8C4BB,#8C8880)',
    'pv-2': 'linear-gradient(145deg,#A8C490,#6B9E52)',
    'pv-3': 'linear-gradient(145deg,#D4B882,#A08848)',
    'pv-4': 'linear-gradient(145deg,#7EB0D8,#4880B0)',
    'pv-5': 'linear-gradient(145deg,#B4A8D8,#7860B8)',
    'pv-6': 'linear-gradient(145deg,#D8A0A0,#B06868)',
  };
  const category = tags?.[0] || 'Category';

  return (
    <div className="card-preview-wrap">
      <div className="card-preview-label">Portfolio card preview</div>
      <div className="card-preview-new"
        style={thumbnail
          ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : { background: bgMap[visual] || bgMap['pv-1'] }
        }
      >
        <div className="cp-scrim" />
        <div className="cp-content">
          <div className="cp-category">{category}</div>
          <div className="cp-title-new">{title || 'Project Title'}</div>
          <div className="cp-cta-row">
            <span className="cp-cta-text">View case study</span>
            <span className="cp-arrow">→</span>
          </div>
        </div>
      </div>
      <div className="card-preview-note">
        {thumbnail ? 'Using your uploaded thumbnail' : 'No thumbnail — showing fallback gradient'}
      </div>
    </div>
  );
}
