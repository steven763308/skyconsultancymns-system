import Link from "next/link";

export default function Breadcrumb({ paths }: { paths: string[] }) {
  return (
    <div className="text-sm text-gray-500 mb-4">
      {paths.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1">›</span>}
          {i === paths.length - 1 ? (
            <span className="font-semibold text-gray-800">{p}</span>
          ) : (
            <Link href={`/${paths.slice(0, i + 1).join("/").toLowerCase()}`} className="hover:underline">
              {p}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
