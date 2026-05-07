import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";

const STATS = [
  { figure: "1st", label: "First Class Honours" },
  { figure: "5+", label: "Projects Shipped Under Real Constraints" },
  { figure: "Full Stack", label: "Hardware to Deployed Product" },
  { figure: "Always On", label: "The AI Guy in Every Room" },
];

const COPY = [
  "I graduated with First Class Honours in Electrical and Electronic Engineering from Coventry University. I am genuinely passionate about AI and the pace at which it is moving, and that shows in how I work. Among the people around me I am the one who is always on top of the latest tools, whether that is a new model, a new framework, or a new way of building something faster and smarter. People come to me when they want to know what is actually worth using.",
  "Beyond engineering I design and deploy production-ready websites for real clients through my web agency IntelliSite, handling everything from design and development through to live deployment. Real clients, real constraints, real deadlines.",
  "I am at the start of my career, but I do not treat it that way. I hold my work to a high standard, take full ownership of what I build, and approach every problem with the same seriousness regardless of the stakes. The goal is not just to find a role but to find the right environment where that mindset is valued and pushed further.",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-[120px] md:py-[140px]"
    >
      <div className="container-edge relative z-[1]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          {/* Left, 3/5 */}
          <div className="md:col-span-3">
            <FadeIn>
              <span className="accent-bar mb-6 block" aria-hidden />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="eyebrow mb-6">About</p>
            </FadeIn>
            <RevealText
              as="h2"
              lines={[
                "Building things that work in",
                "the real world, not just on paper.",
              ]}
              className="font-display font-bold text-text-primary text-display-md"
              stagger={0.1}
            />
            <div className="mt-10 space-y-6">
              {COPY.map((para, i) => (
                <FadeIn key={i} delay={0.15 * i}>
                  <p
                    className="font-sans text-text-muted"
                    style={{
                      fontSize: 17,
                      lineHeight: 1.9,
                      ...(i === 1
                        ? {
                            borderLeft: "2px solid rgba(255, 107, 43, 0.4)",
                            paddingLeft: 20,
                          }
                        : {}),
                    }}
                  >
                    {para}
                  </p>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.5} className="mt-10">
              <Button
                variant="outline-primary"
                href="/cv/Fares_Matar_CV_Master.pdf"
                target="_blank"
                download
              >
                Download CV
              </Button>
            </FadeIn>
          </div>

          {/* Right, 2/5 stat grid */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4 md:gap-5" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
              {STATS.map((s, i) => (
                <StatCard key={s.label} index={i} figure={s.figure} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
