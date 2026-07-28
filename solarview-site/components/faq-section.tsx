"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading: string;
  items: FaqItem[];
  className?: string;
}

export function FaqSection({ heading, items, className }: FaqSectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} id="faq">
      <div className="container">
        <h2 className="text-section mx-auto max-w-3xl text-center">{heading}</h2>

        <Accordion type="single" collapsible className="mx-auto mt-12 max-w-3xl">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
