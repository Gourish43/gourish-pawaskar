import React from 'react';
import ProjectPage, { MetricStrip, Steps, ToolRow, Highlight, BulletList } from '../components/ProjectPage';

export default function ProjectESG() {
  return (
    <ProjectPage
      accentBg="linear-gradient(160deg, #EAF3DE 0%, #F7F6F3 60%)"
      tags={['Enterprise SaaS', 'Agentic AI', 'ESG', 'Figma']}
      title="ESG Management Platform"
      desc="Scalable enterprise SaaS with Agentic AI and Supply Assessment modules — designed from concept to production at Sustainext Digital. A platform that makes ESG compliance feel manageable rather than overwhelming."
      heroStats={[['2', 'Modules shipped'], ['↑', 'Client engagement'], ['WCAG', '2.1 compliant'], ['2025', 'Current role']]}
      toc={[['overview','Overview'],['challenge','Challenge'],['role','My Role'],['process','Process'],['decisions','Key Decisions'],['design-system','Design System'],['outcome','Outcome']]}
      nextTitle="Defence Platform UX"
      nextTo="/portfolio/defence-ux"
    >
      <div className="cs-block reveal" id="overview">
        <div className="cs-block-label">Overview</div>
        <div className="cs-block-title">The platform</div>
        <p className="cs-block-text">Sustainext Digital's ESG management platform helps enterprise clients manage Environmental, Social, and Governance (ESG) reporting obligations through a unified SaaS dashboard. The platform is powered by Agentic AI — a system that autonomously completes multi-step tasks on behalf of users, reducing manual effort in data collection, assessment, and reporting workflows.</p>
        <p className="cs-block-text">I joined as the UI/UX Designer in November 2025 and own end-to-end design across all product modules.</p>
      </div>

      <div className="cs-block reveal" id="challenge">
        <div className="cs-block-label">Challenge</div>
        <div className="cs-block-title">The design challenge</div>
        <p className="cs-block-text">ESG compliance is inherently complex — enterprise users deal with fragmented data sources, multi-stakeholder approval chains, and constantly evolving regulatory frameworks. The existing workflow required users to context-switch across multiple tools, spreadsheets, and email threads.</p>
        <Highlight>How do you design an AI-driven enterprise platform that feels like it's working with users — not on their behalf without their understanding? Agentic AI needed to feel transparent, trustworthy, and controllable.</Highlight>
        <BulletList items={[
          'Fragmented workflows across multiple disconnected tools',
          'ESG data collection was largely manual and error-prone',
          'Agentic AI actions needed to be visible, auditable, and reversible',
          'Supply chain assessment required complex multi-party data flows',
          'Diverse enterprise users — from sustainability managers to C-suite executives',
        ]} />
      </div>

      <div className="cs-block reveal" id="role">
        <div className="cs-block-label">My Role</div>
        <div className="cs-block-title">What I owned</div>
        <BulletList items={[
          'Led UX research, ideation, and experience planning for multiple product modules based on PRD requirements',
          'Designed and delivered the Agentic AI module — AI task initiation, progress visibility, action logs, and approval flows',
          'Designed the Supply Assessment system — supplier onboarding flows, questionnaires, scoring dashboards',
          'Created wireframes, user flows, high-fidelity UI designs, interactive prototypes, and responsive dashboards in Figma',
          'Collaborated with developers, PMs, and leadership to align design decisions with business objectives',
          'Contributed to and maintained the platform-wide design system',
        ]} />
      </div>

      <div className="cs-block reveal" id="process">
        <div className="cs-block-label">Process</div>
        <div className="cs-block-title">How I worked</div>
        <Steps steps={[
          ['01','PRD Intake & Alignment','Reviewed PRDs with product managers to map feature requirements to user goals. Identified experience gaps early.'],
          ['02','User Flow Mapping','Mapped end-to-end user journeys for each module — identifying decision points, edge cases, and error states before UI.'],
          ['03','Wireframing','Low and mid-fidelity wireframes to validate information architecture and workflow logic with stakeholders.'],
          ['04','High-Fidelity UI','Full visual design in Figma using the platform design system — responsive dashboards, data-heavy tables, AI interaction panels.'],
          ['05','Prototype & Dev Handoff','Interactive prototypes with annotated specs and component documentation for accurate implementation.'],
          ['06','Iteration','Post-launch feedback integrated into rapid design iteration cycles — contributing to faster product delivery.'],
        ]} />
      </div>

      <div className="cs-block reveal" id="decisions">
        <div className="cs-block-label">Key Decisions</div>
        <div className="cs-block-title">Design decisions that mattered</div>
        <BulletList items={[
          '<strong>AI transparency first:</strong> Agentic AI actions shown in an auditable activity log. Users can see what the AI did, why, and undo any action — building trust over time.',
          '<strong>Progressive complexity:</strong> Complex ESG workflows surface only information relevant to the current step. Advanced options are accessible but don\'t dominate the default view.',
          '<strong>Reducing decision fatigue:</strong> AI-suggested actions clearly differentiated from user-initiated actions — users feel in control while AI handles repetitive data tasks.',
          '<strong>Supply assessment simplification:</strong> Reduced a 40+ field supplier questionnaire to an adaptive form showing only relevant questions based on supplier category.',
          '<strong>Dashboard hierarchy:</strong> Executive-level dashboards prioritise trend data and compliance scores. Manager-level views surface task queues and pending approvals.',
        ]} />
      </div>

      <div className="cs-block reveal" id="design-system">
        <div className="cs-block-label">Design System</div>
        <div className="cs-block-title">Building for scale</div>
        <p className="cs-block-text">One of my key contributions was establishing and expanding the platform's design system — a library of reusable components, tokens, and patterns that allowed the team to ship new features faster without sacrificing visual consistency.</p>
        <BulletList items={[
          'Defined and documented a token-based colour and typography system aligned with WCAG 2.1 accessibility standards',
          'Built a comprehensive component library covering form elements, data tables, status indicators, AI activity cards, and dashboard widgets',
          'Created pattern documentation for empty states, loading states, error handling, and bulk actions',
          'Design system adoption reduced per-feature design time by enabling rapid composition from existing components',
        ]} />
        <ToolRow tools={['Figma','Design Systems','WCAG 2.1','Component Library','Prototyping','Design Tokens']} />
      </div>

      <div className="cs-block reveal" id="outcome">
        <div className="cs-block-label">Outcome</div>
        <div className="cs-block-title">Impact delivered</div>
        <MetricStrip metrics={[['2','Modules shipped'],['↑','Client engagement'],['↑','Platform adoption'],['Faster','Design delivery']]} />
        <p className="cs-block-text">The Agentic AI and Supply Assessment modules were shipped from concept to production. Client engagement and platform adoption increased following launch. The scalable design system now supports faster design-to-dev cycles across all new feature development.</p>
      </div>
    </ProjectPage>
  );
}
