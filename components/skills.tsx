const SKILLS = [
  { emoji: "🤖", label: "AI 开发" },
  { emoji: "🌐", label: "HTML" },
  { emoji: "🔷", label: "TypeScript" },
  { emoji: "💚", label: "vue框架" },
  { emoji: "📱", label: "小程序开发" },
  { emoji: "⚛️", label: "react框架" },
  { emoji: "🐍", label: "python" },
  { emoji: "📊", label: "数据标注" },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* 标题 */}
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          技能专长
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          多年积累，全栈覆盖
        </p>

        {/* 技能标签 */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill.label}
              className="group inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand-primary)/0.25)] bg-[hsl(var(--brand-primary)/0.06)] px-5 py-2.5 text-base font-medium text-foreground transition-transform duration-300 hover:scale-105"
            >
              <span className="text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                {skill.emoji}
              </span>
              {skill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
