
function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-violet-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <a
          href="/"
          className="text-4xl font-extrabold tracking-tight text-indigo-950 transition hover:text-violet-700 sm:text-5xl lg:text-6xl"
        >
          Vistara<span className="text-violet-600">.</span>
        </a>

        <span className="hidden text-base font-medium text-slate-600 sm:block md:text-lg">
          Discover your next favourite photo
        </span>
      </nav>
    </header>
  );
}

export default Navbar;
