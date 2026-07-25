import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/config/testimonials";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <Card className="flex h-full flex-col">
      <StarRating rating={item.rating} />
      <p className="mt-3 flex-1 text-body text-ink">“{item.text}”</p>
      <div className="mt-4">
        <p className="font-medium text-ink">{item.author}</p>
        <p className="text-small text-muted">{item.location}</p>
      </div>
    </Card>
  );
}
