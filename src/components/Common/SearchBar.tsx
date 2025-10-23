import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Language } from '../../types/chat';
import { getTranslation } from '../../utils/i18n';

interface SearchBarProps {
  language: Language;
  onSearch: (query: string) => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ language, onSearch, placeholder, inputRef }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-slate-400" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || getTranslation(language, 'search')}
        className="w-full pl-9 pr-9 py-2 bg-slate-800 text-slate-100 text-sm border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-slate-500"
        aria-label={getTranslation(language, 'search')}
        role="searchbox"
      />
      
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors duration-150"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
