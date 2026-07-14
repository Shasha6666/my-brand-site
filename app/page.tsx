import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Services from "@/components/services";
import Cases from "@/components/cases";
import Books from "@/components/books";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 主视觉区 */}
      <Hero />

      {/* 技能区 */}
      <Skills />

      {/* 服务区 */}
      <Services />

      {/* 案例区 */}
      <Cases />

      {/* 图书区 */}
      <Books />

      {/* 评价区 */}
      <section id="reviews" className="bg-background px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            客户评价
          </h2>
          <p className="mt-3 text-muted-foreground">
            来自客户的真实反馈
          </p>
          <div className="mt-12 flex items-center justify-center rounded-xl border-2 border-dashed border-border py-20">
            <span className="text-lg text-muted-foreground">
              🚧 即将上线
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
