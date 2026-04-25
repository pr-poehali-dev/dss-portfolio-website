import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV_ITEMS = [
  { id: 'hero', label: '01 / Главная' },
  { id: 'about', label: '02 / О себе' },
  { id: 'portfolio', label: '03 / Портфолио' },
  { id: 'skills', label: '04 / Стек' },
  { id: 'articles', label: '05 / Статьи' },
  { id: 'contact', label: '06 / Контакт' },
];

const SKILLS = [
  { group: 'Frontend', items: [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'CSS / Tailwind', level: 88 },
    { name: 'Three.js / WebGL', level: 72 },
  ]},
  { group: 'Backend', items: [
    { name: 'Node.js / Express', level: 92 },
    { name: 'PHP / Laravel', level: 85 },
    { name: 'PostgreSQL', level: 88 },
    { name: 'Vercel / Deployment', level: 80 },
  ]},
];

const PROJECTS = [
  {
    num: '001',
    title: 'NexusOS Dashboard',
    desc: 'Корпоративная платформа управления инфраструктурой с real-time мониторингом и аналитикой',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    year: '2024',
  },
  {
    num: '002',
    title: 'CryptoVault API',
    desc: 'Высоконагруженный сервис для криптовалютных транзакций с обработкой 50k+ запросов/сек',
    tags: ['Python', 'FastAPI', 'Redis', 'Docker'],
    year: '2024',
  },
  {
    num: '003',
    title: 'Orbital CMS',
    desc: 'Headless CMS нового поколения с визуальным редактором и автоматической оптимизацией контента',
    tags: ['TypeScript', 'GraphQL', 'MongoDB', 'AWS'],
    year: '2023',
  },
  {
    num: '004',
    title: 'Pulse Analytics',
    desc: 'ML-платформа для предиктивной аналитики пользовательского поведения',
    tags: ['Python', 'TensorFlow', 'React', 'Kubernetes'],
    year: '2023',
  },
];

const ARTICLES = [
  {
    date: '12 APR 2025',
    title: 'Архитектура микрофронтендов: когда это оправдано',
    desc: 'Разбираю случаи, когда микрофронтенды решают проблемы, а не создают новые',
    tag: 'Architecture',
  },
  {
    date: '01 MAR 2025',
    title: 'WebAssembly в production: реальный опыт',
    desc: 'Как мы ускорили обработку изображений в браузере в 12 раз с помощью WASM',
    tag: 'Performance',
  },
  {
    date: '18 JAN 2025',
    title: 'PostgreSQL под нагрузкой: оптимизация запросов',
    desc: 'Практические паттерны для работы с большими таблицами и сложными join-ами',
    tag: 'Database',
  },
];

const CONTACTS = [
  { icon: 'Mail', label: 'Email', value: 'dss2284856@yandex.ru', href: 'mailto:dss2284856@yandex.ru' },
  { icon: 'Github', label: 'GitHub', value: 'github.com/NochboolPrime', href: 'https://github.com/NochboolPrime' },
  { icon: 'Users', label: 'ВКонтакте', value: 'vk.com/daniilshishkin_np', href: 'https://vk.com/daniilshishkin_np' },
  { icon: 'MessageCircle', label: 'Telegram', value: '@DaniilShishkinNPmk2', href: 'https://t.me/DaniilShishkinNPmk2' },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${3 + Math.random() * 6}s`,
  delay: `${Math.random() * 4}s`,
  color: i % 3 === 0 ? '#dc2626' : '#3b82f6',
}));

export default function Index() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.left = `${e.clientX}px`;
        cursorDot.current.style.top = `${e.clientY}px`;
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = `${e.clientX}px`;
        cursorRing.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if ((entry.target as HTMLElement).id === 'skills') setSkillsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div ref={cursorDot} className="cursor-dot hidden md:block" />
      <div ref={cursorRing} className="cursor-ring hidden md:block" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(7,12,20,0.95), transparent)' }}>
        <button onClick={() => scrollTo('hero')}
          className="font-orbitron font-black text-lg tracking-widest"
          style={{ color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)' }}>
          DSS
        </button>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? '!text-cyan-400' : ''}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button className="md:hidden text-cyan-400" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(7,12,20,0.97)' }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="font-mono text-base tracking-widest uppercase text-white/70 hover:text-cyan-400 transition-colors">
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
            style={{ background: 'radial-gradient(circle, #dc2626, transparent)' }} />
        </div>

        {PARTICLES.map((p) => (
          <div key={p.id} className="particle" style={{
            left: p.left,
            bottom: '0',
            background: p.color,
            '--duration': p.duration,
            '--delay': p.delay,
          } as React.CSSProperties} />
        ))}

        {/* DSS 3D block */}
        <div className="relative flex flex-col items-center dss-container" style={{ marginTop: '-40px' }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
            <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
              <div className="orbit-ring orbit-ring-1 w-full h-full absolute">
                <div className="orbit-dot" />
              </div>
              <div className="orbit-ring orbit-ring-2 absolute" style={{ inset: '20px' }}>
                <div className="orbit-dot" style={{ background: '#dc2626', boxShadow: '0 0 8px #dc2626' }} />
              </div>
              <div className="orbit-ring orbit-ring-3 absolute" style={{ inset: '50px' }}>
                <div className="orbit-dot" />
              </div>
            </div>
          </div>

          <div className="relative flex items-end gap-1 md:gap-3" style={{ zIndex: 1 }}>
            <span className="dss-letter" data-letter="D">D</span>
            <span className="dss-letter" data-letter="S">S</span>
            <span className="dss-letter" data-letter="S">S</span>
          </div>

          <div className="mt-4 md:mt-6 text-center" style={{ zIndex: 1 }}>
            <div className="font-mono text-xs md:text-sm tracking-[0.5em] uppercase text-white/30">
              Daniil&nbsp;&nbsp;Sergeevich&nbsp;&nbsp;Shishkin
            </div>
          </div>
        </div>

        <div className="relative mt-10 md:mt-14 text-center px-4" style={{ zIndex: 1 }}>
          <div className="section-label mb-3">Fullstack Developer</div>
          <h1 className="glitch font-ibm font-light text-2xl md:text-4xl text-white/90 max-w-2xl leading-tight"
            data-text="Строю продукты от идеи до production">
            Строю продукты от идеи до production
          </h1>
          <div className="mt-3 font-mono text-xs text-white/30 type-cursor">5+ лет в разработке · React · NodeJS · PostgreSQL</div>
        </div>

        <div className="relative mt-10 flex flex-col sm:flex-row gap-4" style={{ zIndex: 1 }}>
          <button className="neon-btn" onClick={() => scrollTo('portfolio')}>
            Смотреть работы
          </button>
          <button className="neon-btn" onClick={() => scrollTo('contact')}
            style={{ borderColor: 'rgba(123,47,255,0.6)', color: '#b794ff' }}>
            Написать
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="font-mono text-xs tracking-widest">SCROLL</div>
          <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(0,229,255,0.2)' }}>
            <div className="scan-line" style={{ animationDuration: '2s' }} />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative py-32 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="scan-line" />
        <div className="reveal grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-num">02</div>
            <div className="section-label -mt-4 mb-4">О себе</div>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
              Код — это<br />
              <span style={{ color: 'var(--cyan)' }}>архитектура мысли</span>
            </h2>
            <div className="space-y-4 font-ibm text-white/60 leading-relaxed">
              <p>
                Меня зовут <span className="text-white">Даниил Шишкин</span>. Создаю цифровые продукты,
                которые живут на стыке функциональности и эстетики. Пишу код, который легко читать,
                тестировать и масштабировать.
              </p>
              <p>
                Специализируюсь на построении полного цикла разработки: от проектирования баз данных
                и backend API до интерфейсов, от которых не хочется уходить.
              </p>
              <p>
                Верю, что хорошее ПО — это не только рабочий код, но и продуманная
                архитектура, понятная документация и ответственность за результат.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-72 h-72 mx-auto">
              <div className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,47,255,0.08))',
                  border: '1px solid rgba(0,229,255,0.2)',
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                }} />
              <div className="absolute inset-4 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                  background: 'rgba(0,229,255,0.03)',
                }}>
                <div className="text-center">
                  <div className="font-orbitron font-black text-6xl"
                    style={{ color: 'var(--cyan)', textShadow: '0 0 40px var(--cyan)' }}>
                    DSS
                  </div>
                  <div className="font-mono text-xs text-white/30 mt-2 tracking-widest">FULLSTACK</div>
                </div>
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div key={deg} className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: 'var(--cyan)',
                    boxShadow: '0 0 8px var(--cyan)',
                    top: `${50 - 46 * Math.cos(deg * Math.PI / 180)}%`,
                    left: `${50 + 46 * Math.sin(deg * Math.PI / 180)}%`,
                    transform: 'translate(-50%,-50%)',
                  }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { num: '5+', label: 'лет опыта' },
                { num: '40+', label: 'проектов' },
                { num: '15+', label: 'клиентов' },
              ].map((stat) => (
                <div key={stat.num} className="tech-card corner-tl p-4 text-center">
                  <div className="font-orbitron font-bold text-2xl" style={{ color: 'var(--cyan)' }}>
                    {stat.num}
                  </div>
                  <div className="font-mono text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="relative py-32 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <div className="section-num">03</div>
          <div className="section-label -mt-4 mb-2">Портфолио</div>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Избранные<br />
            <span style={{ color: 'var(--cyan)' }}>проекты</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div key={project.num}
              className="reveal tech-card corner-tl p-8 group cursor-pointer"
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-6">
                <div className="font-mono text-xs text-white/20">{project.num}</div>
                <div className="font-mono text-xs text-white/30">{project.year}</div>
              </div>
              <h3 className="font-orbitron font-bold text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="font-ibm text-sm text-white/50 leading-relaxed mb-6">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-3 py-1"
                    style={{
                      border: '1px solid rgba(0,229,255,0.2)',
                      color: 'rgba(0,229,255,0.7)',
                      background: 'rgba(0,229,255,0.04)',
                    }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-white/20 group-hover:text-cyan-400 transition-colors">
                <span className="font-mono text-xs tracking-widest">VIEW PROJECT</span>
                <Icon name="ArrowRight" size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="relative py-32 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <div className="section-num">04</div>
          <div className="section-label -mt-4 mb-2">Технологии</div>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Технический<br />
            <span style={{ color: 'var(--cyan)' }}>стек</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {SKILLS.map((group, gi) => (
            <div key={group.group} className="reveal" style={{ transitionDelay: `${gi * 0.2}s` }}>
              <div className="font-mono text-xs tracking-widest mb-6 text-white/40 uppercase">
                — {group.group}
              </div>
              <div className="space-y-6">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-ibm text-sm text-white/70">{skill.name}</span>
                      <span className="font-mono text-xs" style={{ color: 'var(--cyan)' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill"
                        style={{
                          width: skillsVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(gi * 4 + si) * 0.15}s`,
                        }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-16">
          <div className="font-mono text-xs tracking-widest mb-6 text-white/30 uppercase text-center">
            Также работаю с
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Redis', 'GraphQL', 'AWS', 'Nginx', 'Git', 'CI/CD', 'Vercel', 'REST API'].map((tech) => (
              <span key={tech} className="font-mono text-xs px-4 py-2"
                style={{
                  border: '1px solid rgba(123,47,255,0.25)',
                  color: 'rgba(183,134,255,0.7)',
                  background: 'rgba(123,47,255,0.04)',
                }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARTICLES ─── */}
      <section id="articles" className="relative py-32 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <div className="section-num">05</div>
          <div className="section-label -mt-4 mb-2">Публикации</div>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Статьи и<br />
            <span style={{ color: 'var(--cyan)' }}>мысли</span>
          </h2>
        </div>
        <div className="space-y-10 max-w-3xl">
          {ARTICLES.map((article, i) => (
            <div key={i} className="reveal article-card" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-xs text-white/30">{article.date}</span>
                <span className="font-mono text-xs px-2 py-0.5"
                  style={{ border: '1px solid rgba(0,229,255,0.2)', color: 'rgba(0,229,255,0.6)' }}>
                  {article.tag}
                </span>
              </div>
              <h3 className="font-ibm font-medium text-lg text-white mb-2 hover:text-cyan-400 transition-colors cursor-pointer">
                {article.title}
              </h3>
              <p className="font-ibm text-sm text-white/40 leading-relaxed">{article.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-white/25 hover:text-cyan-400 transition-colors cursor-pointer">
                <span className="font-mono text-xs tracking-widest">ЧИТАТЬ</span>
                <Icon name="ArrowRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative py-32 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <div className="section-num">06</div>
          <div className="section-label -mt-4 mb-2">Контакт</div>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white">
            Начнём<br />
            <span style={{ color: 'var(--cyan)' }}>сотрудничество?</span>
          </h2>
          <p className="font-ibm text-white/40 mt-4 max-w-md leading-relaxed">
            Открыт к новым проектам и интересным задачам. Напишите — отвечу в течение суток.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          {CONTACTS.map((contact) => (
            <a key={contact.label} href={contact.href}
              className="contact-item flex items-center gap-4 no-underline">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: 'rgba(0,229,255,0.06)',
                  border: '1px solid rgba(0,229,255,0.15)',
                }}>
                <Icon name={contact.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-cyan-400" />
              </div>
              <div>
                <div className="font-mono text-xs text-white/30 uppercase tracking-widest">{contact.label}</div>
                <div className="font-ibm text-sm text-white/70 mt-0.5">{contact.value}</div>
              </div>
              <Icon name="ArrowRight" size={14} className="ml-auto text-white/20" />
            </a>
          ))}
        </div>

        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-orbitron font-black text-2xl tracking-wider"
            style={{ color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)' }}>
            DSS
          </div>
          <div className="font-mono text-xs text-white/20 tracking-widest">
            DANIIL SERGEEVICH SHISHKIN · FULLSTACK DEVELOPER · 2025
          </div>
        </div>
      </section>
    </div>
  );
}