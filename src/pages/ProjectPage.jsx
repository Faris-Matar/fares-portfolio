import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import RevealText from "@/components/motion/RevealText";
import TagPill from "@/components/ui/TagPill";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";
import { getProjectBySlug } from "@/data/projectData";
import { ease } from "@/utils/motion";

/* Per-project tech stack tags rendered on the project page (override card tags). */
const PAGE_TAGS = {
  "eye-tracking": [
    "Python",
    "MediaPipe",
    "OpenCV",
    "Raspberry Pi 5",
    "GPIO",
    "L298N H-Bridge",
    "PWM",
    "RTSP Streaming",
    "NumPy",
    "Lenis",
    "CSV Data Logging",
  ],
  "signal-generator": [
    "C Firmware",
    "PIC18F45K20",
    "MCP4921 DAC",
    "SPI",
    "Assembly",
    "Proteus ISIS",
    "LCD Interface",
    "Joystick Input",
    "Oscilloscope Validation",
  ],
  intellisite: [
    "React 18",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Lenis",
    "JavaScript",
    "Vercel",
    "SEO",
    "Responsive Design",
  ],
  "parking-lot": [
    "Assembly Language",
    "PIC18F45K20",
    "Timer0",
    "INT0 Interrupt",
    "Proteus ISIS",
    "7-Segment Display Multiplexing",
    "Motor Control",
    "LDR Sensors",
    "Hardware Simulation",
  ],
  pcb: [
    "EasyEDA",
    "ESP32-WROOM-32D",
    "4-Layer PCB",
    "Mixed-Signal Design",
    "I2C",
    "SPI",
    "BME280",
    "CO2 Sensor",
    "PM Sensor",
    "LDO Power Management",
    "OLED Display",
    "SD Card Logging",
  ],
};

const OVERVIEW = {
  "eye-tracking":
    "A fully integrated real-time embedded AI system that classifies a user's gaze direction and translates it into physical motor commands on an RC car platform. Built as a proof of concept for hands-free assistive mobility, running entirely on a Raspberry Pi 5 with no external computer. Every component from video capture to motor actuation was designed, built, debugged, and validated from scratch.",
  "signal-generator":
    "A fully programmable waveform generator built on a PIC18F45K20 microcontroller and MCP4921 12-bit DAC. The system generates six waveform types at selectable frequencies and amplitudes through a joystick and LCD user interface. Designed, coded, assembled, and validated entirely in the lab against oscilloscope measurements. Led the team as group project leader, delivering a First Class result at 85 percent.",
  intellisite:
    "IntelliSite is a live commercial web design agency website I designed, built, and deployed entirely from scratch. It targets premium home improvement businesses across the UK, offering cinematic conversion-led websites. Every element was produced by me including the copy, layout, animations, motion system, and deployment pipeline. It operates as a real product with real pricing and a real client enquiry flow.",
  "parking-lot":
    "A real-time vehicle management system written entirely in Assembly language on a PIC18F45K20 microcontroller. The system tracks vehicles entering and exiting a parking lot, manages entry and exit gate motors, and displays available spaces on a multiplexed 4-digit 7-segment display. Designed, programmed, and validated in Proteus ISIS simulation with a full interrupt-driven architecture.",
  pcb:
    "A four-layer mixed-signal printed circuit board designed in EasyEDA, integrating five sensor types for environmental air quality monitoring on an ESP32-WROOM-32D microcontroller. The board measures CO2, temperature, humidity, and particulate matter in real time, displays readings on an OLED screen, and logs timestamped data to an SD card. Designed with professional PCB layout practices including dedicated ground and power planes, decoupling networks, and separate analogue and digital routing.",
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const navigate = useNavigate();

  if (!project) return <Navigate to="/" replace />;

  const tags = PAGE_TAGS[slug] || project.tags;

  return (
    <>
      <Helmet>
        <title>{`Fares Matar, ${project.title}`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="bg-background min-h-screen">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: ease.primary, delay: 0.2 }}
          className="container-edge pt-28 pb-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="font-mono uppercase tracking-widest text-xs text-primary hover:text-secondary transition-colors duration-fast"
          >
            ← Back to Projects
          </button>
        </motion.div>

        {/* Hero image */}
        <section className="relative w-full h-[60vh] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: ease.primary }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,10,14,0.3) 0%, rgba(5,10,14,0.7) 60%, #050A0E 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(5,10,14,0.8) 0%, transparent 60%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 container-edge pb-10">
            <p className="eyebrow mb-3">{project.category}</p>
            <RevealText
              as="h1"
              text={project.title}
              className="font-display font-bold text-text-primary text-display-lg max-w-4xl"
            />
          </div>
        </section>

        {/* Content */}
        <div className="container-edge max-w-[920px] mx-auto py-20">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((t) => (
                <TagPill key={t}>{t}</TagPill>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              className="font-sans text-text-muted"
              style={{ fontSize: 18, lineHeight: 1.8 }}
            >
              {OVERVIEW[slug] || project.description}
            </p>
          </FadeIn>

          {/* Project-specific blocks */}
          <ProjectContent slug={slug} project={project} />
        </div>
      </div>
    </>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-display font-bold text-2xl md:text-[28px] text-text-primary mb-6">
      {children}
    </h2>
  );
}

function GalleryImage({ src, caption, onClick }) {
  return (
    <figure className="group">
      <button
        onClick={onClick}
        className="block w-full overflow-hidden rounded border border-border hover:border-primary/60 transition-colors duration-fast"
      >
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.02]"
        />
      </button>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function NumberedSteps({ steps, variant = "step" }) {
  /* variant: "step" (large faded number behind) or "challenge" (left orange border) */
  return (
    <div className="mt-6 space-y-10">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: ease.primary, delay: i * 0.06 }}
          className={
            variant === "challenge"
              ? "relative pl-6 mb-10"
              : "relative pl-0 md:pl-2"
          }
          style={
            variant === "challenge"
              ? { borderLeft: "2px solid #FF6B2B" }
              : undefined
          }
        >
          {variant === "step" && (
            <span
              aria-hidden
              className="font-mono pointer-events-none select-none absolute top-0 left-0"
              style={{
                fontSize: "4rem",
                lineHeight: 1,
                color: "rgba(255, 107, 43, 0.15)",
                transform: "translate(-12px, -10px)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div className="relative">
            {step.heading && (
              <h3
                className={`font-display ${
                  variant === "challenge"
                    ? "font-medium text-primary"
                    : "font-bold text-text-primary"
                } text-lg mb-2`}
              >
                {step.heading}
              </h3>
            )}
            <p
              className="font-sans text-text-muted"
              style={{ fontSize: 16, lineHeight: 1.8 }}
            >
              {step.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DemonstratesBlock({ children }) {
  return (
    <div className="mt-16">
      <FadeIn>
        <SectionHeading>What This Project Demonstrates</SectionHeading>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p
          className="font-sans text-text-muted border-l-2 border-primary pl-6"
          style={{ fontSize: 16, lineHeight: 1.8 }}
        >
          {children}
        </p>
      </FadeIn>
    </div>
  );
}

function ProjectContent({ slug, project }) {
  const [lightbox, setLightbox] = useState(null);

  const open = (src, caption) => setLightbox({ src, caption });
  const close = () => setLightbox(null);

  return (
    <>
      {slug === "eye-tracking" && (
        <EyeTracking onOpen={open} youtubeId={project.youtubeId} />
      )}
      {slug === "signal-generator" && <SignalGenerator onOpen={open} />}
      {slug === "intellisite" && <IntelliSite onOpen={open} link={project.link} />}
      {slug === "parking-lot" && <ParkingLot onOpen={open} />}
      {slug === "pcb" && <PCB onOpen={open} />}

      <Lightbox
        open={!!lightbox}
        src={lightbox?.src}
        alt={lightbox?.caption}
        onClose={close}
      />
    </>
  );
}

/* Eye-Tracking */
function EyeTracking({ onOpen, youtubeId }) {
  return (
    <>
      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Watch It Work</SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div
            className="relative w-full overflow-hidden rounded border border-border"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="AI Eye-Tracking demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>The Hardware and Code</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <GalleryImage
              src="/assets/eye-tracking/car_hardware.jpeg"
              caption="RC car with Raspberry Pi 5, L298N motor driver, and LiPo battery"
              onClick={() =>
                onOpen("/assets/eye-tracking/car_hardware.jpeg", "Hardware")
              }
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <GalleryImage
              src="/assets/eye-tracking/python_screenshot.jpeg"
              caption="Real-time eye tracking pipeline running in VS Code, MediaPipe face mesh at 19.6 FPS"
              onClick={() =>
                onOpen("/assets/eye-tracking/python_screenshot.jpeg", "Code")
              }
            />
          </FadeIn>
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Key Results</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard figure="~150ms" label="End-to-End System Latency" index={0} />
          <StatCard figure="90-95%" label="Blink Detection Accuracy" index={1} />
          <StatCard figure="15 FPS" label="Stable Real-Time Processing" index={2} />
          <StatCard figure="6 States" label="Discrete Control Classes" index={3} />
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>How It Works</SectionHeading>
        </FadeIn>
        <NumberedSteps
          steps={[
            {
              heading: "Video Capture and Preprocessing",
              body:
                "An IP camera streams RTSP video to the Raspberry Pi 5 over Wi-Fi at 640x480 resolution and 15 FPS. OpenCV captures frames in a threaded buffer, discarding stale frames to prevent delay accumulation. Each frame is resized to 480x270, converted from BGR to RGB, and passed through a brightness threshold check to reject frames taken in poor lighting conditions before any processing begins.",
            },
            {
              heading: "Landmark Extraction and Iris Tracking",
              body:
                "MediaPipe Face Mesh processes each frame using a 468-point facial landmark model, focusing on 12 landmarks per eye covering the iris, eyelid corners, and eyelid edges. The iris centre is calculated as the mean position of four iris-specific landmarks. Horizontal displacement of the iris relative to the inner and outer eye corners is normalised against eye width to account for differences in eye size between users. Vertical eyelid distance is calculated separately to detect eye open or closed state.",
            },
            {
              heading: "Gaze Classification and Filtering",
              body:
                "Normalised iris displacement is passed through a threshold-based classifier mapping to six discrete control states: sharp left, gentle left, forward, gentle right, sharp right, and pause. A dwell-time filter requires the user to hold a direction for a minimum number of frames before the command is confirmed, eliminating false triggers from micro eye movements and natural blinking. An exponential smoothing filter with a factor of 0.25 stabilises the gaze signal frame to frame. Eye closure sustained for 1.2 seconds triggers the pause state. If the face leaves the frame entirely, an emergency stop overrides all other commands immediately.",
            },
            {
              heading: "Motor Actuation via Differential Drive",
              body:
                "Confirmed commands are sent to a MotorController class that maps each state to specific GPIO pin configurations on the Raspberry Pi 5. The L298N H-bridge motor driver receives 3.3V logic signals and independently controls the left and right pairs of DC motors. Forward motion sets both sides at equal PWM duty cycles. Gentle turns reduce one side by 20 to 40 percent. Sharp turns reverse one side relative to the other. A 14.8V LiPo battery powers the motors directly through the H-bridge, while a LM2596 step-down buck converter regulates a stable 5V supply to the Pi. All commands, timestamps, gaze readings, and processing times are logged to a CSV file every frame for post-session analysis.",
            },
          ]}
        />
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Challenges and How I Solved Them</SectionHeading>
        </FadeIn>
        <NumberedSteps
          variant="challenge"
          steps={[
            {
              heading: "CPU Overheating and Stream Lag",
              body:
                "Running MediaPipe at full 640x480 resolution and 25 FPS caused the Raspberry Pi 5 to overheat within minutes, introducing multi-second processing delays and making the system unusable. I diagnosed the issue using CPU temperature monitoring and profiled each stage of the pipeline. The fix was twofold: reducing the input resolution to 480x270 and capping the stream at 15 FPS, which eliminated the thermal issue while keeping detection stable. Frame buffering was also added so only the latest frame is ever processed, preventing queue buildup during brief CPU spikes.",
            },
            {
              heading: "False Triggers from Micro Eye Movements",
              body:
                "Direct mapping of raw iris displacement to motor commands caused constant false detections from natural eye micro-movements and blinks. The car would twitch and misfire on every small natural eye motion. I implemented dwell-time logic requiring a gaze direction to be held consistently across a minimum number of consecutive frames before a command is issued. On top of this an exponential smoothing filter was applied to the iris displacement value to stabilise the signal. Together these two layers reduced false triggers to near zero under normal indoor conditions.",
            },
            {
              heading: "Expanding from 4 to 6 Control States Mid-Project",
              body:
                "The initial design had four states: left, right, forward, and stop. During user testing it became clear that binary left and right with no gradient felt unnatural and made the car difficult to steer precisely. I redesigned the classification logic to include gentle and sharp variants of each direction, creating six discrete states. This required recalibrating all thresholds, retesting across multiple users, and adjusting the dwell-time window for each state class. The result was significantly smoother and more intuitive control.",
            },
            {
              heading: "Motor Voltage Drop Under Load",
              body:
                "During initial hardware testing the motors were sluggish and lacked torque, especially when turning. I traced the issue to the internal bipolar transistor configuration of the L298N H-bridge, which introduces an approximately 2V drop across the driver under load. The fix was uprating the battery supply from 7.4V to 14.8V so that sufficient voltage reached the motors after the drop. This restored full motor performance without any changes to the firmware.",
            },
          ]}
        />
      </div>

      <DemonstratesBlock>
        Real-time embedded AI deployment on constrained hardware. Computer vision
        pipeline design with OpenCV and MediaPipe. Signal filtering and noise
        rejection in firmware. Modular Python software architecture with
        safety-critical override logic. Hardware integration across GPIO, PWM,
        SPI, and motor driver interfaces. Power electronics design including buck
        converter regulation and dual-rail power distribution. Systematic root
        cause analysis and iterative debugging. Full project documentation
        including architecture diagrams, circuit schematics, and a 57-page
        engineering report.
      </DemonstratesBlock>
    </>
  );
}

/* Signal Generator */
function SignalGenerator({ onOpen }) {
  return (
    <>
      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Hardware and Schematic</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <GalleryImage
              src="/assets/sig-gen/sig_gen_hardware.jpeg"
              caption="Physical signal generator, PIC18F45K20 on breadboard with LCD display and joystick interface"
              onClick={() =>
                onOpen("/assets/sig-gen/sig_gen_hardware.jpeg", "Hardware")
              }
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <GalleryImage
              src="/assets/sig-gen/sig_gen_schematic.jpeg"
              caption="Circuit schematic, PIC18F45K20, MCP4921 DAC, LCD, and joystick in Proteus"
              onClick={() =>
                onOpen("/assets/sig-gen/sig_gen_schematic.jpeg", "Schematic")
              }
            />
          </FadeIn>
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Output Waveforms, Oscilloscope Validated</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: "/assets/sig-gen/sine.jpeg", label: "Sine Wave" },
            { src: "/assets/sig-gen/square.jpeg", label: "Square Wave" },
            { src: "/assets/sig-gen/traiangle.jpeg", label: "Triangle Wave" },
            { src: "/assets/sig-gen/ramp_up.jpeg", label: "Ramp Up" },
            { src: "/assets/sig-gen/ramp_down.jpeg", label: "Ramp Down" },
          ].map((w, i) => (
            <FadeIn key={w.label} delay={i * 0.05}>
              <button
                onClick={() => onOpen(w.src, w.label)}
                className="block w-full bg-surface border border-border hover:border-primary/60 rounded p-3 transition-colors duration-fast"
              >
                <img
                  src={w.src}
                  alt={w.label}
                  loading="lazy"
                  className="w-full h-auto rounded"
                />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-text-muted text-center">
                  {w.label}
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Key Results</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard figure="85%" label="First Class Grade" index={0} />
          <StatCard figure="6" label="Waveform Types Generated" index={1} />
          <StatCard figure="2Hz to 100Hz" label="Selectable Frequency Range" index={2} />
          <StatCard figure="0.5V to 2V" label="Adjustable Amplitude Range" index={3} />
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>How It Works</SectionHeading>
        </FadeIn>
        <NumberedSteps
          steps={[
            {
              heading: "User Interface and Parameter Selection",
              body:
                "The user navigates a menu system displayed on a 20x4 LCD screen using a joystick and two push buttons. The interface allows selection of waveform type, output frequency from six preset values at 2Hz, 5Hz, 10Hz, 20Hz, 50Hz, and 100Hz, output amplitude at 0.5V, 1V, or 2V, and DC offset at 0V, 1V, or 2V. The joystick is read via ADC on the PIC18F45K20, with debounce logic applied in firmware to prevent false navigation inputs from mechanical switch bounce.",
            },
            {
              heading: "Waveform Generation in Firmware",
              body:
                "The PIC18F45K20 generates digital waveform data in software for each selected type. Sine wave values are computed from a pre-calculated lookup table stored in program memory. Square, triangle, ramp up, and ramp down waveforms are generated algorithmically using counter logic. Pulse width is user-selectable for the pulse waveform type. Each waveform is represented as a sequence of 12-bit digital values scaled to the selected amplitude and offset before being sent to the DAC.",
            },
            {
              heading: "SPI Communication with MCP4921 DAC",
              body:
                "Digital waveform samples are transferred to the MCP4921 12-bit DAC over SPI at each output sample point. The PIC18F45K20 acts as SPI master, driving chip select, clock, and data lines. The DAC converts each 12-bit value to a proportional analogue voltage on its output pin. Output frequency is controlled by adjusting the delay between successive SPI transfers in firmware, allowing precise frequency generation across the full selectable range.",
            },
            {
              heading: "Output Validation",
              body:
                "All six waveform types were validated on a Tektronix TBS2000B digital oscilloscope, confirming correct waveshape, frequency, amplitude, and DC offset across all selectable parameter combinations. Measurements confirmed consistent output matching the intended specifications within acceptable tolerance.",
            },
          ]}
        />
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Challenges and How I Solved Them</SectionHeading>
        </FadeIn>
        <NumberedSteps
          variant="challenge"
          steps={[
            {
              heading: "SPI Clock Configuration Causing Waveform Distortion",
              body:
                "During initial testing the DAC output was severely distorted regardless of the waveform type selected. The output looked like random noise on the oscilloscope rather than any recognisable waveform. I diagnosed the issue by isolating the SPI communication stage and monitoring the clock and data lines with the oscilloscope. The problem was a mismatch between the SPI clock polarity and phase settings in firmware and the requirements specified in the MCP4921 datasheet. Correcting the CKPOL and CKE bits in the SSPCON1 register resolved the issue immediately and produced clean waveform output across all types.",
            },
            {
              heading: "Button Debounce Causing Erratic Menu Navigation",
              body:
                "The joystick and button inputs were triggering multiple navigation events from a single physical press due to mechanical contact bounce. This made the menu system unusable as parameters would skip multiple values on a single input. I implemented a software debounce routine using a delay-based approach, requiring the input to remain stable for a defined number of cycles before registering as a valid press. Internal pull-down resistors were also enabled on the input pins to prevent floating inputs from generating phantom triggers.",
            },
            {
              heading: "Merging UI Code with Waveform Generation",
              body:
                "The initial codebase had the user interface logic and waveform generation logic tightly coupled, making it difficult to update either without breaking the other. As the project grew in complexity this became a real problem during debugging. I refactored the firmware into a modular structure with separate functions for UI handling, waveform generation, and SPI communication. This separation made it far easier to isolate bugs and test each subsystem independently, which was critical during the oscilloscope validation phase.",
            },
          ]}
        />
      </div>

      <DemonstratesBlock>
        Embedded C firmware development on a PIC18F45K20 microcontroller. SPI
        peripheral configuration and DAC interfacing at the register level.
        Analogue signal generation and validation using precision lab equipment.
        LCD driver implementation and joystick ADC input processing. Modular
        firmware architecture and systematic hardware debugging. Team
        leadership, task coordination, and delivering a complex hardware-software
        project to First Class standard under deadline.
      </DemonstratesBlock>
    </>
  );
}

/* IntelliSite */
function IntelliSite({ onOpen, link }) {
  return (
    <>
      <FadeIn className="mt-12">
        <Button href={link} target="_blank">
          View Live Site →
        </Button>
      </FadeIn>

      <div className="mt-16 flex flex-col gap-6">
        {[
          {
            src: "/assets/intellisite/intelisite_1.jpeg",
            caption: "Hero section, cinematic London skyline with editorial headline",
          },
          {
            src: "/assets/intellisite/intelisite_2.jpeg",
            caption: "Services section, three engagement models with clean typographic layout",
          },
          {
            src: "/assets/intellisite/intelisite_3.jpeg",
            caption: "Pricing section, three-tier structure with highlighted recommended plan",
          },
          {
            src: "/assets/intellisite/intelisite_4.jpeg",
            caption: "Contact section, dual contact methods with integrated chat widget",
          },
        ].map((img, i) => (
          <FadeIn key={img.src} delay={i * 0.06}>
            <GalleryImage
              src={img.src}
              caption={img.caption}
              onClick={() => onOpen(img.src, img.caption)}
            />
          </FadeIn>
        ))}
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Project Stats</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard figure="Live" label="Production Deployed on Vercel" index={0} />
          <StatCard figure="End to End" label="Design, Code, Copy, Deployment" index={1} />
          <StatCard figure="3 Tiers" label="Full Pricing and Service Structure" index={2} />
          <StatCard figure="Real" label="Live Client Product" index={3} />
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>What Was Built</SectionHeading>
        </FadeIn>
        <NumberedSteps
          steps={[
            {
              heading: "Cinematic Hero Section",
              body:
                "The hero section features a full-viewport background with an editorial headline, animated subtitle, and dual CTA buttons. The design targets the psychology of a premium service buyer, leading with an emotional headline and immediately qualifying the service with a specific niche statement. The scroll indicator and layout hierarchy were designed to direct the eye naturally from headline to CTA.",
            },
            {
              heading: "Services and Pricing Architecture",
              body:
                "Three engagement models are presented using a typographic layout that communicates the value of each tier without overwhelming the visitor. The pricing section uses a highlighted recommended tier, clear feature lists, and direct CTA buttons on each tier. The structure was designed around how high-value service buyers actually make decisions.",
            },
            {
              heading: "Motion System and Micro-Interactions",
              body:
                "All animations use Framer Motion and GSAP with slow controlled eases matching the premium feel of the brand. Scroll-triggered reveals, hover states with smooth transitions, and a sticky navigation that responds to scroll direction were all implemented from scratch. No animation library templates were used.",
            },
            {
              heading: "Contact and Conversion Flow",
              body:
                "The contact section offers two routes: a direct discovery call booking and a contact form with a message field. An integrated chat widget provides immediate responses to common client questions about pricing, process, and timelines. The entire page is structured as a conversion funnel from hero to contact.",
            },
          ]}
        />
      </div>

      <DemonstratesBlock>
        Full-stack web development from design concept to live production
        deployment. React 18 component architecture with Vite build tooling.
        Advanced animation with Framer Motion and GSAP including scroll-triggered
        sequences and micro-interactions. Conversion-focused copywriting and
        layout design. Client-side routing, SEO meta management, and Vercel
        deployment pipeline. Building a real commercial product end to end with
        no team and no brief.
      </DemonstratesBlock>
    </>
  );
}

/* Parking Lot */
function ParkingLot({ onOpen }) {
  return (
    <>
      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Simulation Gallery</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              src: "/assets/parking-lot/car_parking_1.jpeg",
              caption: "Proteus simulation, display showing 00 CARS on initialisation",
            },
            {
              src: "/assets/parking-lot/car_parking_2.jpeg",
              caption: "Display showing 20 FULL, automatic lockout at capacity",
            },
            {
              src: "/assets/parking-lot/car_parking_3.jpeg",
              caption: "Display showing 09 CARS, mid-capacity real-time count",
            },
            {
              src: "/assets/parking-lot/car_parking_4.jpeg",
              caption: "Display showing 12 CARS, live vehicle tracking",
            },
          ].map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.05}>
              <GalleryImage
                src={img.src}
                caption={img.caption}
                onClick={() => onOpen(img.src, img.caption)}
              />
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Key Stats</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard figure="20 Cars" label="Maximum Tracked Capacity" index={0} />
          <StatCard figure="Assembly" label="Written Entirely in Low-Level Assembly" index={1} />
          <StatCard figure="4-Digit" label="Multiplexed 7-Segment Display" index={2} />
          <StatCard figure="2" label="Interrupt Sources: Timer0 and INT0" index={3} />
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>How It Works</SectionHeading>
        </FadeIn>
        <NumberedSteps
          steps={[
            {
              heading: "Sensor Detection and Interrupt Triggering",
              body:
                "LDR sensors positioned at the entry and exit points of the parking lot detect vehicles passing through. When a vehicle is detected, the INT0 external interrupt triggers on the rising edge of the sensor signal. The interrupt service routine reads the sensor direction state to determine whether the vehicle is entering or exiting. A software debounce routine using delay loops runs within the ISR to prevent false triggers from noise or partial sensor occlusion.",
            },
            {
              heading: "Vehicle Counting State Machine",
              body:
                "The main counting logic runs as a state machine in the foreground loop. On an entry event the car count is incremented and checked against the maximum capacity of 20. If capacity is reached the system transitions to a full state, disables the entry gate motor, and updates the display to show FULL. On an exit event the count is decremented and checked against zero to prevent underflow. All count checks and state transitions are handled with explicit bounds validation to ensure correct behaviour at boundary conditions.",
            },
            {
              heading: "Gate Motor Timing via Timer0",
              body:
                "Timer0 is configured as a periodic interrupt running at a frequency that provides the gate motor timing pulse. When a vehicle entry or exit event is confirmed, the motor control routine sets the appropriate output pins to drive the gate motor open, holds for a timed duration using the Timer0 counter, then drives the motor to close. Low-priority interrupt configuration ensures the motor timing routine does not interfere with the INT0 sensor detection interrupt. Display refresh is also managed within the Timer0 interrupt to maintain consistent multiplexing frequency.",
            },
            {
              heading: "4-Digit Multiplexed 7-Segment Display",
              body:
                "Available parking spaces are displayed on a 4-digit 7-segment display using software multiplexing. The display driver cycles through each digit at a refresh frequency managed by Timer0, activating one digit at a time and setting the appropriate segment outputs. The display shows the current car count in numeric form and switches to a FULL message pattern when capacity is reached. All digit patterns and the FULL message are stored as lookup tables in program memory.",
            },
          ]}
        />
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Challenges and How I Solved Them</SectionHeading>
        </FadeIn>
        <NumberedSteps
          variant="challenge"
          steps={[
            {
              heading: "Managing Simultaneous Interrupts Without Conflict",
              body:
                "The system required two interrupt sources running concurrently: INT0 for vehicle detection and Timer0 for motor timing and display refresh. Getting both to operate correctly without one blocking or corrupting the other required careful interrupt priority configuration. I assigned high priority to INT0 for vehicle detection and low priority to Timer0 for motor and display management. This ensured that vehicle detection was never missed due to the motor routine running, while the display refresh remained consistent.",
            },
            {
              heading: "Preventing Count Overflow and Underflow in Assembly",
              body:
                "Without high-level language constructs, overflow and underflow protection required explicit conditional checks written in Assembly after every increment and decrement operation. If the count exceeded 20 or fell below zero the system needed to clamp the value and change state correctly. Every boundary condition had to be handled manually with compare and branch instructions, requiring careful register management to avoid corrupting other state variables during the checks.",
            },
            {
              heading: "Debouncing Sensor Inputs in Low-Level Firmware",
              body:
                "LDR sensors in the Proteus simulation produced signal noise on transitions that triggered multiple INT0 interrupts from a single vehicle detection event. In Assembly there is no standard library debounce function, so I implemented a custom delay loop within the ISR that waits for a fixed number of instruction cycles and then re-reads the sensor pin. If the pin has returned low the event is treated as noise and ignored. Only sustained high states are counted as valid vehicle detections.",
            },
          ]}
        />
      </div>

      <DemonstratesBlock>
        Low-level Assembly language programming on a PIC18F45K20 microcontroller.
        Interrupt-driven architecture with multiple concurrent interrupt sources
        and priority management. Hardware simulation and validation in Proteus
        ISIS. State machine design and boundary condition handling in firmware.
        Multiplexed display driver implementation. Motor control timing using
        hardware timers. Register-level management of all peripheral interfaces
        without any abstraction layer.
      </DemonstratesBlock>
    </>
  );
}

/* PCB */
function PCB({ onOpen }) {
  return (
    <>
      <div className="mt-16 flex flex-col gap-6">
        {/* Hero image */}
        <FadeIn>
          <GalleryImage
            src="/assets/pcb/pcb_3d_1.jpeg"
            caption="3D render, top view showing OLED display, buzzer, and ESP32 module"
            onClick={() =>
              onOpen("/assets/pcb/pcb_3d_1.jpeg", "3D top view")
            }
          />
        </FadeIn>

        {/* Two-col 3D renders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <GalleryImage
              src="/assets/pcb/3d_pcb_2.jpeg"
              caption="3D render, angled view showing sensor module connections"
              onClick={() =>
                onOpen("/assets/pcb/3d_pcb_2.jpeg", "3D angled view")
              }
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <GalleryImage
              src="/assets/pcb/3d_pcb_3.jpeg"
              caption="3D render, rear view showing battery holder and USB connector"
              onClick={() =>
                onOpen("/assets/pcb/3d_pcb_3.jpeg", "3D rear view")
              }
            />
          </FadeIn>
        </div>

        {/* Two-col 2D layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={0.05}>
            <GalleryImage
              src="/assets/pcb/2d_pcb__1.jpeg"
              caption="2D PCB layout, component placement and routing"
              onClick={() =>
                onOpen("/assets/pcb/2d_pcb__1.jpeg", "2D layout")
              }
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <GalleryImage
              src="/assets/pcb/pcb_design_1.jpeg"
              caption="Multi-layer routing view, signal, power, and ground planes"
              onClick={() =>
                onOpen("/assets/pcb/pcb_design_1.jpeg", "Routing")
              }
            />
          </FadeIn>
        </div>

        {/* Schematic full-width */}
        <FadeIn>
          <GalleryImage
            src="/assets/pcb/pcb_schematic.jpeg"
            caption="Full schematic, ESP32-WROOM-32D, power management, sensor interfaces, SD card, and USB converter"
            onClick={() =>
              onOpen("/assets/pcb/pcb_schematic.jpeg", "Schematic")
            }
          />
        </FadeIn>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Key Stats</SectionHeading>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard figure="4 Layers" label="Signal, Ground Plane, Power Plane, Signal" index={0} />
          <StatCard figure="5 Sensors" label="CO2, Temp, Humidity, PM, Pressure" index={1} />
          <StatCard figure="Dual Power" label="USB and Battery with LDO Regulation" index={2} />
          <StatCard figure="Wi-Fi Ready" label="ESP32 IoT Connectivity" index={3} />
        </div>
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>How It Works</SectionHeading>
        </FadeIn>
        <NumberedSteps
          steps={[
            {
              heading: "Sensor Data Acquisition",
              body:
                "The BME280 sensor measures temperature, humidity, and barometric pressure over I2C at address 0x76. The SYP-12 CO2 sensor communicates over UART, returning CO2 concentration in parts per million. The particulate matter sensor connects via a dedicated cable header and reports PM2.5 and PM10 values. All three sensor interfaces are handled simultaneously by the ESP32 firmware, with each sensor read on its own polling interval. The CP2102-GMR USB to UART bridge provides the programming interface and serial monitoring connection.",
            },
            {
              heading: "Power Management Architecture",
              body:
                "The board supports two power inputs: USB via the USB connector and a single-cell lithium battery via a battery holder. An LDO voltage regulator steps down the input to a stable 3.3V supply rail for all digital components. The power management IC handles battery charging from USB input, monitors battery state, and drives status LEDs for low battery, charging, and data activity. A slide switch provides hard power control. Separate decoupling capacitors are placed at each IC power pin to suppress switching noise on the 3.3V rail.",
            },
            {
              heading: "PCB Layer Stackup and Signal Integrity",
              body:
                "The four-layer stackup is arranged as top signal layer, ground plane, power plane, bottom signal layer. The dedicated inner ground plane provides a low-impedance return path for all signals and acts as an electromagnetic shield between the two signal layers. The power plane distributes the 3.3V supply across the board with minimal impedance. Analogue sensor signal traces are routed on the top layer away from the digital SPI and I2C traces. Guard rings surround sensitive analogue nodes. Decoupling capacitors of 100nF and 4.7uF are placed in parallel at each power pin.",
            },
            {
              heading: "Data Display and Logging",
              body:
                "Processed sensor readings are formatted and sent to an SSD1306 OLED display over I2C, showing live values for all measured parameters. Simultaneously the ESP32 writes timestamped data records to a microSD card over SPI using the SD card module. Each record contains a Unix timestamp and readings from all active sensors. The Wi-Fi capability of the ESP32-WROOM-32D is available for future IoT data transmission, with the antenna clearance area kept free of copper on all layers in the PCB layout.",
            },
          ]}
        />
      </div>

      <div className="mt-16">
        <FadeIn>
          <SectionHeading>Challenges and How I Solved Them</SectionHeading>
        </FadeIn>
        <NumberedSteps
          variant="challenge"
          steps={[
            {
              heading: "Managing EMI Between Analogue and Digital Signals",
              body:
                "Mixed-signal PCB design requires keeping analogue sensor signals isolated from the switching noise generated by digital interfaces like SPI and I2C. On early layout iterations the analogue sensor traces ran parallel to the SPI bus traces, which would have coupled switching noise into the sensor readings. I rerouted all analogue traces to the opposite side of the board from the digital bus and added ground pour between the two routing regions. Guard rings were added around the most sensitive analogue nodes to provide a local ground reference shield.",
            },
            {
              heading: "Power Plane Integrity with Multiple Load Variations",
              body:
                "The board has several components with very different current draw profiles: the ESP32 draws significant current during Wi-Fi transmission bursts while sensors draw microamps in standby. These load variations can cause voltage droop on the 3.3V rail if decoupling is insufficient. I addressed this by placing bulk capacitors of 4.7uF near the LDO output and local 100nF bypass capacitors at every IC power pin. The power plane copper weight was specified at 2oz to handle the ESP32 peak current without significant resistive drop.",
            },
            {
              heading: "Component Placement for Thermal and Mechanical Constraints",
              body:
                "The board needed to fit all components within a compact footprint while keeping connectors accessible at the board edges and maintaining clearance around the ESP32 antenna. The OLED display and sensor connectors needed to face outward for usability. I iterated through several placement arrangements in EasyEDA, checking 3D renders at each stage to verify connector accessibility, mechanical clearance, and antenna keepout compliance before finalising the layout and routing.",
            },
          ]}
        />
      </div>

      <DemonstratesBlock>
        Four-layer mixed-signal PCB design from schematic capture to
        fabrication-ready output. ESP32 peripheral interfacing over I2C, SPI,
        and UART simultaneously. Power management circuit design with LDO
        regulation and battery charging. EMI mitigation through layer stackup,
        ground planes, guard rings, and trace routing discipline. Component
        selection and datasheet-driven design decisions. EasyEDA proficiency
        including 3D render validation and DFM checking. Self-directed technical
        learning of professional PCB design practices under project constraints.
      </DemonstratesBlock>
    </>
  );
}
