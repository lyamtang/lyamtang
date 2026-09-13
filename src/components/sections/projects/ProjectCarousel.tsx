'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { GalleryImage } from '@/data/types';

export function ProjectCarousel({ images }: { images: GalleryImage[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [autoplay] = React.useState(() =>
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  // Stable array reference — recreating this on every render would cause
  // useEmblaCarousel to reinitialize and silently kill the autoplay timer.
  const plugins = React.useMemo(() => [autoplay], [autoplay]);
  const count = images.length;

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      <Carousel
        opts={{ loop: true }}
        plugins={plugins}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background/70 px-4 py-2.5 text-sm text-muted-foreground backdrop-blur-sm">
                    {img.caption}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination dots */}
      {count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30',
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
