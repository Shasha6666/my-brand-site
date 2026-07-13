export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 主视觉区 */}
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground">主视觉区 (Hero)</h2>
      </section>

      {/* 技能区 */}
      <section id="skills" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground">技能区 (Skills)</h2>
      </section>

      {/* 服务区 */}
      <section id="services" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground">服务区 (Services)</h2>
      </section>

      {/* 案例区 */}
      <section id="cases" className="min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground">案例区 (Cases)</h2>
      </section>

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
