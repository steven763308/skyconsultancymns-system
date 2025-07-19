// components/DocumentTable.tsx
"use client";

type Item = {
  description: string;
  quantity: number;
  price: number;
};

type Field = "description" | "quantity" | "price";

type Props = {
  type: "quotation" | "invoice";
  items: Item[];
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeItem: (index: number, field: Field, value: string | number) => void;
};

export default function DocumentTable({
  type,
  items,
  onAddItem,
  onRemoveItem,
  onChangeItem,
}: Props) {
  const title = type === "quotation" ? "Quotation 项目明细" : "Invoice 项目明细";

  return (
    <>
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <table className="w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">描述</th>
            <th className="border px-3 py-2">数量</th>
            <th className="border px-3 py-2">单价 (RM)</th>
            <th className="border px-3 py-2">小计 (RM)</th>
            <th className="border px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-3 py-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    onChangeItem(idx, "description", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border px-3 py-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    onChangeItem(idx, "quantity", Number(e.target.value))
                  }
                  className="w-20 border rounded px-2 py-1"
                />
              </td>
              <td className="border px-3 py-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    onChangeItem(idx, "price", Number(e.target.value))
                  }
                  className="w-24 border rounded px-2 py-1"
                />
              </td>
              <td className="border px-3 py-2">
                {(item.quantity * item.price).toFixed(2)}
              </td>
              <td className="border px-3 py-2">
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="text-red-500 hover:underline"
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onAddItem}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        + 添加项目
      </button>
    </>
  );
}
