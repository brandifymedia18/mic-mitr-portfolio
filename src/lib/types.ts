export type PortfolioCategory = 'Graphics' | 'Video' | 'Voice Over' | 'AI UGC Videos' | 'Meta Ads' | 'Political';

export type PortfolioSubCategory = '3-Day Setup' | 'Premium Plan Setup' | 'Political Graphics' | 'Political AI Videos';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string; // id from placeholder-images.json or path to a local image in /public
  video?: string; // path to a local video in /public
  audio?: string; // path to a local audio in /public
  category: PortfolioCategory;
  subcategory?: PortfolioSubCategory;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string; // id from placeholder-images.json
  review: string;
}
