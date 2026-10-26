function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="mt-6">
      <label
        htmlFor="photo-search"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Search by photographer
      </label>

      <input
        id="photo-search"
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Try searching for Alex..."
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
      />
    </div>
  );
}

export default SearchBar;