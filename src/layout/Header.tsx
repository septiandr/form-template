function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <header className="bg-gray-800 text-white py-4 px-8 shadow relative flex items-center">
      <button
        className="mr-4 p-2 rounded hover:bg-gray-700 focus:outline-none"
        onClick={onToggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-2xl font-bold text-center flex-1">Form Template App</h1>
    </header>
  );
}

export default Header;