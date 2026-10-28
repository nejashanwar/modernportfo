import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";

const socials = [
  { name: "GitHub", icon: FaGithub, url: "https://github.com/nejashanwar" },
  { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/in/nejash-anwar-0470a3379" },
  { name: "Telegram", icon: FaTelegram, url: "https://t.me/youarestarevery" },
  { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/251907387504" },
  { name: "Facebook", icon: FaFacebook, url: "https://facebook.com/najash.anwaarciroo" },
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/nejash660" },
  { name: "X (Twitter)", icon: FaXTwitter, url: "https://x.com/" },
  { name: "YouTube", icon: FaYoutube, url: "https://youtube.com/@nejprogrammer-uniqe" },
  { name: "TikTok", icon: FaTiktok, url: "https://tiktok.com/@starnej1" },
];

const info = [
  { icon: Mail, label: "Email", value: "nejasha17@email.com", href: "mailto:nejasha17@email.com" },
  { icon: Phone, label: "Phone", value: "+251 907387504", href: "tel:+251907387504" },
  { icon: MapPin, label: "Location", value: "Ethiopia 🇪🇹" },
];

const input =
  "w-full p-3 rounded-xl border border-petal bg-blush/50 focus:outline-none focus:ring-2 focus:ring-rose transition";

// Access key: .env keessatti VITE_WEB3FORMS_KEY=... jedhii kuusi
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Contact() {
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  setStatus("sending");

  const formData = new FormData(form);
  formData.append("access_key", ACCESS_KEY);
  formData.append("from_name", "Portfolio Contact Form");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("Web3Forms:", data);

    if (data.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setStatus("error");
  }
}

  return (
    <section id="contact" className="px-6 py-20 bg-white/60">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-rose">
            🌺 Let's Work Together
          </h2>
          <p className="mt-3 max-w-xl mx-auto">
            Do you have a project, an idea, or just want to say hello?
            Send me a message and I'll reply as soon as I can.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* LEFT: info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              {info.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 bg-blush rounded-2xl p-4 border border-petal/60">
                  <span className="p-3 rounded-full bg-petal text-deep">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-rose">{label}</p>
                    {href ? (
                      <a href={href} className="font-medium hover:text-rose">{value}</a>
                    ) : (
                      <p className="font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-rose mb-3">🌸 Find me on</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ name, icon: Icon, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    title={name}
                    aria-label={name}
                    className="p-3 rounded-full bg-petal text-deep text-xl hover:bg-rose hover:text-white hover:-translate-y-1 transition"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: form */}
          <motion.form
            onSubmit={handleSubmit}
            
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3 bg-white rounded-3xl p-8 shadow-lg border border-petal space-y-4"
          >

            {/* Spam trap: namni dhugaa hin argine, bot qofa guuta */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Your Name" required className={input} />
              <input type="email" name="email" placeholder="Your Email" required className={input} />
            </div>
            <input type="text" name="subject" placeholder="Title" required className={input} />
            <textarea
              name="message"
              rows="6"
              placeholder="Write your message here..."
              required
              className={input}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full p-3 rounded-xl bg-rose text-white font-semibold hover:bg-deep transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "🌷 Send message"}
            </button>

            <div aria-live="polite" className="min-h-6 text-center text-sm">
              {status === "success" && (
                <p className="text-green-700">Thank you! Your message was sent.</p>
              )}
              {status === "error" && (
                <p className="text-red-600">
                  Something went wrong. Check your connection and try again.
                </p>
              )}
            </div>
          </motion.form>
          
        </div>
      </div>
    </section>
  );
}