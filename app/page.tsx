import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Services from "@/components/services";
import Cases from "@/components/cases";

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
      <section id="books" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground">图书区 (Books)</h2>
      </section>

      {/* 评价区 */}
      <section id="reviews" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground">评价区 (Reviews)</h2>
      </section>
    </main>
  );
}
