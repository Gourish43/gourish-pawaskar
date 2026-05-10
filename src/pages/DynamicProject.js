import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug, SECTION_TYPES } from '../store/projectStore';
import ProjectPage, { MetricStrip, Steps, Highlight, BulletList } from '../components/ProjectPage';

export default function DynamicProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(undefined); // undefined=loading, null=not found
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getProjectBySlug(slug);
      setProject(p || null);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{fontFamily:'var(--sans)', color:'var(--text-3)', fontSize:'0.9rem'}}>Loading project…</div>
    </div>
  );

  if (!project) return <Navigate to="/portfolio" replace />;

  const toc = (project.sections || []).map(s => {
    const meta  = SECTION_TYPES.find(t => t.type === s.type);
    const label = s.type === 'custom' ? (s.customLabel || 'Section') : (meta?.label || s.type);
    return [s.id, label];
  });

  return (
    <ProjectPage
      accentBg={project.accentBg || 'var(--off-white)'}
      tags={project.tags || []}
      title={project.title}
      desc={project.desc}
      thumbnail={project.thumbnail}
      heroStats={project.heroStats?.length > 0 ? project.heroStats.map(s => [s.val, s.label]) : undefined}
      toc={toc}
    >
      {(project.sections || []).map(sec => (
        <SectionRenderer key={sec.id} section={sec} />
      ))}
    </ProjectPage>
  );
}

function parseBold(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function SectionRenderer({ section: s }) {
  const meta  = SECTION_TYPES.find(t => t.type === s.type);
  const label = s.type === 'custom' ? (s.customLabel || 'Section') : (meta?.label || s.type);

  const hasContent   = s.content?.trim();
  const hasHighlight = s.showHighlight && s.highlightText?.trim();
  const hasBullets   = s.showBullets  && s.bulletPoints?.some(b => b?.trim());
  const hasSteps     = s.showSteps    && s.steps?.some(st => st.name || st.desc);
  const hasMetrics   = s.showMetrics  && s.metrics?.some(m => m.num && m.label);
  const hasImages    = s.showImages   && s.images?.length > 0;

  const isEmpty = !s.title && !hasContent && !hasHighlight && !hasBullets && !hasSteps && !hasMetrics && !hasImages;
  if (isEmpty) return null;

  const fullImages   = (s.images||[]).filter(i => i.position === 'full');
  const halfImages   = (s.images||[]).filter(i => i.position === 'half');
  const inlineImages = (s.images||[]).filter(i => i.position === 'inline');

  return (
    <div className="cs-block reveal" id={s.id}>
      <div className="cs-block-label">{label}</div>
      {s.title && <div className="cs-block-title">{s.title}</div>}
      {hasImages && inlineImages.length > 0 && (
        <div className="dynamic-images-inline">
          {inlineImages.map(img => (
            <div key={img.id} className="dyn-img-wrap inline">
              <img src={img.url} alt={img.caption||''} />
              {img.caption && <div className="dyn-img-caption">{img.caption}</div>}
            </div>
          ))}
        </div>
      )}
      {hasImages && fullImages.length > 0 && (
        <div className="dynamic-images-full">
          {fullImages.map(img => (
            <div key={img.id} className="dyn-img-wrap full">
              <img src={img.url} alt={img.caption||''} />
              {img.caption && <div className="dyn-img-caption">{img.caption}</div>}
            </div>
          ))}
        </div>
      )}
      {hasContent && s.content.split('\n\n').map((para, i) =>
        para.trim() ? <p key={i} className="cs-block-text" dangerouslySetInnerHTML={{__html: parseBold(para)}} /> : null
      )}
      {hasImages && halfImages.length > 0 && (
        <div className="dynamic-images-half">
          {halfImages.map(img => (
            <div key={img.id} className="dyn-img-wrap half">
              <img src={img.url} alt={img.caption||''} />
              {img.caption && <div className="dyn-img-caption">{img.caption}</div>}
            </div>
          ))}
        </div>
      )}
      {hasHighlight && <Highlight>{s.highlightText}</Highlight>}
      {hasMetrics   && <MetricStrip metrics={s.metrics.filter(m => m.num && m.label).map(m => [m.num, m.label])} />}
      {hasBullets   && <BulletList items={s.bulletPoints.filter(b => b?.trim()).map(b => parseBold(b))} />}
      {hasSteps     && <Steps steps={s.steps.filter(st => st.name||st.desc).map(st => [st.num, st.name, st.desc])} />}
    </div>
  );
}
