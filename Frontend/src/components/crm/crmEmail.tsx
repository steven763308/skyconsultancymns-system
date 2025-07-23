"use client";
import clsx from "clsx";

interface CrmEmailProps {
  selected: boolean;
  onSelect: () => void;
}

export default function CrmEmail({ selected, onSelect }: CrmEmailProps) {
  return (
    <div
      onMouseEnter={onSelect}
      onClick={onSelect}
      className={clsx(
        "cursor-pointer w-[400px] md:w-[520px] bg-white border rounded-xl p-6 shadow-md transition-all duration-300",
        selected ? "z-20 scale-[1.1]" : "z-10 scale-90 opacity-50"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">📧</span>
        <h2 className="text-lg font-semibold text-gray-800">Email 群发</h2>
      </div>
      <p className="text-gray-600 mb-4">上传电邮列表，发送电子邮件通知或促销内容。</p>

      {selected && (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📎 上传 CSV 文件</label>
            <input type="file" accept=".csv" className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📂 添加附件</label>
            <input type="file" multiple className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📝 邮件标题</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="请输入邮件标题" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📨 邮件内容</label>
            <textarea className="border rounded px-3 py-2 w-full" rows={4} placeholder="请输入邮件正文内容" />
          </div>
          <div className="text-right">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              ✉️ 发送邮件
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
