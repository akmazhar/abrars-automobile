
import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "X",
    href: "https://twitter.com/akm_azhar",
    path: "M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.38L5.6 22H2.46l7.25-8.29L1.8 2h6.4l4.43 6.96L18.9 2Zm-1.1 18h1.73L7.27 3.9H5.4L17.8 20Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/watch?v=C8-eClpeH80",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/akmazharabrartinni/",
    path: "M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4Z",
  },
];

const exploreLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Vehicles", href: "#vehicles" },
  { label: "Contact Us", href: "#contact" },
];

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

const Footer = ({ onSubscribeEmail }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    type: "idle",
    message: "",
  });
  const [showTop, setShowTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (typeof onSubscribeEmail !== "function") {
      setStatus({
        type: "error",
        message:
          "Newsletter service is not connected yet. Please try again later.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      await onSubscribeEmail(normalizedEmail);

      setEmail("");
      setStatus({
        type: "success",
        message: "Thank you! Your subscription was successful.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "We couldn't complete your subscription. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-amber-400/20 bg-[#080808] text-white"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.10),transparent_65%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 -z-10 h-64 w-64 rounded-full bg-amber-500/[0.06] blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="space-y-6">
            <a
              href="#home"
              className="group inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Abrar Enterprise home"
            >
              <img
                src="/llogo.png"
                alt="Abrar Enterprise"
                width="100"
                height="60"
                loading="lazy"
                className="h-20 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  Abrar
                </span>{" "}
                <span className="text-white">Enterprise</span>
              </span>
            </a>

            <p className="max-w-sm text-sm leading-7 text-neutral-400">
              Your journey, our commitment. Discover a better driving
              experience with Abrar Enterprise, where trust meets the road.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page (opens in a new tab)`}
                  className="group grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-amber-300 transition duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:bg-amber-400 hover:text-black hover:shadow-lg hover:shadow-amber-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px] fill-current"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore links */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Explore
            </h2>

            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-amber-300 focus-visible:outline-none focus-visible:text-amber-300"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-4"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Get in Touch
            </h2>

            <p className="mb-6 text-sm leading-7 text-neutral-400">
              Have a question or need assistance? We would love to hear
              from you.
            </p>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg border border-amber-400/30 px-4 py-3 text-sm font-semibold text-amber-300 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Contact Our Team
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
              Stay Connected
            </h2>

            <p className="mb-5 text-sm leading-7 text-neutral-400">
              Get the latest updates, new arrivals, and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (status.type !== "idle") {
                    setStatus({ type: "idle", message: "" });
                  }
                }}
                placeholder="Enter your email"
                aria-describedby="newsletter-message"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-neutral-600 hover:border-white/20 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-amber-500/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                      />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowIcon />
                  </>
                )}
              </button>

              <p
                id="newsletter-message"
                role="status"
                aria-live="polite"
                className={`min-h-5 text-xs leading-5 ${
                  status.type === "success"
                    ? "text-emerald-400"
                    : status.type === "error"
                      ? "text-rose-400"
                      : "text-neutral-500"
                }`}
              >
                {status.message ||
                  "No spam. Unsubscribe whenever you like."}
              </p>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/[0.08] pt-7 sm:mt-16">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-6 text-neutral-500">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-amber-400">
                Abrar Enterprise
              </span>
              . All rights reserved.
            </p>

            <p className="text-xs leading-6 text-neutral-500">
              Designed &amp; developed with care by{" "}
              <span className="font-semibold text-neutral-200">
                A K M Azhar
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-gradient-to-br from-amber-300 to-yellow-500 text-black shadow-xl shadow-amber-500/20 transition-[opacity,transform] duration-300 motion-reduce:transition-none sm:bottom-7 sm:right-7 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
