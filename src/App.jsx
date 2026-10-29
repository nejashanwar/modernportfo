import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Mail, Menu, X, ArrowUp } from "lucide-react";
import Contact from "./Contact";
import Projects from "./Projects";
import Experience from "./Experience";
import profilePhoto from "./assets/profile_photo.jpg";

/* ---------- Animation helper ---------- */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay },
});

/* ---------- Data ---------- */
const links = [
  ["about", "About"],
  ["stack", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["ask", "Ask Me"],
  ["contact", "Contact"],
];

const roles = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
];

const petals = ["🌸", "🌷", "🌼", "🌺", "🌻", "🌸", "🌷"];

const about = [
  ["💼", "Software Engineer", "I build complete, end-to-end applications"],
  ["🧠", "Critical thinker", "I break complex problems into simple, elegant solutions"],
  ["📋", "Project manager", "I lead teams, plan sprints and deliver on time"],
  ["🗂️", "Requirements engineer", "I turn real user needs into clear, testable requirements"],
  ["🗄️", "Database designer", "I model data carefully so systems stay fast and reliable"],
  ["📱", "Mobile App developer", "I create Android apps people enjoy using"],
  ["🤖", "AI & ML learner", "I explore intelligent systems and bring them into real software"],
  ["✅", "Quality-focused", "Strong believer in testing and clean, maintainable code"],
];

const stack = [
  ["💻", "Programming Languages", ["JavaScript", "PHP", "Java", "C++", "Python"]],
  ["🎨", "Frontend", ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]],
  ["⚙️", "Backend", ["PHP", "Java", "Python", "REST APIs"]],
  ["📱", "Mobile App Development", ["Android", "Android Studio", "Java"]],
  ["🗄️", "Database Design", ["SQL", "Data Modeling", "ER Diagrams"]],
  ["📝", "Requirements Engineering", ["Elicitation", "System Analysis", "Documentation"]],
  ["🤖", "AI & Machine Learning", ["ML Fundamentals", "Python", "Intelligent Systems"]],
  ["📊", "Management", ["Project Management", "Team Leadership", "Cost Accounting", "Business Analysis"]],
  ["🧠", "Professional Skills", ["Testing & QA", "Critical Thinking", "Communication", "Problem Solving"]],
];

const askMe = [
  "🌐 Full-stack web development (HTML • CSS • JS • PHP)",
  "📱 Android & mobile app development",
  "🗄️ Database design, SQL and data modeling",
  "📝 Requirements engineering & system analysis",
  "🤖 AI & machine learning fundamentals",
  "☕ Java, 🔷 C++, 🐍 Python projects",
  "📋 Project management & team leadership",
  "✅ Testing strategies & quality assurance",
];

/* ---------- Hooks ---------- */
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}

/* ---------- Small components ---------- */
const Title = ({ children }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose">
      {children}
    </h2>
    <span className="block w-20 h-1 rounded-full bg-gradient-to-r from-petal to-rose mx-auto mt-4" />
  </div>
);

function Rotator({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="inline-block font-bold text-rose"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection([
    "top", "about", "stack", "experience", "projects", "ask", "contact",
  ]);

  const linkClass = (id) =>
    `relative text-sm font-medium transition-colors duration-300 hover:text-rose
     after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-rose
     after:transition-all after:duration-300
     ${active === id ? "text-rose after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 border-b ${
        scrolled
          ? "bg-blush/90 shadow-md shadow-rose/10 border-petal/50"
          : "bg-blush/60 border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-bold text-rose hover:text-deep transition-colors"
        >
          🌺 Nejash Anwar
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={linkClass(id)}>
              {label}
            </a>
          ))}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 rounded-full bg-petal/50 text-deep hover:bg-rose hover:text-white active:scale-90 transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-blush/95 border-t border-petal/40"
          >
            <div className="flex flex-col px-6 py-2">
              {links.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`py-3 border-b border-petal/30 last:border-0 font-medium transition-colors ${
                    active === id ? "text-rose" : "text-deep hover:text-rose"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


function BackToTop() {
  const show = useScrolled(500);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed bottom-5 right-5 z-40 p-3 rounded-full bg-gradient-to-r from-rose to-deep text-white shadow-lg shadow-rose/40 hover:-translate-y-1 active:scale-90 transition"
        >
          <ArrowUp size={20} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ---------- App ---------- */

  export default function App() {

  const { scrollYProgress } = useScroll();
  const scaleX= useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [cvOpen, setCvOpen] = useState(false);   // <-- kana ida'i





  useEffect(() => {
  const onKey = (e) => e.key === "Escape" && setCvOpen(false);
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

  return (
    <main className="min-h-screen bg-blush text-deep">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-petal via-rose to-deep"
      />

      <Navbar />
      <BackToTop />

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        {/* floating flowers */}
        {petals.map((p, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute select-none animate-float opacity-50"
            style={{
              left: `${6 + i * 14}%`,
              top: `${8 + (i % 3) * 28}%`,
              fontSize: `${1.4 + (i % 3) * 0.8}rem`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {p}
          </span>
        ))}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 text-center">
          <motion.p {...fade(0)} className="text-base sm:text-lg font-medium">
            🌺 Hello, I'm
          </motion.p>
  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-6">
  <img
    src={profilePhoto}
    alt="Profile"
    className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-petal shadow-lg shadow-rose/20"
  />

  <motion.h1
    {...fade(0.1)}
    className="text-center sm:text-left text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-rose via-deep to-rose bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent"
  >
    Nejash Anwar Yusuf
  </motion.h1>
</div>

          <motion.p {...fade(0.2)} className="mt-4 text-xl sm:text-2xl font-semibold">
            Software Engineer
          </motion.p>

          <motion.p {...fade(0.25)} className="mt-2 text-lg sm:text-xl">
            I'm a <Rotator words={roles} />
          </motion.p>

          <motion.p {...fade(0.3)} className="mt-2 text-xs sm:text-sm font-medium text-rose tracking-wide">
            Software Engineering (5th year) • Management (3rd year)
          </motion.p>

          <motion.p {...fade(0.35)} className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-deep/80 leading-relaxed">
            I design, build, test and manage complete software solutions — from
            pixel to production.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fade(0.4)}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
        

<a
              href="#projects"
              className="px-7 py-3 rounded-full border-2 border-rose text-rose font-semibold hover:bg-rose hover:text-white hover:-translate-y-0.5 active:scale-95 transition"
            >
              View My Work
            </a>
<button
  onClick={() => setCvOpen(true)}
  className="px-7 py-3 rounded-full bg-white border-2 border-petal text-deep font-semibold shadow-md hover:bg-petal/40 hover:-translate-y-0.5 active:scale-95 transition"
>
  📄 View CV
</button>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border-2 border-rose text-rose font-semibold hover:bg-rose hover:text-white hover:-translate-y-0.5 active:scale-95 transition"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Frontend + Backend = Full-Stack */}
          <motion.div
            {...fade(0.1)}
            className="mt-14 rounded-3xl bg-white border border-petal shadow-xl shadow-rose/10 overflow-hidden hover:shadow-2xl hover:shadow-rose/20 transition-shadow duration-300"
          >
            <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch">
              <div className="p-6 sm:p-8 text-left">
                <div className="text-4xl">🎨</div>
                <h3 className="mt-2 text-xl font-bold text-rose">Frontend</h3>
                <p className="mt-2 text-sm text-deep/80">
                  Beautiful, responsive interfaces people love to use.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["HTML", "CSS", "JavaScript", "React", "Tailwind"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-petal/40 text-xs font-medium hover:bg-rose hover:text-white transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center text-4xl font-bold text-rose py-1 md:py-0 md:px-2">
                +
              </div>

              <div className="p-6 sm:p-8 text-left">
                <div className="text-4xl">⚙️</div>
                <h3 className="mt-2 text-xl font-bold text-rose">Backend</h3>
                <p className="mt-2 text-sm text-deep/80">
                  Reliable logic, APIs and databases behind every screen.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["PHP", "Java", "Python", "SQL", "REST"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-petal/40 text-xs font-medium hover:bg-rose hover:text-white transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose to-deep text-white px-6 sm:px-8 py-6 text-center">
              <p className="text-xs sm:text-sm tracking-[0.3em]">= TOGETHER =</p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
                🌺 Full-Stack Developer
              </h3>
              <p className="mt-2 text-sm sm:text-base max-w-xl mx-auto text-white/90">
                I connect beautiful interfaces with reliable systems, so one
                person can take an idea from pixel to production.
              </p>
            </div>
          </motion.div>

          <p className="mt-10 text-sm sm:text-base tracking-widest">
            🌸 ✿ ❀ 🌷 ✿ ❀ 🌼 ✿ ❀ 🌺 ✿ ❀ 🌻 ✿ ❀ 🌸
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <a
              href="https://github.com/nejashanwar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-petal/60 text-xl hover:bg-rose hover:text-white hover:-translate-y-1 hover:rotate-6 active:scale-90 transition"
            >
              <FaGithub />
            </a>
            <a
              href="#contact"
              aria-label="Contact"
              className="p-3 rounded-full bg-petal/60 hover:bg-rose hover:text-white hover:-translate-y-1 hover:-rotate-6 active:scale-90 transition"
            >
              <Mail />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-4 sm:px-6 py-16 sm:py-20 max-w-5xl mx-auto">
        <Title>🌸 About Me</Title>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {about.map(([icon, head, text], i) => (
            <motion.div
              key={head}
              {...fade(i * 0.06)}
              className="group flex gap-4 bg-white rounded-2xl p-5 border border-petal/60 hover:border-rose hover:shadow-xl hover:shadow-rose/10 hover:-translate-y-1.5 transition duration-300"
            >
              <span className="text-3xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">
                {icon}
              </span>
              <p className="text-sm sm:text-base leading-relaxed">
                <b className="text-rose">{head}:</b>{" "}
                <span className="text-deep/80">{text}</span>
              </p>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-10 text-base sm:text-lg font-medium">
          🌱 Always learning, always building, always blooming
        </p>
      </section>

      {/* STACK */}
      <section id="stack" className="px-4 sm:px-6 py-16 sm:py-20 bg-white/60">
        <div className="max-w-5xl mx-auto">
          <Title>🌷 Tech Stack & Skills</Title>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {stack.map(([icon, head, items], i) => (
              <motion.div
                key={head}
                {...fade((i % 3) * 0.08)}
                className="bg-blush rounded-2xl p-6 border border-petal hover:border-rose hover:shadow-xl hover:shadow-rose/10 hover:-translate-y-1.5 transition duration-300"
              >
                <h3 className="font-bold text-lg text-rose">
                  {icon} {head}
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full bg-petal/40 text-xs sm:text-sm font-medium hover:bg-rose hover:text-white hover:scale-105 transition cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Experience />
      <Projects />

      {/* ASK ME */}
      <section id="ask" className="px-4 sm:px-6 py-16 sm:py-20 max-w-3xl mx-auto">
        <Title>🌼 Ask Me About</Title>
        <ul className="space-y-3">
          {askMe.map((t, i) => (
            <motion.li
              key={t}
              {...fade(i * 0.05)}
              className="bg-white rounded-xl px-5 py-3.5 border border-petal/60 text-sm sm:text-base hover:border-rose hover:bg-petal/20 hover:translate-x-2 hover:shadow-md transition duration-300"
            >
              {t}
            </motion.li>
          ))}
        </ul>
      </section>

      <Contact />

      <footer className="bg-gradient-to-r from-rose to-deep text-white text-center py-8 px-4 text-sm">
        <p className="font-display text-lg font-bold">🌺 Nejash Anwar Yusuf</p>
        <p className="mt-1 text-white/90">
          © {new Date().getFullYear()} • I believe in the power of technology to create positive change 🌸
        </p>
         <p className="mt-1 text-white/90">
          © I love you for being with me and this is too; will pass🌸
        </p>
      </footer>
      <AnimatePresence>
  {cvOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCvOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep/70 backdrop-blur-sm p-3 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full max-w-4xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-petal bg-blush">
          <h3 className="font-bold text-rose text-base sm:text-lg">📄 My CV</h3>
          <div className="flex items-center gap-2">
            <a
              href="/Nejash_Anwar_Yusuf_CV.pdf"
              download="Nejash_Anwar_Yusuf_CV.pdf"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-rose to-deep text-white text-sm font-semibold hover:shadow-lg active:scale-95 transition"
            >
              ⬇ Download
            </a>
            <button
              onClick={() => setCvOpen(false)}
              aria-label="Close"
              className="p-2 rounded-full bg-petal/50 text-deep hover:bg-rose hover:text-white active:scale-90 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <iframe
          src="/Nejash_Anwar_Yusuf_CV.pdf#toolbar=0&view=FitH"
          title="CV preview"
          className="flex-1 w-full"
        />

        {/* Fallback for phones */}
        <a
          href="/Nejash_Anwar_Yusuf_CV.pdf"
          target="_blank"
          rel="noreferrer"
          className="sm:hidden text-center py-2 text-sm text-rose underline"
        >
          Preview hin mul'atin? Asitti bani
        </a>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </main>
  );
}