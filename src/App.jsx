import React, { useState, useEffect } from "react";
import "./App.css";
import { links, experience, skills, tools, education } from "./resumeData";

const accent = "text-[#FF3B30]";
const accentBg = "bg-[#FF3B30]";

// Red dot matrix pattern (13x7 like Nothing)
function DotMatrix({ className = "", rows = 7, cols = 13, glowDots = [] }) {
  return (
    <div
      className={`inline-grid gap-1.5 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const isGlow = glowDots.includes(i);
        return (
          <div
            key={i}
            className={`h-[3px] w-[3px] rounded-full transition-all duration-1000 ${isGlow
              ? `${accentBg} shadow-[0_0_4px_rgba(255,59,48,0.6)]`
              : `${accentBg} opacity-30`
              }`}
          />
        );
      })}
    </div>
  );
}

function DotBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-[11px] font-medium text-neutral-300 backdrop-blur-sm">
      <span className={`h-1 w-1 rounded-full ${accentBg}`} />
      {label}
    </span>
  );
}

function Widget({ title, children, className = "", showDots = false, ...rest }) {
  const [glowDots, setGlowDots] = useState([]);

  useEffect(() => {
    if (!showDots) return;

    const interval = setInterval(() => {
      const randomDots = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 91)
      );
      setGlowDots(randomDots);
    }, 2500);

    return () => clearInterval(interval);
  }, [showDots]);

  return (
    <section
      {...rest}
      className={`group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm px-6 py-7 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all hover:shadow-xl sm:px-7 sm:py-8 ${className}`}
    >
      <div className="relative mb-5 flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
          {title}
        </p>
        {showDots && (
          <DotMatrix
            rows={7}
            cols={13}
            glowDots={glowDots}
            className="hidden xl:inline-grid"
          />
        )}
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}

/* ------------------- ABOUT PAGE (personal view) ------------------- */

function AboutPage({ onBack }) {
  // Update this to your actual image file path in public/, e.g. /me.jpg
  const profilePhoto = "/me.jpeg"; // put your photo as public/me.jpeg

  const aboutSocials = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    {
      label: "Instagram",
      href: "https://www.instagram.com/alwaystheartistneverthemuse/",
    },
    {
      label: "Pinterest",
      href: "https://in.pinterest.com/alwaystheartistneverthemuse_/",
    },
    { label: "VSCO", href: "https://vsco.co/saman-r/gallery" },
  ];

  const personalitySnippets = [
    "📷 Chasing light, shadows & textures",
    "🎧 Late-night tech & design video rabbit holes",
    "🍜 Judging food presentation like it’s UI",
    "✍🏽 Writing lines no one will ever read",
  ];

  return (
    <section
      id="about-page"
      className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] lg:gap-12"
    >
      {/* Left: photo / socials / tiny bio */}
      <div className="space-y-5">
        {/* Photo card */}
        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              This is me
            </span>
            <DotMatrix rows={4} cols={10} glowDots={[]} />
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-900">
            <img
              src={profilePhoto}
              alt="Saman Rahman"
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                // graceful fallback if image not found yet
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="mt-3 space-y-1 text-xs text-neutral-400">
            <p className="font-mono uppercase tracking-[0.16em] text-[10px] text-neutral-500">
              Photography · UI · Gadgets
            </p>
            <p>
              I like capturing quiet corners, dramatic light and tiny details most people
              scroll past.
            </p>
          </div>
        </div>

        {/* Socials under photo */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5">
          <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            Visual playgrounds
          </p>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {aboutSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-neutral-300 transition hover:border-[#FF3B30]/70 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right: fun about content */}
      <div className="space-y-5">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
              About Saman, the human
            </p>
            <h2 className="text-xl font-semibold text-neutral-50 sm:text-2xl">
              More than just a dev resume.
            </h2>
          </div>
          <button
            onClick={onBack}
            className="hidden rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-300 transition hover:border-neutral-500 sm:inline-flex"
          >
            ← Back to Home
          </button>
        </div>

        {/* Main intro card */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5 space-y-3 text-sm text-neutral-300">
          <p>
            I&apos;m Saman — a developer who loves building{" "}
            <span className={accent}>clean, thoughtful interfaces</span> and experiences
            that actually feel good to use. I care a lot about how things look, but even
            more about how they feel when you tap, scroll and live with them.
          </p>
          <p>
            I&apos;m also a big fan of{" "}
            <span className={accent}>Nothing&apos;s design language</span> — the
            dot-matrix vibe, the subtle motion, the customization without chaos. This
            portfolio is basically me having fun with that obsession.
          </p>
        </div>

        {/* Why I build */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5 text-sm text-neutral-300 space-y-3">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-neutral-400">
            Why I build
          </p>
          <p>
            I don&apos;t just like writing code — I like watching an idea turn into
            something someone can actually use. I think a lot about friction, about flow,
            about how a screen feels at 2am when you&apos;re tired but still staring at it.
          </p>
          <p>
            Good design, to me, is quiet confidence. It doesn&apos;t shout; it just feels
            right. That&apos;s the energy I try to carry into every project I touch.
          </p>
        </div>

        {/* When I'm not coding + Right now I'm into */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* When I'm not coding */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5 text-xs text-neutral-300 space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400">
              When I&apos;m not coding
            </p>
            <div className="grid gap-2">
              {personalitySnippets.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-2"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right now I'm into */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5 text-xs text-neutral-300 space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400">
              Right now I&apos;m into
            </p>
            <ul className="space-y-1.5">
              <li>• Tweaking layouts until every pixel feels intentional</li>
              <li>• Building tiny tools that automate boring workflows</li>
              <li>• Exploring AI + UI combos that actually help humans (not just buzzwords)</li>
              <li>• Learning more about motion, micro-interactions and design systems</li>
            </ul>
          </div>
        </div>

        {/* Mobile back button */}
        <div className="space-y-2">
          <button
            onClick={onBack}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-300 transition hover:border-neutral-500 sm:hidden"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}



/* ---------------------- FOOTER COMPONENT ---------------------- */

function Footer() {
  return (
    <footer className="mt-12 flex items-center justify-between border-t border-neutral-900 pt-4 text-[11px] text-neutral-500">
      <span className="font-mono uppercase tracking-[0.18em]">
        Saman <span className="text-neutral-400">Rahman</span>{" "}
        <span className="text-neutral-600">
          · Last updated: {new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </span>
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
      </div>

      <span className="hidden sm:inline font-mono uppercase tracking-[0.18em] text-neutral-600">
        React · Tailwind · Vite 
      </span>
    </footer>
  );
}


/* ---------------------- MAIN APP ---------------------- */

export default function App() {
  const [page, setPage] = useState("home"); // 'home' | 'about'

  const handleNavClick = (item) => {
    // --- OPEN ABOUT PAGE ---
    if (item === "More") {
      setPage("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // --- ALWAYS RETURN TO HOME FOR THESE ---
    setPage("home");

    const id =
      item === "Home"
        ? "about" // your hero section id
        : item === "Experience"
          ? "experience"
          : item === "Skills"
            ? "skills"
            : item === "Contact"
              ? "contact"
              : null;

    setTimeout(() => {
      if (id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Subtle dotted background */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[length:60px_60px] opacity-25" />

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:gap-12">
        {/* Top bar */}
        <header className="mb-4 flex items-center justify-between gap-4 rounded-full border border-neutral-800 bg-neutral-950/80 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
            <span>Portfolio</span>
          </div>
          <nav className="hidden gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 sm:flex">
            {["Home", "Experience", "Skills", "Contact", "More"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`rounded-full px-3 py-1 transition ${(page === "about" && item === "More") ||
                    (page === "home" && item === "Home")
                    ? "bg-neutral-800 text-neutral-100"
                    : "hover:bg-neutral-800 hover:text-neutral-100"
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className={`hidden items-center gap-2 rounded-full ${accentBg} px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-lg sm:inline-flex`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Hire Me
          </button>
        </header>

        {page === "about" ? (
          /* ------------------ ABOUT PAGE VIEW ------------------ */
          <>
            <AboutPage onBack={() => setPage("home")} />
            <Footer />
          </>
        ) : (
          /* ------------------ HOME / PORTFOLIO VIEW ------------------ */
          <>
            {/* Main grid */}
            <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] lg:gap-12">
              {/* Left column */}
              <div className="flex flex-col gap-8">
                {/* Hero */}
                <Widget title="About" id="about" showDots={true} className="relative">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <DotBadge label="Web Developer · MERN Stack" />
                      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.5rem]">
                        Saman <span className={accent}>Rahman</span>
                      </h1>
                      <p className="max-w-xl text-sm leading-relaxed text-neutral-300">
                        Full Stack MERN developer with industry experience building AI-powered
                        automation and analytics solutions using React, Python, PostgreSQL, Tailwind,
                        and modern UI design.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-950/30 px-4 py-2 backdrop-blur-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                          Available for Hire
                        </span>
                      </div>
                      <button
                        onClick={() => window.open(links.linkedin, "_blank")}
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-[11px] font-medium text-neutral-300 backdrop-blur-sm transition hover:border-neutral-700 hover:text-neutral-100"
                      >
                        <span>View LinkedIn</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </Widget>

                {/* Experience */}
                <Widget title="Experience" id="experience">
                  <div className="space-y-6">
                    {experience.map((job, idx) => (
                      <div
                        key={job.company}
                        className={`rounded-2xl border border-neutral-800/70 bg-neutral-900/60 px-5 py-4 text-neutral-100 ${idx === 0
                          ? "border-[#FF3B30]/60 shadow-[0_0_0_1px_rgba(255,59,48,0.4)]"
                          : ""
                          }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                              {job.period}
                            </p>
                            <h3 className="text-sm font-semibold">
                              {job.role} ·{" "}
                              <span className="text-neutral-300">{job.company}</span>
                            </h3>
                          </div>
                          <span className="mt-1 inline-flex h-6 items-center rounded-full border border-neutral-700 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-300">
                            {idx === 0 ? "AI + Full Stack" : "Web"}
                          </span>
                        </div>
                        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-neutral-300">
                          {job.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Widget>

                {/* Skills */}
                <Widget title="Skills" id="skills" showDots={true}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {Object.entries(skills).map(([group, list]) => (
                      <div
                        key={group}
                        className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-4"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                          {group}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {list.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-neutral-800/80 px-2.5 py-1 text-[11px] text-neutral-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Widget>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-8">
                {/* Contact */}
                <Widget title="Contact" id="contact" showDots={true}>
                  <div className="space-y-4 text-sm">
                    <p className="text-xs text-neutral-300">
                      Based in{" "}
                      <span className="font-medium text-neutral-100">
                        Chennai, Tamil Nadu, IN
                      </span>
                    </p>

                    <div className="flex flex-col gap-3 text-xs">
                      <a
                        href={links.email}
                        className="flex items-center justify-between rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 hover:border-[#FF3B30]/70"
                      >
                        <span className="font-medium uppercase tracking-[0.16em]">
                          Email
                        </span>
                        <span className="truncate text-neutral-300">
                          samanrahman927@gmail.com
                        </span>
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs">
                      <a
                        href={links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-center text-neutral-300 hover:border-[#FF3B30]/70"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-2xl border border-neutral-700 bg-neutral-900 px-4 py-2.5 text-center text-neutral-300 hover:border-[#FF3B30]/70"
                      >
                        GitHub
                      </a>
                    </div>

                    <button
                      onClick={() => (window.location.href = links.email)}
                      className={`mt-1 flex w-full items-center justify-center gap-2 rounded-2xl ${accentBg} px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-lg`}
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                      Send a message
                    </button>
                  </div>
                </Widget>

                {/* Tools */}
                <Widget title="Tools & Tech">
                  <div className="space-y-3 text-xs text-neutral-300">
                    {Object.entries(tools).map(([group, list]) => (
                      <div
                        key={group}
                        className="rounded-2xl border border-neutral-800/70 bg-neutral-900/60 p-4"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                          {group}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {list.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-neutral-800/80 px-2.5 py-1 text-[11px] text-neutral-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Widget>

                {/* Education */}
                <Widget title="Education">
                  <div className="space-y-3 text-xs text-neutral-300">
                    {education.map((ed) => (
                      <div
                        key={ed.degree}
                        className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-4"
                      >
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                          {ed.period}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-neutral-100">
                          {ed.degree}
                        </p>
                        <p className="text-[11px] text-neutral-300">{ed.inst}</p>
                        <p className="mt-1 text-[11px] text-neutral-400">{ed.detail}</p>
                      </div>
                    ))}
                  </div>
                  </Widget>
                  {/* === ABOUT CTA STRIP (HIGHLIGHTED) === */}
                  <div className="relative mt-10 flex items-center justify-center">
                    {/* soft glow ring */}
                    <div className="absolute h-20 w-80 rounded-full bg-[#FF3B30]/10 blur-2xl" />

                    <button
                      onClick={() => {
                        setPage("about");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="group relative flex items-center gap-4 rounded-full border border-[#FF3B30]/40 bg-neutral-950 px-7 py-3.5 text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-100 shadow-[0_0_0_1px_rgba(255,59,48,0.35)] transition hover:border-[#FF3B30] hover:shadow-[0_0_30px_rgba(255,59,48,0.25)]"
                    >
                      {/* red status dot */}
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3B30]" />

                      <span className="text-neutral-200">
                        Wanna know me more?
                      </span>

                      {/* Arrow badge */}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF3B30] text-[13px] text-white transition group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>

              </div>
            </div>
            
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}
