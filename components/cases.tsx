import Image from "next/image";

const CASES = [
  {
    image: "/cases/case-restaurant.jpg",
    name: "某餐饮品牌官网",
    desc: "为本地连锁餐厅开发的品牌展示网站",
  },
  {
    image: "/cases/case-desktop.jpg",
    name: "团队协作桌面工具",
    desc: "任务看板、文件共享、即时通讯，支持 Windows/macOS/Linux",
  },
  {
    image: "/cases/case-extension.jpg",
    name: "SmartTab AI 网页助手",
    desc: "Chrome 插件，选中即翻译、一键总结、智能问答",
  },
  {
    image: "/cases/case-harmonyos.jpg",
    name: "智慧出行鸿蒙 App",
    desc: "路线规划、实时公交、多设备协同",
  },
  {
    image: "/cases/case-mobile.jpg",
    name: "生活记账 App",
    desc: "收支记录、分类统计、预算管理，四端覆盖",
  },
  {
    image: "/cases/case-openclaw.jpg",
    name: "OpenClaw AI 助手",
    desc: "基于 OpenClaw 的智能助手，本地运行，隐私优先",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="bg-background px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* 标题 */}
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          项目案例
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          用作品说话，每一个项目都用心交付
        </p>

        {/* 案例卡片网格 */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <div
              key={c.name}
              className="group flex flex-col overflow-hidden rounded-xl bg-[hsl(var(--brand-primary)/0.06)] shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* 截图 */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* 信息 */}
              <div className="flex flex-col gap-1.5 px-5 py-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {c.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
