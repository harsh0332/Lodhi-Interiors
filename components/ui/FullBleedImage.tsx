import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Caption } from './Typography';
import { BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/images';

export interface FullBleedImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  aspectRatio?: '16/9' | '21/9' | '3/2';
  caption?: string;
  className?: string;
  imageClassName?: string;
}

/**
 * FullBleedImage: Escapes container bounds to span the full browser viewport.
 * - Reserves aspect ratio to prevent cumulative layout shift.
 * - Supports priority loading flag.
 * - Strictly 0 radius, no borders, no box shadows.
 */
export function FullBleedImage({
  src,
  alt,
  priority = false,
  aspectRatio = '21/9',
  caption,
  className,
  imageClassName,
}: FullBleedImageProps) {
  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '3/2'
        ? 'aspect-[3/2]'
        : 'aspect-[16/9] md:aspect-[21/9]';

  return (
    <figure
      className={cn(
        'relative left-1/2 right-1/2 my-12 -ml-[50vw] -mr-[50vw] w-screen max-w-none overflow-hidden md:my-24',
        className,
      )}
    >
      <div className={cn('relative w-full overflow-hidden bg-paper', aspectClass)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          quality={IMAGE_QUALITY}
          placeholder={priority ? undefined : 'blur'}
          blurDataURL={priority ? undefined : BLUR_DATA_URL}
          className={cn('object-cover', imageClassName)}
        />
      </div>
      {caption && (
        <figcaption className="mx-auto mt-4 max-w-container px-5 text-left md:px-12">
          <Caption>{caption}</Caption>
        </figcaption>
      )}
    </figure>
  );
}
