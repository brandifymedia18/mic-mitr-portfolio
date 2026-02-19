import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';

export function ClientReviews() {
  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center sm:text-4xl font-headline mb-12">
          What Our Clients Say
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => {
              const image = PlaceHolderImages.find(p => p.id === testimonial.avatar);
              const fallback = testimonial.name.split(' ').map(n => n[0]).join('');
              return (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <Card className="h-full flex flex-col justify-between text-center bg-card border-border/60 p-6 sm:p-8 rounded-lg transition-colors duration-300 hover:border-primary">
                      <div>
                        <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto mb-6" />
                        <p className="text-foreground/80 mb-8">
                          "{testimonial.review}"
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-4">
                          {image && <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image?.imageHint || 'portrait'} />}
                          <AvatarFallback>{fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-lg text-foreground font-headline">{testimonial.name}</p>
                          <p className="text-sm text-foreground/70">{testimonial.role}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:left-4 lg:-left-12" />
          <CarouselNext className="right-0 md:right-4 lg:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
