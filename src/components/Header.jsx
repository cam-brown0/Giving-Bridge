import { Globe, House } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-6">
      <div className="flex items-center gap-2 text-sm">
        <House size={18} />
        <span>Home</span>
      </div>

      <div className="flex items-center gap-2">
        <Globe size={18} />

        <button className="border border-indigo-500 text-indigo-500 rounded-full px-3 py-2 text-sm">
          Language
        </button>
      </div>
    </header>
  );
}