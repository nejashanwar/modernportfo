import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  
  {
    title: "Hospital Management System",
    description:
      "Secure patient management system with appointment scheduling, electronic health records, and prescription management.",
    image:
      "https://www.codezone-eg.com/media/Blog/HIS/2.webp",
    technologies: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "REST API","Filament & filament-shield"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "School Management Mobile App",
    description:
      "Manage staff and student portal application processing, parent  manage thier children's information, and fraud detection system.",
    image:
      "https://t4.ftcdn.net/jpg/15/12/04/11/360_F_1512041110_c0NFJDcHLmUJiwfDowzcKUgsPALmbjdD.jpg",
    technologies: ["Kotlin", "sqlite", "OAuth2", "jetpack", "android studio"],
    github: "https://github.com/nejashanwar/MIISchool-ManagementSystem",
    live: "https://github.com/nejashanwar/MIISchool-ManagementSystem",
  },
  {
    title: "Customer_relationship_management-CRM",
    description:
      "This project is a simple Customer Relationship Management (CRM) system designed to help businesses manage customer information efficiently.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfvN3VxVxiKFtyum7FfZiZS0ZHvSjURf9tFGWgMSgaQ&s=10",
    technologies: ["Frontend: HTML, CSS, JavaScript",
"Backend: PHP","Database: MySQL"],
    github: "https://github.com/Gemtessa09/Customer_relationship_management-CRM-",
    live: " https://github.com/Gemtessa09/Customer_relationship_management-CRM.git",
  },
 
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-rose text-center mb-3">
        🌻 Featured Projects
      </h2>
      <p className="text-center mb-12">Some of the things I've built and bloomed.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="flex flex-col bg-white rounded-3xl overflow-hidden border border-petal shadow-md hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="h-44 bg-gradient-to-br from-petal to-rose overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-bold text-rose">{p.title}</h3>
              <p className="mt-2 text-sm flex-1">{p.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {p.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-petal/50 text-xs">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose text-rose text-sm hover:bg-rose hover:text-white transition"
                >
                  <FaGithub /> Code
                </a>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose text-white text-sm hover:bg-deep transition"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}