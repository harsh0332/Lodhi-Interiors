"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/content";
import { Photo } from "./Elements";
export function ProjectGallery({ images }: { images: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    if (!modal) return;
    modal.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = old;
      opener.current?.focus();
    };
  }, [isOpen]);
  const close = () => setActive(null);
  const move = (step: number) =>
    setActive((n) =>
      n === null ? null : (n + step + images.length) % images.length,
    );
  const current = active === null ? null : images[active];
  return (
    <>
      <section className="project-gallery" aria-label="Project photographs">
        {images.map((im, i) => (
          <figure key={`${im.src}-${i}`}>
            <button
              className="gallery-open"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`Enlarge image ${i + 1}: ${im.alt}`}
            >
              <Photo src={im.src} alt={im.alt} />
              <span className="gallery-enlarge">View image ↗</span>
            </button>
            {im.caption && <figcaption>{im.caption}</figcaption>}
          </figure>
        ))}
      </section>
      <dialog
        ref={dialog}
        className="gallery-modal"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
        aria-label="Project image viewer"
      >
        <div className="gallery-toolbar">
          <span aria-live="polite">
            {active !== null ? active + 1 : 0} / {images.length}
          </span>
          <button autoFocus onClick={close} aria-label="Close image viewer">
            Close ×
          </button>
        </div>
        {current && (
          <div className="gallery-full-image">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              quality={85}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <div className="gallery-navigation">
          <button onClick={() => move(-1)} disabled={images.length < 2}>
            ← Previous
          </button>
          <p>{current?.caption || current?.alt}</p>
          <button onClick={() => move(1)} disabled={images.length < 2}>
            Next →
          </button>
        </div>
      </dialog>
    </>
  );
}
