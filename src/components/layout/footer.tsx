import { Plus } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
      <div className="flex gap-5">
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        >
          About
        </a>
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        >
          GitHub
        </a>
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        >
          API
        </a>
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        >
          Changelog
        </a>
      </div>
      <button
        className="inline-flex items-center gap-1.5 text-xs text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
        onClick={() => alert("Submit a library - coming soon!")}
      >
        <Plus className="h-3 w-3" />
        Submit a library
      </button>
    </footer>
  );
};

export default Footer;
