"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Modal from "@/components/Modal";
import DocumentTable from "@/components/DocumentTable";

// 定义报价项类型
type Item = {
  description: string;
  quantity: number;
  price: number;
};

// 限定字段名类型
type Field = "description" | "quantity" | "price";

export default function QuotationPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { description: "", quantity: 1, price: 0 },
  ]);

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

  return (
    <main className="p-8">
      {/* 面包屑导航路径 */}
      <Breadcrumb basePath="/dashboard" paths={["Accounting", "Quotation"]} />

      {/* 页面标题 */}
      <h1 className="text-2xl font-bold mb-4">📄 报价单管理</h1>
      <p className="text-gray-600 mb-6">
        在这里你可以创建、查看与管理客户报价单。
      </p>

      {/* 功能入口 */}
      <div className="space-y-4">
        {!showCreateForm ? (
          <>
            <button
              onClick={() => {
                setShowCreateForm(true);
                setShowModal(true); // ✅ 加上这一行才能显示 modal
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
          <DocumentTable
            type="quotation"
            items={items}
            onAddItem={handleAdd}
            onRemoveItem={handleRemove}
            onChangeItem={handleChange}
          /> 
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              取消
            </button>
            <button
              onClick={() => {
                console.log("保存报价单：", items);
                setShowModal(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ✅ 保存报价单
            </button>
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
