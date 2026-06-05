import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter"; // 需要安装

// 获取所有学习记录
async function getRecords() {
  const recordsDir = path.join(process.cwd(), "content/records");
  const filenames = fs.readdirSync(recordsDir);

  const records = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(recordsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      // 从文件名生成 slug（去掉 .md）
      const slug = filename.replace(/\.md$/, "");

      // 取内容前150字作为摘要
      const excerpt = content.replace(/[#*`\n]/g, " ").substring(0, 150) + "...";

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        tags: data.tags || [],
        excerpt,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1)); // 按日期倒序

  return records;
}

export default async function RecordsPage() {
  const records = await getRecords();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">学习记录</h1>
      {records.length === 0 ? (
        <p className="text-gray-500">还没有记录，开始写吧。</p>
      ) : (
        <div className="space-y-6">
          {records.map((record) => (
            <article key={record.slug} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <Link href={`/records/${record.slug}`}>
                <h2 className="text-xl font-semibold text-gray-800 mb-1 hover:text-blue-600 transition">
                  {record.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-500 mb-2">
                {record.date && <span>{record.date}</span>}
                {record.tags.length > 0 && (
                  <span className="ml-3">
                    {record.tags.map((tag: string) => (
                      <span key={tag} className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs mr-1">
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{record.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}