import React from 'react';
import ProjectPage, { ToolRow, BulletList, Steps } from '../components/ProjectPage';

export default function ProjectWarehouse() {
  return (
    <ProjectPage
      accentBg="linear-gradient(150deg, #E6F1FB 0%, #F7F6F3 70%)"
      tags={['ReactJS', 'Material UI', 'Front-end', 'Internship']}
      title="Smart Warehouse Dashboard"
      desc="A responsive warehouse management dashboard built with ReactJS and Material UI during a front-end development internship at RDL Technologies — covering Inventory, Product Info, and Invoicing modules."
      heroStats={[['3', 'Modules built'], ['ReactJS', 'Stack'], ['Responsive', 'Design'], ['2023', 'Year']]}
      toc={[['overview','Overview'],['role','My Role'],['modules','Modules Built'],['process','Process'],['outcome','Outcome']]}
      nextTitle="TrustIn News"
      nextTo="/portfolio/trusting-news"
    >
      <div className="cs-block reveal" id="overview">
        <div className="cs-block-label">Overview</div>
        <div className="cs-block-title">About the project</div>
        <p className="cs-block-text">During my front-end development internship at RDL Technologies (June–September 2023), I contributed to the development of a Smart Warehouse Management System — a responsive web dashboard for managing inventory, products, and invoicing in a modern warehouse environment.</p>
        <p className="cs-block-text">The project was built with ReactJS and Material UI, and required close collaboration between the design and development teams to deliver a consistent, usable interface across all modules.</p>
      </div>

      <div className="cs-block reveal" id="role">
        <div className="cs-block-label">My Role</div>
        <div className="cs-block-title">Front-end Developer + Design Collaborator</div>
        <BulletList items={[
          'Developed responsive dashboard shell and layout architecture using ReactJS',
          'Implemented Material UI component library for consistent design across all views',
          'Collaborated with the design team to improve usability and interface consistency',
          'Contributed to module-level feature development for Inventory, Product Info, and Invoicing',
          'Participated in code reviews and daily standups with the broader engineering team',
        ]} />
      </div>

      <div className="cs-block reveal" id="modules">
        <div className="cs-block-label">Modules Built</div>
        <div className="cs-block-title">What I contributed to</div>
        <BulletList items={[
          '<strong>Inventory Module:</strong> Real-time stock level views, low-stock alerts, and category-based filtering. Built sortable, searchable data tables with Material UI DataGrid.',
          '<strong>Product Info Module:</strong> Product catalogue with detailed views, image management, and SKU tracking. Implemented responsive card and list view toggle.',
          '<strong>Invoicing Module:</strong> Invoice generation, line-item management, and status tracking (draft, sent, paid, overdue). Built with React state management for dynamic line item addition.',
        ]} />
      </div>

      <div className="cs-block reveal" id="process">
        <div className="cs-block-label">Process</div>
        <div className="cs-block-title">How I worked</div>
        <Steps steps={[
          ['01','Design Handoff Review','Reviewed Figma designs from the design team, flagging implementation concerns and suggesting feasibility improvements.'],
          ['02','Component Development','Built reusable React components mapped to Material UI component system — ensuring consistency and maintainability.'],
          ['03','Responsive Implementation','Used Material UI responsive grid system to deliver consistent experiences across desktop, tablet, and mobile viewports.'],
          ['04','Usability Collaboration','Worked directly with the design team to identify and resolve usability issues discovered during development — bridging the design-dev gap.'],
        ]} />
        <ToolRow tools={['ReactJS', 'Material UI', 'JavaScript', 'HTML/CSS', 'Responsive Design', 'Git']} />
      </div>

      <div className="cs-block reveal" id="outcome">
        <div className="cs-block-label">Outcome</div>
        <div className="cs-block-title">What was delivered</div>
        <BulletList items={[
          'Fully functional, responsive warehouse management dashboard across 3 core modules',
          'Consistent component usage across all views through Material UI standardisation',
          'Improved usability through direct design-dev collaboration during the build phase',
          'Strong foundation in bridging design specifications with production-grade React implementation',
        ]} />
        <p className="cs-block-text" style={{marginTop:'16px'}}>This internship significantly strengthened my understanding of how design decisions translate into code — a perspective that directly informs my UI/UX design work today. I now design with implementation in mind, which consistently improves handoff quality and reduces back-and-forth with developers.</p>
      </div>
    </ProjectPage>
  );
}
