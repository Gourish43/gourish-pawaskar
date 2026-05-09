import React from 'react';
import ProjectPage, { MetricStrip, ToolRow, Highlight, BulletList } from '../components/ProjectPage';

export default function ProjectBEL() {
  return (
    <ProjectPage
      accentBg="linear-gradient(150deg, #FAEEDA 0%, #F7F6F3 70%)"
      tags={['Government', 'Defence', 'WCAG 2.1', 'Enterprise']}
      title="Defence Platform UX"
      desc="End-to-end UI/UX for confidential government and defence platforms at Bharat Electronics Limited — WCAG-compliant, security-first design that cut design-to-dev turnaround by 20%."
      heroStats={[['20%', 'Faster handoff'], ['WCAG', '2.1 compliant'], ['11', 'Months'], ['2025', 'Year']]}
      toc={[['context','Context'],['challenge','Challenge'],['role','My Role'],['approach','Approach'],['outcome','Outcome'],['note','Confidentiality']]}
      nextTitle="Smart Warehouse Dashboard"
      nextTo="/portfolio/warehouse-dashboard"
    >
      <div className="cs-block reveal" id="context">
        <div className="cs-block-label">Context</div>
        <div className="cs-block-title">About the project</div>
        <p className="cs-block-text">Bharat Electronics Limited (BEL) is India's premier defence electronics company. I joined as a UI/UX Designer on contract through Quantum Asia Pvt. Ltd. from January to November 2025, working on confidential government and defence platforms.</p>
        <p className="cs-block-text">Government and defence platforms require a delicate balance of strict security constraints, operational clarity, and accessibility compliance — with no room for ambiguity in the user interface. Every design decision had downstream consequences for mission-critical workflows.</p>
      </div>

      <div className="cs-block reveal" id="challenge">
        <div className="cs-block-label">Challenge</div>
        <div className="cs-block-title">The design challenge</div>
        <Highlight>Defence platform users operate under high-stakes, time-constrained conditions. The UI must communicate clearly, load fast, and never mislead — even when the underlying data is complex or incomplete.</Highlight>
        <BulletList items={[
          'Strict security and data classification constraints impacted what could be shown and how',
          'Users range from technical operators to administrative staff — very different mental models',
          'WCAG 2.1 accessibility compliance was a non-negotiable requirement across all interfaces',
          'Design-to-dev handoff was slow and causing delays — needed systematic improvement',
          'Legacy patterns existed that needed modernising without disrupting trained user behaviour',
        ]} />
      </div>

      <div className="cs-block reveal" id="role">
        <div className="cs-block-label">My Role</div>
        <div className="cs-block-title">What I owned</div>
        <BulletList items={[
          'Sole UI/UX designer responsible for end-to-end design across assigned platform modules',
          'Conducted stakeholder interviews to understand operational workflows and user mental models',
          'Created wireframes, high-fidelity designs, and interaction specifications for government platforms',
          'Collaborated directly with developers and government stakeholders to align on requirements',
          'Led systematic improvements to design-to-dev handoff process — reducing turnaround by 20%',
          'Delivered WCAG 2.1 compliant interfaces across all designed surfaces',
        ]} />
      </div>

      <div className="cs-block reveal" id="approach">
        <div className="cs-block-label">Design Approach</div>
        <div className="cs-block-title">How I approached it</div>
        <BulletList items={[
          '<strong>Clarity over aesthetics:</strong> Every design choice prioritised operational clarity. Visual hierarchy was engineered to surface critical information instantly.',
          '<strong>Accessibility as baseline:</strong> WCAG 2.1 compliance was treated as a starting point, not a checkbox. All colour contrast ratios, focus states, and screen reader flows were verified.',
          '<strong>Systematic handoff:</strong> Introduced annotated design specifications, a component-level handoff checklist, and direct developer review sessions — resulting in 20% faster turnaround.',
          '<strong>Respecting existing patterns:</strong> Where legacy UI patterns were deeply ingrained in user muscle memory, I evolved them incrementally rather than replacing them wholesale.',
        ]} />
        <ToolRow tools={['Figma', 'Accessibility', 'WCAG 2.1', 'Stakeholder Collaboration', 'Design Specs']} />
      </div>

      <div className="cs-block reveal" id="outcome">
        <div className="cs-block-label">Outcome</div>
        <div className="cs-block-title">Impact delivered</div>
        <MetricStrip metrics={[['20%', 'Faster dev handoff'], ['WCAG', '2.1 Compliant'], ['11', 'Months delivered'], ['↑', 'Interface clarity']]} />
        <p className="cs-block-text">All platform modules were delivered on time with full WCAG 2.1 compliance. The streamlined handoff process reduced turnaround time by 20%, improving the overall product delivery cadence. Stakeholder feedback highlighted significant improvements in interface clarity and consistency.</p>
      </div>

      <div className="cs-block reveal" id="note">
        <div className="cs-block-label">Confidentiality Note</div>
        <div className="cs-block-title">What I can share</div>
        <Highlight>Project details, screenshots, and specific platform names are confidential due to the nature of government and defence work. Full details are available for discussion during interviews under NDA.</Highlight>
        <p className="cs-block-text">I'm happy to walk through my design process, decisions, and outcomes in a private conversation. The methodology, accessibility approach, and handoff improvements are all shareable in detail.</p>
      </div>
    </ProjectPage>
  );
}
