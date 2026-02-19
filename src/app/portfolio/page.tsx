'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { portfolioData, portfolioCategories } from '@/lib/data';
import { PortfolioCard } from '@/components/portfolio-card';

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState(slugify(portfolioCategories[0]));
  
  useEffect(() => {
    // This effect runs only on the client side after hydration
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const isValidTab = portfolioCategories.some(cat => slugify(cat) === hash);
      if (isValidTab) {
        setActiveTab(hash);
      }
    }
  }, []);

  const metaAds3Day = portfolioData.filter(item => item.category === 'Meta Ads' && item.subcategory === '3-Day Setup');
  const metaAdsPremium = portfolioData.filter(item => item.category === 'Meta Ads' && item.subcategory === 'Premium Plan Setup');
  const politicalGraphics = portfolioData.filter(item => item.category === 'Political' && item.subcategory === 'Political Graphics');
  const politicalAIVideos = portfolioData.filter(item => item.category === 'Political' && item.subcategory === 'Political AI Videos');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Our Work</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          A showcase of our projects across different domains of digital content creation.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto -mx-4 sm:mx-0">
            {portfolioCategories.map((category) => (
                <TabsTrigger key={slugify(category)} value={slugify(category)} className="py-2 text-xs sm:text-sm">
                {category}
                </TabsTrigger>
            ))}
            </TabsList>
        </div>
        
        {portfolioCategories.map((category) => (
          <TabsContent key={slugify(category)} value={slugify(category)} className="mt-12">
            {category === 'Meta Ads' ? (
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl font-bold font-headline mb-2">3-Day Setup</h2>
                  <p className="text-foreground/70 mb-8 max-w-2xl">Rapid and effective ad campaign setups designed for immediate impact.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {metaAds3Day.map(item => <PortfolioCard key={item.id} item={item} />)}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-headline mb-2">Premium Plan Setup</h2>
                  <p className="text-foreground/70 mb-8 max-w-2xl">Comprehensive, long-term advertising strategies for sustained growth.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {metaAdsPremium.map(item => <PortfolioCard key={item.id} item={item} />)}
                  </div>
                </div>
              </div>
            ) : category === 'Political' ? (
              <div className="space-y-16">
                <div>
                  <h2 className="text-3xl font-bold font-headline mb-2">Political Graphics</h2>
                  <p className="text-foreground/70 mb-8 max-w-2xl">Visual content designed for political campaigns and messaging.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {politicalGraphics.map(item => <PortfolioCard key={item.id} item={item} />)}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-headline mb-2">Political AI Videos</h2>
                  <p className="text-foreground/70 mb-8 max-w-2xl">AI-generated videos for impactful political communication.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {politicalAIVideos.map(item => <PortfolioCard key={item.id} item={item} />)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.filter(item => item.category === category).map(item => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
