import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Services from "@/components/services";
import Cases from "@/components/cases";
import Books from "@/components/books";
import ReviewList from "@/components/review-list";
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
      <section id="reviews" className="bg-background px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <ReviewList />
          <ReviewForm />
        </div>
      </section>
    </main>
  );
}
