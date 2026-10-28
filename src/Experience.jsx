import { motion } from "framer-motion";

// 👇 Kana ofii kee sirreessi (guyyaa, maqaa, ibsa)
const timeline = [
  {
    type: "🎓 Education",
    title: "BSc in Software Engineering",
    place: "Haramaya University",
    period: "5th Year • Graduating soon",
    points: [
      "Studying software design, databases, web & mobile development, testing and project management",
      "Final-year capstone project in progress",
    ],
  },
  {
    type: "🎓 Education",
    title: "Management (3rd Year)",
    place: "Management Department",
    period: "Currently studying",
    points: [
      "Learning management, accounting and economics fundamentals alongside software engineering",
      "Combining technical skills with business thinking to build software that solves real needs",
    ],
  },
  {
    type: "💼 Experience",
    title: "Software Engineering Intern",
    place: "Oda Bultum University",
    period: "Internship • 2026",
    points: [
      "Worked on a Hospital Management System web application",
      "Gathered requirements, designed the database and built system features",
      "Wrote the use-case diagrams, functional requirements and the final internship report",
    ],
  },
  {
    type: "🚀 Projects",
    title: "Hospital Management System",
    place: "Personal / Team Project",
    period: "2026",
    points: [
      "Collected requirements with Google Forms and turned them into clear, testable requirements",
      "Designed and implemented the system for hospital workflows",
    ],
  },
];

const management = [
  "📋 Project Management",
  "👥 Team Leadership",
  "🗓️ Planning & Sprints",
  "💰 Cost Accounting",
  "📊 Econometrics & Data Thinking",
  "🗣️ Communication & Presentation",
  "⏱️ Time & Resource Management",
  "🎯 Business Analysis",
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-rose text-center mb-3">
        🌼 Experience & Education
      </h2>
      <p className="text-center mb-12">
        Software Engineering + Management: building systems and knowing the business behind them.
      </p>

      {/* Timeline */}
      <div className="relative border-l-4 border-petal ml-3 space-y-10">
        {timeline.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="relative pl-8"
          >
            <span className="absolute -left-[14px] top-2 w-6 h-6 rounded-full bg-rose border-4 border-blush" />
            <div className="bg-white rounded-2xl p-6 border border-petal shadow-sm hover:shadow-md transition">
              <p className="text-xs uppercase tracking-wide text-rose">{t.type}</p>
              <h3 className="text-xl font-bold mt-1">{t.title}</h3>
              <p className="text-sm mt-1">
                {t.place} • <span className="text-rose">{t.period}</span>
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
                {t.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Management skills */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-rose mb-6">🌷 Management Skills</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {management.map((m) => (
            <span key={m} className="px-4 py-2 rounded-full bg-petal/50 text-sm">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}