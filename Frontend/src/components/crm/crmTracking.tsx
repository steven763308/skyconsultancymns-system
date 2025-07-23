"use client";
import clsx from "clsx";

interface CrmTrackingProps {
  data: {
    time: string;
    recipient: string;
    message: string;
    status: string;
  }[];
}

export default function CrmTracking({ data }: CrmTrackingProps) {
  return (
    <section className="mb-12 bg-white border rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 实况查阅记录</h3>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">📬 发送方式</label>
          <select className="border rounded px-3 py-2 w-full">
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">📱 联系号码 / 电邮</label>
          <input className="border rounded px-3 py-2 w-full" placeholder="输入号码或邮箱" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4">发送时间</th>
              <th className="py-2 px-4">收件人</th>
              <th className="py-2 px-4">消息内容</th>
              <th className="py-2 px-4">发送状态</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 px-4">{item.time}</td>
                <td className="py-2 px-4">{item.recipient}</td>
                <td className="py-2 px-4">{item.message}</td>
                <td className="py-2 px-4">
                  <span
                    className={clsx(
                      "px-2 py-1 rounded text-xs font-medium",
                      item.status === "已发送" && "bg-green-100 text-green-700",
                      item.status === "正在发送" && "bg-yellow-100 text-yellow-700",
                      item.status === "发送失败" && "bg-red-100 text-red-700"
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
