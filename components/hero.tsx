"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0826] via-[#150e38] to-[#1e1050]"
    >
      {/* 星云光斑 */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-[8%] -top-[16%] h-[40%] w-[40%] rounded-full bg-[hsl(var(--brand-primary))] blur-[100px]"
          style={{ animation: "breathe 4s ease-in-out infinite", animationDelay: "0s" }}
        />
        <div
          className="absolute -right-[8%] top-[8%] h-[35%] w-[35%] rounded-full bg-[hsl(var(--brand-accent))] blur-[90px]"
          style={{ animation: "breathe 4s ease-in-out infinite", animationDelay: "1.3s" }}
        />
        <div
          className="absolute bottom-[-8%] left-[25%] h-[30%] w-[30%] rounded-full bg-[hsl(var(--brand-primary))] blur-[70px]"
          style={{ animation: "breathe 4s ease-in-out infinite", animationDelay: "2.6s" }}
        />
        <div
          className="absolute -bottom-[4%] -right-[4%] h-[25%] w-[25%] rounded-full bg-[hsl(var(--brand-accent))] blur-[50px]"
          style={{ animation: "breathe 4s ease-in-out infinite", animationDelay: "0.7s" }}
        />
      </div>

      {/* 内容区 */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        {/* 圆形头像 — 外层负责入场动画，内层负责浮动 */}
        <div style={{ animation: "fadeInUp 0.7s ease-out forwards" }}>
          <div
            className="h-32 w-32 overflow-hidden rounded-full ring-4 ring-[hsl(var(--brand-primary)/0.6)] shadow-[0_0_50px_hsl(var(--brand-primary)/0.35)]"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <Image
              src="/avatar/me.jpg"
              alt="头像"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* 名字 — 白到浅蓝渐变 */}
        <h1
          className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-4xl font-bold sm:text-5xl"
          style={{ animation: "fadeInUp 0.7s ease-out 0.3s both" }}
        >
          ss的品牌站
        </h1>

        {/* 介绍语 */}
        <p
          className="max-w-md text-lg text-blue-300/70"
          style={{ animation: "fadeInUp 0.7s ease-out 0.6s both" }}
        >
          专注软件开发和培训，帮你把想法变成产品
        </p>
      </div>

      {/* 动画关键帧 */}
      <style jsx>{`
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
