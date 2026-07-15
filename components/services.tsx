const SERVICES = [
  {
    emoji: "💻",
    name: "软件开发",
    desc: "企业官网、移动 App、小程序、桌面应用，从需求到上线全流程交付",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    emoji: "🎓",
    name: "软件培训",
    desc: "AI 编程、全栈开发、团队技术培训，零基础也能快速上手",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    emoji: "💡",
    name: "技术咨询",
    desc: "架构设计、技术选型、性能优化，一对一解决技术难题",
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#edf0f5] px-6 py-24 sm:px-8 dark:bg-[var(--section-alt)]">
      <div className="mx-auto max-w-5xl">
        {/* 标题 */}
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          我的服务
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          专业可靠，让你的想法落地
        </p>

        {/* 服务卡片 */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-card"
            >
              {/* 顶部彩色渐变条 */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`}
              />
              {/* 卡片内容 */}
              <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                <span className="text-5xl leading-none transition-transform duration-500 group-hover:scale-110">
                  {service.emoji}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
