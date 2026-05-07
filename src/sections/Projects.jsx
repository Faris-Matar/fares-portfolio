import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, thisWebsiteCard } from "@/data/projectData";

export default function Projects() {
  const [p1, p2, p3, p4, p5] = projects;

  return (
    <section id="projects" className="relative py-[120px] overflow-hidden">
      <span className="section-bg-text" aria-hidden>
        Projects
      </span>
      <div className="container-edge relative z-[1]">
        <FadeIn>
          <p className="eyebrow mb-6">Projects</p>
        </FadeIn>
        <RevealText
          as="h2"
          text="Things I have built."
          className="font-display font-bold text-text-primary text-display-md"
        />
        <FadeIn delay={0.2} className="mt-4">
          <p className="font-sans text-text-muted text-lg">
            Each project taken from concept to working prototype.
          </p>
        </FadeIn>

        {/* Bento grid with 3D perspective for rotateX entrance */}
        <div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-min"
          style={{ perspective: "1000px" }}
        >
          <ProjectCard project={p1} index={0} spanClass="md:col-span-2" />
          <ProjectCard project={p2} index={1} spanClass="md:col-span-1" />
          <ProjectCard project={p3} index={2} spanClass="md:col-span-1" />
          <ProjectCard project={p4} index={3} spanClass="md:col-span-1" />
          <ProjectCard project={p5} index={4} spanClass="md:col-span-1" />
          <ProjectCard project={thisWebsiteCard} index={5} spanClass="md:col-span-3" />
        </div>
      </div>
    </section>
  );
}
