'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { PortfolioItem } from '@/lib/types';
import { useRef, useState, useEffect } from 'react';
import { Play, Pause, PictureInPicture } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const imageUrl = item.image;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPiPSupported, setIsPiPSupported] = useState(false);

  useEffect(() => {
    // This check needs to be in useEffect to avoid SSR errors with `document`.
    setIsPiPSupported(
      'pictureInPictureEnabled' in document && document.pictureInPictureEnabled
    );

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleEnterPiP = () => {
      if (videoElement.paused) {
        setIsPlaying(false);
      }
    };

    const handleLeavePiP = () => {
      if (videoElement.paused) {
        setIsPlaying(false);
      }
    };

    videoElement.addEventListener('enterpictureinpicture', handleEnterPiP);
    videoElement.addEventListener('leavepictureinpicture', handleLeavePiP);

    return () => {
      videoElement.removeEventListener('enterpictureinpicture', handleEnterPiP);
      videoElement.removeEventListener('leavepictureinpicture', handleLeavePiP);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const togglePiP = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from toggling play/pause on the video.

    if (!videoRef.current || !isPiPSupported) return;

    try {
      if (videoRef.current === document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Error toggling Picture-in-Picture mode:', error);
    }
  };

  return (
    <Card className="group overflow-hidden bg-card border-border/60 hover:border-primary transition-colors duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div
          className="aspect-video relative overflow-hidden bg-muted cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handlePlayPause}
        >
          {item.video ? (
            <>
              <video
                ref={videoRef}
                src={item.video}
                poster={imageUrl}
                playsInline
                controls={false}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="object-contain w-full h-full"
              />
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 pointer-events-none',
                  !isPlaying
                    ? 'opacity-100'
                    : isHovered
                    ? 'opacity-100'
                    : 'opacity-0'
                )}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center text-primary-foreground group-hover:bg-primary transition-colors">
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </div>
              </div>
              {isPiPSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePiP}
                  aria-label="Toggle Picture-in-Picture"
                  className={cn(
                    'absolute bottom-2 right-2 h-8 w-8 text-white bg-black/50 hover:bg-black/75 hover:text-white transition-opacity',
                    isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <PictureInPicture className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : item.audio ? (
            <div className="relative w-full h-full">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="object-contain w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                <audio
                  src={item.audio}
                  controls
                  controlsList="nodownload"
                  className="w-full"
                />
              </div>
            </div>
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title}
              width={600}
              height={400}
              className="object-contain w-full h-full transition-transform duration-300 ease-in-out"
            />
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">
          {item.title}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
