import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Palette,
  Clapperboard,
  Mic,
  Sparkles,
  Megaphone,
  Landmark,
} from 'lucide-react';
import { portfolioCategories } from '@/lib/data';
import type { PortfolioCategory } from '@/lib/types';
import { ClientReviews } from '@/components/client-reviews';

const categoryIcons: Record<PortfolioCategory, React.ReactNode> = {
  Graphics: <Palette className="h-8 w-8 text-primary" />,
  Video: <Clapperboard className="h-8 w-8 text-primary" />,
  'Voice Over': <Mic className="h-8 w-8 text-primary" />,
  'AI UGC Videos': <Sparkles className="h-8 w-8 text-primary" />,
  'Meta Ads': <Megaphone className="h-8 w-8 text-primary" />,
  Political: <Landmark className="h-8 w-8 text-primary" />,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-background">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32">
          <h1 className="text-4xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-foreground font-headline animate-fade-in-down">
            Mic Mitr
          </h1>
          <p
            className="px-8 mt-8 mb-12 text-lg xl:max-w-3xl text-foreground/80 animate-fade-in-down"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            We create creative digital content for brands using graphics,
            videos, voice overs, and AI-based content.
          </p>
          <div
            className="flex flex-wrap justify-center animate-fade-in-down"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <Button asChild size="lg">
              <Link href="/portfolio">
                View Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center sm:text-4xl font-headline mb-12">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {portfolioCategories.map((category) => (
              <Link href={`/portfolio#${slugify(category)}`} key={category}>
                <Card className="flex flex-col h-full bg-card border-border/60 hover:border-primary transition-colors duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {categoryIcons[category]}
                    <CardTitle className="font-headline">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/70">
                      Explore our projects in {category.toLowerCase()}.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0 text-primary font-semibold flex items-center">
                    See projects <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClientReviews />
    </div>
  );
}
