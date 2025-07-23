"use client";
import clsx from "clsx";

interface CrmWhatsappProps {
  selected: boolean;
  onSelect: () => void;
}

export default function CrmWhatsapp({ selected, onSelect }: CrmWhatsappProps) {
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
        <span className="text-2xl">💬</span>
        <h2 className="text-lg font-semibold text-gray-800">WhatsApp 群发</h2>
      </div>
      <p className="text-gray-600 mb-4">上传客户号码，快速通过 WhatsApp 发送推广信息。</p>

      {selected && (
        <div className="space-y-4 border-t pt-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📎 上传 CSV 文件</label>
            <input type="file" accept=".csv" className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">🖼️ 附加媒体文件</label>
            <input type="file" accept="image/*,application/pdf" className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">✏️ 信息内容</label>
            <textarea className="border rounded px-3 py-2 w-full" rows={3} placeholder="请输入要发送的 WhatsApp 信息" />
          </div>
          <div className="text-right">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              🚀 开始群发
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
