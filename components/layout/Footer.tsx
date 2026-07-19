import Link from "next/link";
import { Leaf, Instagram, Twitter, Youtube, Mail, MapPin } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/plants", label: "Browse Plants" },
      { href: "/identify", label: "Identify a Plant" },
      { href: "/plants/add", label: "Sell a Plant" },
      { href: "/blog", label: "Care Guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About PlantPal" },
      { href: "/contact", label: "Contact & Support" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-sand bg-canopy-dark text-paper/90">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-canopy">
                <Leaf size={16} />
              </span>
              <span className="font-display text-xl font-semibold">PlantPal</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              A marketplace for plant people — buy, sell, and learn to care for your greenery with a
              little help from AI.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-paper/70">
              <Mail size={15} /> hello@plantpal.app
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-sm text-paper/70">
              <MapPin size={15} /> Portland, OR
            </div>
            <div className="mt-5 flex gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="text-paper/70 hover:text-paper">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-paper/70 hover:text-paper">
                <Twitter size={18} />
              </a>
              <a href="https://youtube.com" aria-label="Youtube" className="text-paper/70 hover:text-paper">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="nursery-tag mb-3 text-paper/50">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-paper/75 hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} PlantPal. All rights reserved.</p>
          <p>Built for the PlantPal capstone project.</p>
        </div>
      </div>
    </footer>
  );
};
