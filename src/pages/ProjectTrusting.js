import React from 'react';
import ProjectPage, { MetricStrip, Steps, ToolRow, Highlight, BulletList } from '../components/ProjectPage';

export default function ProjectTrusting() {
  return (
    <ProjectPage
      accentBg="linear-gradient(150deg, #F0EEE9 0%, #F7F6F3 70%)"
      tags={['Mobile App', 'UX Research', 'Figma', 'Agile']}
      title="TrustIn News"
      desc="A customised regional news and job discovery platform helping readers and job seekers get relevant local news and openings — designed end-to-end as a solo UX project in under 4 months."
      heroStats={[['<4', 'Months to ship'], ['Solo', 'UX Lead'], ['Mobile', 'Platform'], ['2024', 'Year']]}
      toc={[['overview','Overview'],['problem','Problem'],['research','Research'],['process','Design Process'],['decisions','Key Decisions'],['outcome','Outcome'],['learnings','Learnings']]}
      nextTitle="ESG Management Platform"
      nextTo="/portfolio/esg-platform"
    >
      <div className="cs-block reveal" id="overview">
        <div className="cs-block-label">Overview</div>
        <div className="cs-block-title">What is TrustIn News?</div>
        <p className="cs-block-text">TrustIn News is a personalised regional news and job discovery mobile app designed for readers who feel underserved by national-first news aggregators. The platform surfaces hyper-local news stories and district-level job openings in one unified feed — customised by the user's language preference, district, and interest topics.</p>
        <p className="cs-block-text">This was a self-initiated project I led from concept to high-fidelity prototype, managing the full design process under an Agile framework.</p>
      </div>

      <div className="cs-block reveal" id="problem">
        <div className="cs-block-label">Problem</div>
        <div className="cs-block-title">What problem were we solving?</div>
        <p className="cs-block-text">Regional news consumers in smaller Indian cities and districts lacked a platform that surfaced genuinely local content alongside relevant job opportunities. Major news apps optimise for national audiences — leaving regional readers with irrelevant feeds and zero job discovery.</p>
        <Highlight>Core tension: How do we give users control over their feed without overwhelming them with settings — keeping the experience fast and intuitive for on-the-go reading?</Highlight>
        <BulletList items={[
          'Existing aggregators are national-first; regional content is buried',
          'No platform combined news + local job openings in one experience',
          'Users in smaller districts felt the news was "not for them"',
          'Job discovery required switching between multiple apps and portals',
        ]} />
      </div>

      <div className="cs-block reveal" id="research">
        <div className="cs-block-label">Research</div>
        <div className="cs-block-title">Understanding users</div>
        <p className="cs-block-text">I conducted structured UX research across four methods to build a clear picture of users' needs, behaviours, and frustrations:</p>
        <BulletList items={[
          '<strong>Competitor analysis</strong> — Reviewed InShorts, NewsPoint, Google News, and Naukri to identify gaps in regional personalisation and local job discovery.',
          '<strong>Empathy mapping</strong> — Mapped what users say, think, feel, and do around news consumption to surface deeper emotional needs.',
          '<strong>User persona creation</strong> — Defined two primary personas: the Regional Reader (25–40, daily commuter) and the Active Job Seeker (21–30, seeking district-level opportunities).',
          '<strong>User journey mapping</strong> — Traced current-state journeys to identify pain points: app-switching, missing local context, and absent job alerts.',
        ]} />
      </div>

      <div className="cs-block reveal" id="process">
        <div className="cs-block-label">Design Process</div>
        <div className="cs-block-title">How I designed it</div>
        <Steps steps={[
          ['01','Research & Discovery','Competitor analysis, empathy mapping, persona creation, and user journey mapping to define the problem space.'],
          ['02','Ideation & Sketching','Rapid paper sketches exploring feed customisation models, onboarding flows, and navigation patterns.'],
          ['03','Wireframing','Low-fidelity Figma wireframes covering 12 key screens — onboarding, home feed, topic selection, article view, and job discovery.'],
          ['04','High-Fidelity Prototype','Full visual design with interaction flows, micro-animations, and responsive layout — optimised for one-handed mobile use.'],
          ['05','User Testing','Tested with 6 participants across two personas. Iterated on feed setup flow and job card hierarchy based on feedback.'],
        ]} />
      </div>

      <div className="cs-block reveal" id="decisions">
        <div className="cs-block-label">Key Decisions</div>
        <div className="cs-block-title">Design decisions that mattered</div>
        <BulletList items={[
          '<strong>Progressive onboarding:</strong> 3-step setup asked only for district and language first — topics refined later. This reduced onboarding drop-off.',
          '<strong>Unified feed:</strong> News and jobs in one scrollable feed with a clear visual language differentiating card types — no context-switching fatigue.',
          '<strong>Bottom-thumb navigation:</strong> All primary actions in the bottom 40% of the screen for one-hand reachability — critical for commuter use.',
          '<strong>Language-first filtering:</strong> News displayed in the user\'s preferred regional language by default — trust built by speaking to users in their language.',
        ]} />
        <ToolRow tools={['Figma','User Research','Empathy Mapping','Prototyping','User Testing','Agile']} />
      </div>

      <div className="cs-block reveal" id="outcome">
        <div className="cs-block-label">Outcome</div>
        <div className="cs-block-title">Results &amp; impact</div>
        <MetricStrip metrics={[['<4','Months shipped'],['12+','Screens designed'],['6','User tests run'],['100%','Mobile responsive']]} />
        <p className="cs-block-text">The project generated public interest and demonstrated the viability of a hyperlocal-first news model. The prototype was shared with potential investors and received positive reception for its simplicity and focus on underserved regional audiences.</p>
      </div>

      <div className="cs-block reveal" id="learnings">
        <div className="cs-block-label">Learnings</div>
        <div className="cs-block-title">What I took away</div>
        <BulletList items={[
          'Progressive disclosure in onboarding dramatically reduces setup friction — asking for everything upfront creates abandonment.',
          'Visual differentiation between content types within a unified feed relies heavily on card hierarchy and iconography.',
          'User testing with just 6 participants surfaces the majority of critical usability issues — perfectionism in research delays iteration.',
        ]} />
      </div>
    </ProjectPage>
  );
}
