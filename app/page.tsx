import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Services from "@/components/services";
import Cases from "@/components/cases";
import Books from "@/components/books";
import ReviewForm from "@/components/review-form";

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
      <ReviewForm />
    </main>
  );
}
