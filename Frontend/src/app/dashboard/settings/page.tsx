export default function SettingPage() {
  return (
    <main className="p-8">
      {/* 页面标题与简介 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        ⚡️ 系统设定 System Setting
      </h1>
      <p className="text-gray-600 mb-6">
        您可以在这里修改账户信息、偏好设置等。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">账户信息</h3>
          <p className="text-sm text-gray-500">查看或更改登录信息</p>
        </div>

        <div className="p-4 border rounded-lg shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">系统偏好</h3>
          <p className="text-sm text-gray-500">设置语言、主题等系统选项</p>
        </div>
      </div>
    </main>
  );
}
