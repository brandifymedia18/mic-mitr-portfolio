import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container flex flex-col items-center justify-between gap-8 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Mic Mitr Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="font-bold font-headline text-md text-primary">
              Mic Mitr
            </span>
          </div>
          <p className="hidden text-center text-sm leading-loose text-foreground/70 md:block md:text-left">
            - Creative Digital Content Studio.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex gap-4">
            <Link
              href="https://www.instagram.com/mic_mitra?igsh=MWttNmg4cmI2OXdwOQ%3D%3D&utm_source=qr"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://www.facebook.com/share/1DEmvJPzV8/?mibextid=wwXIfr"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/micmitr?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-foreground/70 md:flex-row md:gap-4">
            <a
              href="mailto:contact@micmitr.in"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>contact@micmitr.in</span>
            </a>
            <a
              href="tel:+919404717182"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+91 94047 17182</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
