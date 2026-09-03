import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  ExternalLink,
  Globe2,
  Layers3,
  Menu,
  Send,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

type Service = {
  number: string;
  icon: typeof Code2;
  title: string;
  description: string;
  items: string[];
};

const navItems = [
  { label: "Serviços", id: "servicos" },
  { label: "Stacks", id: "stacks" },
  { label: "Como funciona", id: "processo" },
  { label: "Sobre", id: "sobre" },
];

const whatsappUrl = "https://wa.me/5553981302738?text=Ol%C3%A1%20Jos%C3%A9%2C%20vim%20pela%20JLA%20Code%20e%20quero%20conversar%20sobre%20um%20projeto.";
const stacksImageUrl = "https://cdn.builder.io/api/v1/image/assets%2F34c927a2b3bc48b0b51a4de5a6650545%2Fdb6548fba031449b829db4b5d6a17e43?format=webp&width=800&height=1200";

const stackGroups = [
  {
    category: "Frontend",
    description: "Interfaces rápidas, responsivas e pensadas para pessoas.",
    technologies: ["React", "TypeScript", "Astro", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    category: "Backend & dados",
    description: "A base segura para produtos que precisam crescer com consistência.",
    technologies: ["Node.js", "Express", "PHP", "MySQL", "REST APIs & JSON"],
  },
  {
    category: "Infraestrutura",
    description: "Ambientes organizados para manter tudo disponível e protegido.",
    technologies: ["Git & GitHub", "Linux", "Redes", "Backup", "Segurança"],
  },
];

const services: Service[] = [
  {
    number: "01",
    icon: Globe2,
    title: "Desenvolvimento web",
    description:
      "Sites e sistemas que traduzem sua ideia em uma experiência digital rápida, clara e pronta para crescer.",
    items: ["Sites institucionais", "Landing pages", "Sistemas sob medida"],
  },
  {
    number: "02",
    icon: Wrench,
    title: "Suporte técnico",
    description:
      "Tecnologia funcionando sem complicação para você trabalhar com segurança, performance e tranquilidade.",
    items: ["Diagnóstico e manutenção", "Configuração de equipamentos", "Orientação para sua rotina"],
  },
  {
    number: "03",
    icon: Layers3,
    title: "Estratégia digital",
    description:
      "Um olhar técnico e humano para organizar sua presença online e transformar objetivos em próximos passos.",
    items: ["Arquitetura de soluções", "Otimização de presença", "Consultoria prática"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Entender",
    description: "A conversa começa pelo seu contexto, desafio e pelo que você quer colocar de pé.",
  },
  {
    number: "02",
    title: "Construir",
    description: "Desenhamos a solução certa e transformamos o plano em algo funcional, bonito e simples de usar.",
  },
  {
    number: "03",
    title: "Evoluir",
    description: "Você não fica sozinho depois da entrega. A tecnologia acompanha o ritmo do seu negócio.",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-70, 70]);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden border-y border-primary/20 bg-[#172319] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_center,hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px]" />
      <motion.div style={{ y }} className="pointer-events-none absolute -left-10 top-1/2 -z-10 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(7rem,22vw,20rem)] font-bold leading-none tracking-[-0.12em] text-primary/[0.06]">
        JLA CODE
      </motion.div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="relative mx-auto max-w-4xl text-center">
          <p className="section-kicker">/ tecnologia em movimento</p>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.07em] text-foreground sm:text-6xl lg:text-7xl">
            A melhor stack é a que faz o seu projeto <span className="text-primary">avançar.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Ferramentas modernas, escolhas conscientes e uma implementação que não cria complexidade onde ela não precisa existir.
          </p>
          <button type="button" onClick={() => scrollToSection("contato")} className="group mt-9 inline-flex items-center gap-2 rounded-full border border-primary/50 px-5 py-3 text-sm font-bold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
            Encontrar a stack certa <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function BrandMark() {
  return (
    <div className="flex items-center gap-3" aria-label="JLA Code">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
        <span className="font-display text-sm font-bold tracking-[-0.08em]">JLA</span>
        <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" />
      </span>
      <span className="font-display text-lg font-bold tracking-[-0.04em] text-foreground">
        JLA <span className="text-primary">Code</span>
      </span>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handleNavClick(id: string) {
    scrollToSection(id);
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <button type="button" aria-label="Ir para o início" onClick={() => handleNavClick("inicio")}>
            <BrandMark />
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => handleNavClick("contato")}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Vamos conversar
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-border p-2 text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-border/60 bg-background px-5 py-5 md:hidden" aria-label="Menu mobile">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-muted-foreground hover:bg-card hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                Falar no WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="relative isolate overflow-hidden border-b border-border/60">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(183,243,77,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(183,243,77,0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="pointer-events-none absolute -right-32 top-16 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
          <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pt-24 lg:px-10 lg:pb-20 lg:pt-28">
            <div className="grid items-end gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
              <Reveal>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-primary sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  Tecnologia com propósito
                </div>
                <h1 className="max-w-4xl font-display text-[3.5rem] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground sm:text-7xl lg:text-[6.5rem]">
                  Código que <span className="text-primary">resolve.</span>
                  <br />
                  Presença que <span className="text-muted-foreground">cresce.</span>
                </h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Desenvolvimento web e suporte técnico para transformar ideias em soluções digitais que funcionam de verdade — do primeiro clique ao próximo nível.
                </p>
                <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => handleNavClick("contato")}
                    className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(183,243,77,0.18)]"
                  >
                    Tirar ideia do papel
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick("servicos")}
                    className="group inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    Explorar serviços
                    <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </button>
                </div>
              </Reveal>

              <Reveal delay={0.15} className="relative mx-auto w-full max-w-[500px] lg:mb-1">
                <div className="absolute -inset-3 rounded-[28px] border border-primary/10" />
                <div className="relative overflow-hidden rounded-[22px] border border-border bg-card shadow-2xl shadow-black/25">
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">jla-code / profile.tsx</span>
                    </div>
                    <Code2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="px-5 py-7 font-mono text-xs leading-7 sm:px-8 sm:py-9 sm:text-sm sm:leading-8">
                    <div><span className="text-primary">const</span> <span className="text-foreground">jlaCode</span> = &#123;</div>
                    <div className="pl-5"><span className="text-muted-foreground">nome:</span> <span className="text-primary">&quot;José Luis Aldrighi&quot;</span>,</div>
                    <div className="pl-5"><span className="text-muted-foreground">foco:</span> [</div>
                    <div className="pl-10"><span className="text-primary">&quot;web que conecta&quot;</span>,</div>
                    <div className="pl-10"><span className="text-primary">&quot;tecnologia acessível&quot;</span>,</div>
                    <div className="pl-10"><span className="text-primary">&quot;problemas resolvidos&quot;</span></div>
                    <div className="pl-5">],</div>
                    <div className="pl-5"><span className="text-muted-foreground">status:</span> <span className="inline-flex items-center gap-1.5 text-primary"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> disponível</span></div>
                    <div>&#125;;</div>
                    <div className="mt-5 border-t border-border pt-5 text-muted-foreground"><span className="text-primary">export default</span> jlaCode;</div>
                  </div>
                  <div className="flex items-center justify-between bg-primary px-5 py-3.5 text-primary-foreground sm:px-8">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]">feito para funcionar</span>
                    <span className="font-mono text-[10px]">{currentYear} — agora</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-20 grid grid-cols-2 border-y border-border py-6 sm:grid-cols-4 sm:py-8">
              {[
                ["01", "visão técnica"],
                ["02", "olhar humano"],
                ["03", "solução prática"],
                ["04", "parceria real"],
              ].map(([number, label], index) => (
                <div key={number} className={`flex items-center gap-3 px-3 py-2 sm:px-5 ${index > 1 ? "border-t border-border sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""}`}>
                  <span className="font-mono text-xs text-primary">{number}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground sm:text-sm">{label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <p className="section-kicker">/ o que eu faço</p>
              <h2 className="mt-5 max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl">
                Tecnologia boa é a que deixa tudo mais <span className="text-primary">simples.</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
                Cada projeto começa com uma pergunta: como a tecnologia pode trabalhar melhor a favor de você?
              </p>
              <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary"><ArrowDownRight className="h-4 w-4" /></span>
                Soluções sob medida
              </div>
            </Reveal>

            <div className="divide-y divide-border border-y border-border">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.number}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: Number(service.number) * 0.06 }}
                    className="group grid gap-5 py-8 sm:grid-cols-[64px_1fr_auto] sm:gap-6 sm:py-10"
                  >
                    <div className="flex items-start justify-between sm:block">
                      <span className="font-mono text-xs text-primary">{service.number}</span>
                      <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary sm:mt-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground">{service.title}</h3>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{service.description}</p>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {service.items.map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80"><Check className="h-3.5 w-3.5 text-primary" />{item}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 text-border transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:block" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="stacks" className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <div className="grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <Reveal>
                <p className="section-kicker">/ stacks que domino</p>
                <h2 className="mt-5 max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl">
                  A ferramenta muda. O cuidado com a <span className="text-primary">entrega</span> fica.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
                  A tecnologia é escolhida de acordo com o problema — não o contrário. Este é o repertório que uso para criar, conectar e manter soluções digitais.
                </p>
                <div className="mt-9 overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={stacksImageUrl} alt="Exemplo visual das tecnologias usadas pela JLA Code" className="h-full w-full object-cover object-top opacity-75 grayscale transition duration-700 hover:scale-105 hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">ferramentas para criar melhor</span>
                  </div>
                </div>
              </Reveal>

              <div className="space-y-0 divide-y divide-border border-y border-border">
                {stackGroups.map((group, index) => (
                  <Reveal key={group.category} delay={index * 0.08} className="py-8 sm:py-9">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                      <div className="min-w-[145px]">
                        <span className="font-mono text-xs text-primary">0{index + 1}</span>
                        <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.05em]">{group.category}</h3>
                      </div>
                      <div className="max-w-sm sm:pt-1">
                        <p className="text-sm leading-6 text-muted-foreground">{group.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {group.technologies.map((technology) => (
                            <span key={technology} className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground/80">{technology}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ParallaxBand />

        <section id="processo" className="border-y border-border bg-card/50">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div>
                <p className="section-kicker">/ como funciona</p>
                <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl">
                  Do desafio ao <span className="text-primary">resultado.</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted-foreground">Um processo direto, transparente e construído para fazer sentido para a sua realidade.</p>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {processSteps.map((step) => (
                <article key={step.number} className="bg-background p-7 sm:p-9 lg:p-10">
                  <span className="font-mono text-xs text-primary">{step.number}</span>
                  <h3 className="mt-16 font-display text-3xl font-semibold tracking-[-0.05em]">{step.title}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{step.description}</p>
                  <div className="mt-8 h-px w-12 bg-primary" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -left-4 -top-4 h-20 w-20 border-l border-t border-primary/50" />
              <div className="absolute -bottom-4 -right-4 h-20 w-20 border-b border-r border-primary/50" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#172319] via-card to-[#0b0f0c] p-6 sm:p-8">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">sobre / jla</span>
                    <Cpu className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="mb-6 h-20 w-20 rounded-full border border-primary/40 bg-primary/10 p-2">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-primary font-display text-2xl font-bold tracking-[-0.08em] text-primary-foreground">JL</div>
                    </div>
                    <p className="font-display text-3xl font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-4xl">José Luis<br /><span className="text-primary">Aldrighi.</span></p>
                    <p className="mt-4 max-w-[220px] font-mono text-xs leading-5 text-muted-foreground">desenvolvedor web<br />& técnico em informática</p>
                  </div>
                  <div className="flex items-end justify-between border-t border-border pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">jla code</span>
                    <span className="text-2xl text-primary">↗</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="section-kicker">/ por trás do código</p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Técnica para construir. <span className="text-primary">Curiosidade</span> para ir além.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                A JLA Code nasce da vontade de usar a tecnologia de um jeito mais próximo, objetivo e útil. Sem termos complicados quando eles não ajudam. Sem soluções prontas quando o seu contexto pede outra coisa.
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                É desenvolvimento com visão de negócio e suporte técnico com atenção aos detalhes — uma parceria para você avançar com mais confiança.
              </p>
              <a
                href="https://www.linkedin.com/in/joseluisaldrighi/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-2 text-sm font-bold text-foreground transition-colors hover:text-primary"
              >
                Conheça minha trajetória <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="contato" className="border-t border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-24 lg:px-10 lg:py-28">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/60">/ vamos conversar</p>
              <h2 className="mt-6 max-w-xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-7xl">
                Tem um desafio? <span className="text-primary-foreground/50">Manda pra cá.</span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-primary-foreground/70 sm:text-lg">
                Me conte um pouco sobre o que você precisa. A primeira conversa é sem compromisso e já pode clarear bastante o caminho.
              </p>
              <div className="mt-10 flex flex-col items-start gap-5">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-primary-foreground/60">
                  <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                  Responderei assim que possível
                </div>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary-foreground underline decoration-primary-foreground/40 underline-offset-8 transition-opacity hover:opacity-70">
                  Ou fale diretamente pelo WhatsApp <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-primary-foreground p-6 text-foreground shadow-2xl shadow-[#26340d]/20 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[320px] flex-col items-start justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-6 w-6" /></div>
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.05em]">Mensagem recebida.</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Obrigado por compartilhar. Este é o começo de uma boa conversa.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-8 text-sm font-bold text-foreground underline decoration-primary underline-offset-4">Enviar outra mensagem</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Seu nome</label>
                    <input id="nome" name="nome" required placeholder="Como posso te chamar?" className="w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Seu e-mail</label>
                    <input id="email" name="email" type="email" required placeholder="voce@exemplo.com" className="w-full border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="mensagem" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">O que você precisa?</label>
                    <textarea id="mensagem" name="mensagem" required rows={4} placeholder="Conte um pouco sobre seu projeto ou desafio..." className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary" />
                  </div>
                  <button type="submit" className="group mt-2 inline-flex w-full items-center justify-between rounded-full bg-foreground px-5 py-4 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">
                    Enviar mensagem
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <BrandMark />
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">desenvolvimento com intenção © {currentYear}</p>
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/in/joseluisaldrighi/" target="_blank" rel="noreferrer" className="text-xs font-semibold text-muted-foreground hover:text-primary">LinkedIn</a>
            <button type="button" onClick={() => handleNavClick("inicio")} className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">Voltar ao topo <ChevronDown className="h-3.5 w-3.5 rotate-180" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
