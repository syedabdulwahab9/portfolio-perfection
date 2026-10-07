import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CvDownload } from "@/components/cv-download";
import { cvProfile } from "@/data/cv";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "Syed Abdul Wahab - Complete Portfolio · CV" },
      { name: "description", content: "Professional CV of Syed Abdul Wahab, a Python Developer and digital builder." },
      { property: "og:title", content: "Syed Abdul Wahab - Complete Portfolio · CV" },
      { property: "og:description", content: "Python development, backend technologies, selected projects, skills and education." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CvPage,
});

function CvPage() {
  return (
    <main className="cv-page">
      <header className="cv-nav">
        <Link to="/" className="cv-back"><ArrowLeft /> Portfolio</Link>
        <CvDownload className="cv-download-small" />
      </header>

      <section className="cv-masthead">
        <div>
          <p className="cv-eyebrow">Curriculum Vitae · 2026</p>
          <h1>Syed Abdul<br /><em>Wahab.</em></h1>
        </div>
        <div className="cv-role-block">
          <p>Current role</p>
          <h2>{cvProfile.role}</h2>
          <span>{cvProfile.location}</span>
        </div>
      </section>

      <section className="cv-intro">
        <p className="cv-section-number">01 / Profile</p>
        <p className="cv-summary">{cvProfile.summary}</p>
        <div className="cv-contact-links">
          <a href={`mailto:${cvProfile.email}`}><Mail /> {cvProfile.email}</a>
          <CvDownload>Download one-page CV</CvDownload>
        </div>
      </section>

      <section className="cv-grid-section">
        <div className="cv-main-column">
          <div className="cv-section-title"><span>02</span><h2>Selected projects</h2></div>
          <div className="cv-projects">
            {cvProfile.projects.map((project, index) => (
              <article className="cv-project" key={project.name}>
                <span>0{index + 1}</span>
                <div><p>{project.type}</p><h3>{project.name}</h3><p className="cv-description">{project.description}</p></div>
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ArrowUpRight /></a>
              </article>
            ))}
          </div>

          <div className="cv-section-title cv-title-spaced"><span>03</span><h2>Education</h2></div>
          <div className="cv-education">
            {cvProfile.education.map((item) => (
              <div key={item.stage}><p>{item.stage}</p><h3>{item.institution}</h3></div>
            ))}
          </div>
        </div>

        <aside className="cv-side-column">
          <div className="cv-section-title"><span>04</span><h2>Technical stack</h2></div>
          <div className="cv-stack">
            {cvProfile.stack.map((group) => (
              <div key={group.label}><p>{group.label}</p><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>
            ))}
          </div>
          <div className="cv-section-title cv-title-spaced"><span>05</span><h2>Strengths</h2></div>
          <ul className="cv-strengths">{cvProfile.strengths.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </aside>
      </section>

      <section className="cv-closing">
        <p>Available now</p>
        <h2>Ready to build<br /><span>what matters.</span></h2>
        <p>{cvProfile.availability}</p>
        <div>
          <Button asChild variant="portfolio"><a href={`mailto:${cvProfile.email}`}><Mail /> Start a conversation</a></Button>
          <CvDownload variant="portfolioOutline">Download CV</CvDownload>
        </div>
      </section>
      <footer className="cv-footer"><span>{cvProfile.name}</span><span>Python Developer</span><span>India / Worldwide</span></footer>
    </main>
  );
}