import Image from "next/image";
import { getService } from "@/config/services";
import type { Project } from "@/config/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover">
      <div className="relative aspect-[4/3] w-full bg-canvas">
        <Image
          src={project.image.after}
          alt={project.image.alt}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-h3">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-small text-muted">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand"
            >
              {getService(s)?.name}
            </span>
          ))}
        </div>
        <p className="mt-3 text-small text-muted">
          {project.areaSqm} մ² · {project.durationDays} օր
        </p>
      </div>
    </article>
  );
}
