import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Archive, Trash2, Download, ArchiveRestore } from 'lucide-react';
import { Language } from '../../types/chat';
import { getTranslation } from '../../utils/i18n';

interface ConversationMenuProps {
  conversationId: string;
  conversationTitle: string;
  isArchived?: boolean;
  language: Language;
  onRename: (id: string, newTitle: string) => void;
  onArchive: (id: string, archived: boolean) => void;
  onDelete: (id: string) => void;
  onExport: (id: string, format: 'txt') => void;
}

export default function ConversationMenu({
  conversationId,
  conversationTitle,
  isArchived = false,
  language,
  onRename,
  onArchive,
  onDelete,
  onExport
}: ConversationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(conversationTitle);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus input when renaming starts
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleRenameClick = () => {
    setIsRenaming(true);
    setIsOpen(false);
  };

  const handleRenameSubmit = () => {
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle && trimmedTitle !== conversationTitle) {
      onRename(conversationId, trimmedTitle);
    } else {
      setNewTitle(conversationTitle);
    }
    setIsRenaming(false);
  };

  const handleRenameCancel = () => {
    setNewTitle(conversationTitle);
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      handleRenameCancel();
    }
  };

  const handleArchiveClick = () => {
    onArchive(conversationId, !isArchived);
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    const confirmMessage = language === 'en' 
      ? 'Are you sure you want to delete this conversation? This action cannot be undone.'
      : language === 'fil'
      ? 'Sigurado ka bang gusto mong tanggalin ang pag-uusap na ito? Hindi na ito maibabalik.'
      : 'Sigurado ka ba nga gusto nimo tangtangon kini nga conversation? Dili na nimo kini mabalik.';
    
    if (window.confirm(confirmMessage)) {
      onDelete(conversationId);
      setIsOpen(false);
    }
  };

  const handleExportClick = () => {
    onExport(conversationId, 'txt');
    setIsOpen(false);
  };

  if (isRenaming) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onBlur={handleRenameSubmit}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 text-sm bg-slate-700 text-white border border-sky-500 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
        maxLength={100}
      />
    );
  }

  return (
    <div className="relative" ref={menuRef} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-slate-700 rounded transition-colors duration-150"
        aria-label={language === 'en' ? 'Conversation options' : 'Mga pagpipilian'}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 py-1">
          <button
            onClick={handleRenameClick}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-150"
          >
            <Edit size={16} />
            {getTranslation(language, 'rename')}
          </button>

          <button
            onClick={handleArchiveClick}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-150"
          >
            {isArchived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
            {isArchived 
              ? (language === 'en' ? 'Unarchive' : language === 'fil' ? 'I-unarchive' : 'I-unarchive')
              : getTranslation(language, 'archive')
            }
          </button>

          <button
            onClick={handleExportClick}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-150"
          >
            <Download size={16} />
            {getTranslation(language, 'export')}
          </button>

          <div className="border-t border-slate-700 my-1" />

          <button
            onClick={handleDeleteClick}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors duration-150"
          >
            <Trash2 size={16} />
            {getTranslation(language, 'delete')}
          </button>
        </div>
      )}
    </div>
  );
}
