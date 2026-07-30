"use client";

import { XIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { GALLERY_SHAPE_PATHS } from "@/lib/gallery-shapes";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function resolveUseCaseGalleryPath(galleryShapeId: number): string {
  return (
    GALLERY_SHAPE_PATHS.find((s) => s.id === galleryShapeId)?.d ??
    GALLERY_SHAPE_PATHS[0].d
  );
}

export function UseCaseMeshVisual({
  imageSrc,
  pathD,
  className,
  iconClassName,
}: {
  imageSrc: string;
  pathD: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- asset décoratif plein cadre */}
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        aria-hidden
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="none"
        className={cn("absolute text-white/50", iconClassName)}
        aria-hidden
      >
        <path d={pathD} fill="currentColor" />
      </svg>
    </div>
  );
}

type UseCaseDetailDialogProps = {
  title: string;
  description: string;
  detail: string;
  stack: readonly string[];
  stackLabel: string;
  ctaLabel: string;
  imageSrc: string;
  galleryShapeId: number;
  trigger: ReactNode;
};

export function UseCaseDetailDialog({
  title,
  description,
  detail,
  stack,
  stackLabel,
  ctaLabel,
  imageSrc,
  galleryShapeId,
  trigger,
}: UseCaseDetailDialogProps) {
  const pathD = resolveUseCaseGalleryPath(galleryShapeId);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="gap-0 overflow-hidden border-0 p-0 shadow-xl sm:max-w-xl"
        showCloseButton={false}
      >
        <div className="relative">
          <UseCaseMeshVisual
            imageSrc={imageSrc}
            pathD={pathD}
            className="aspect-[16/9] w-full"
            iconClassName="left-5 top-5 size-12 md:size-14"
          />
          <DialogClose
            className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Close"
          >
            <XIcon className="size-4" />
          </DialogClose>
        </div>

        <div className="space-y-5 p-5 md:p-6">
          <DialogHeader className="gap-2 text-left">
            <DialogTitle className="text-xl leading-snug font-medium">
              {title}
            </DialogTitle>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <DialogDescription className="text-sm leading-relaxed text-foreground">
              {detail}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {stackLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button asChild variant="default" size="default">
              <Link href="/contact">{ctaLabel}</Link>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
