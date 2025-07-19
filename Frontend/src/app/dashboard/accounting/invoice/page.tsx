"use client";

import { useState } from "react";
import DocumentTable from "@/components/DocumentTable";
import { FileDown, Save, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/Modal";

// 定义发票项类型
type Item = {
  description: string;
  quantity: number;
  price: number;
};

type Field = "description" | "quantity" | "price";

export default function InvoicePage() {
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceCode, setInvoiceCode] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { description: "", quantity: 1, price: 0 },
  ]);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleAdd = () => {
    setItems((prev) => [...prev, { description: "", quantity: 1, price: 0 }]);
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: Field, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleGeneratePDF = async () => {
    const element = document.getElementById("pdf-content");
    if (element) {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf()
        .set({
          margin: 10,
          filename: `${invoiceCode || "invoice"}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    }
  };

  return (
    <main className="p-8">
      <Breadcrumb basePath="/dashboard" paths={["Accounting", "Invoice"]} />
      <h1 className="text-2xl font-bold mb-4">🧾 发票管理</h1>
      <p className="text-gray-600 mb-6">创建、发送与管理发票，方便你记录所有账单与交易。</p>

      <div className="space-y-4">
        {!showCreateForm ? (
          <>
            <button
              onClick={() => {
                setShowCreateForm(true);
                setShowModal(true);
              }}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ➕ 新建发票
            </button>
            <div className="text-gray-400 text-sm">⚠️ 暂无发票记录，未来可添加发票列表与导出功能。</div>
          </>
        ) : (
          <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <div id="pdf-content" className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold">发票（Invoice）</h1>
                  <p className="text-sm text-gray-600">{invoiceCode || "#未命名"}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">日期</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">客户名称</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">发票编号</label>
                    <input
                      type="text"
                      value={invoiceCode}
                      onChange={(e) => setInvoiceCode(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <DocumentTable
                  type="invoice"
                  items={items}
                  onAddItem={handleAdd}
                  onRemoveItem={handleRemove}
                  onChangeItem={handleChange}
                />

                <div className="mt-6 text-right text-lg font-semibold">
                  总金额 (RM): {totalAmount.toFixed(2)}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  <X size={16} /> 取消
                </button>

                <div className="flex space-x-5">
                  <button
                    onClick={handleGeneratePDF}
                    className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    <FileDown size={16} /> 生成 PDF
                  </button>
                  <button
                    onClick={() => {
                      console.log("保存发票：", items);
                      setShowModal(false);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    <Save size={16} /> 保存发票
                  </button>
                </div>
              </div>
            </Modal>

            <button
              onClick={() => setShowCreateForm(false)}
              className="mt-2 text-sm text-gray-600 hover:underline"
            >
              ← 取消新建
            </button>
          </>
        )}
      </div>
    </main>
  );
}
