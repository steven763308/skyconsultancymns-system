"use client";

import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";

type Feature = {
  key: string;
  label: string;
};

type RolePermissionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roles: string[];
  features: Feature[];
  onSave: (permissions: Record<string, string[]>) => void;
};

export default function RolePermissionModal({
  isOpen,
  onClose,
  roles,
  features,
  onSave,
}: RolePermissionModalProps) {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [permissions, setPermissions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // 初始化权限结构
    const initial = Object.fromEntries(roles.map((r) => [r, []]));
    setPermissions(initial);
    setSelectedRole(roles[0]);
  }, [isOpen, roles]);

  const handleToggle = (featureKey: string) => {
    const current = permissions[selectedRole] || [];
    const updated = current.includes(featureKey)
      ? current.filter((k) => k !== featureKey)
      : [...current, featureKey];

    setPermissions({ ...permissions, [selectedRole]: updated });
  };

  const handleSave = () => {
    onSave(permissions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">权限设置</Dialog.Title>

          <label className="block mb-2 font-medium">选择职位：</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <div className="mb-4 space-y-2">
            {features.map((feature) => (
              <label key={feature.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={permissions[selectedRole]?.includes(feature.key)}
                  onChange={() => handleToggle(feature.key)}
                  className="accent-blue-600"
                />
                <span>{feature.label}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </div>
  );
}
