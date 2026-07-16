import Image from "next/image";

const BOOKS = [
  {
    cover: "/books/book-cangjie-tujie1.png",
    title: "《图解仓颉编程：基础篇》",
    link: "https://www.epubit.com/bookDetails?id=UB88c66222d7866",
  },
  {
    cover: "/books/book-cangjie-tujie2.png",
    title: "《图解仓颉编程：高级篇》",
    link: "https://www.epubit.com/bookDetails?id=UB88c6694b7a67f",
  },
  {
    cover: "/books/book-cangjie-kuaisu.png",
    title: "《仓颉编程快速上手》",
    link: "https://www.epubit.com/bookDetails?id=UB88c64805b0439",
  },
  {
    cover: "/books/book-harmonyos-kuaisu.png",
    title: "《鸿蒙原生应用开发：ArkTS语言快速上手》",
    link: "https://www.epubit.com/bookDetails?id=UB88c64fabd7daf",
  },
  {
    cover: "/books/book-harmonyos-shizhan.png",
    title: "《鸿蒙应用开发实战》",
    link: "https://www.epubit.com/bookDetails?id=UB7812f8a7377b2",
  },
];

export default function Books() {
  return (
    <section id="books" className="bg-[#edf0f5] px-6 py-24 sm:px-8 dark:bg-[var(--section-alt)]">
      <div className="mx-auto max-w-6xl">
        {/* 标题 */}
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
          图书展示
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          技术沉淀，用文字传递知识
        </p>

        {/* 图书网格 */}
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {BOOKS.map((book) => (
            <a
              key={book.title}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-card"
            >
              {/* 封面区域 */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* hover 购买按钮 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/30">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    点击购买
                  </span>
                </div>
              </div>
              {/* 书名 */}
              <h3 className="text-center text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-[hsl(var(--brand-primary))]">
                {book.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
