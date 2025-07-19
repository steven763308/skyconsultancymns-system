"use client";

import { useState } from "react";
import html2pdf from "html2pdf.js";
import DocumentTable from "@/components/DocumentTable";
import { FileDown, Save, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/Modal";

// 定义报价项类型
type Item = {
  description: string;
  quantity: number;
  price: number;
};

// 限定字段名类型
type Field = "description" | "quantity" | "price";

export default function QuotationPage() {
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [documentCode, setDocumentCode] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { description: "", quantity: 1, price: 0 },
  ]);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleAdd = (): void => {
    setItems((prevItems) => [...prevItems, { description: "", quantity: 1, price: 0 }]);
  };

  const handleRemove = (index: number): void => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: Field, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
  };

  const handleGeneratePDF = () => {
    const element = document.getElementById("pdf-content");
    if (element) {
      html2pdf()
        .set({
          margin: 10,
          filename: `${documentCode || "quotation"}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    }
  };

  return (
    <main className="p-8">
      <Breadcrumb basePath="/dashboard" paths={["Accounting", "Quotation"]} />

      <h1 className="text-2xl font-bold mb-4">📄 报价单管理</h1>
      <p className="text-gray-600 mb-6">
        在这里你可以创建、查看与管理客户报价单。
      </p>

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
              ➕ 新建报价单
            </button>
            <div className="text-gray-400 text-sm">
              ⚠️ 暂无报价记录，未来可以在此显示报价单列表表格。
            </div>
          </>
        ) : (
          <>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <div id="pdf-content" className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold">报价单（Quotation）</h1>
                  <p className="text-sm text-gray-600">{documentCode || "#未命名"}</p>
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
                    <label className="block text-sm font-medium text-gray-700">文件编号</label>
                    <input
                      type="text"
                      value={documentCode}
                      onChange={(e) => setDocumentCode(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <DocumentTable
                  type="quotation"
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
                      console.log("保存报价单：", items);
                      setShowModal(false);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    <Save size={16} /> 保存报价单
                  </button>
                </div>
              </div>
            </Modal>
          </>
        )}
      </div>
    </main>
  );
}
