"use client";

import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link2, 
  Image as ImageIcon, 
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code
} from 'lucide-react';

export function RichTextEditor() {
  return (
    <div className="bg-[#030712] border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 transition-all">
       {/* Toolbar */}
       <div className="flex flex-wrap items-center gap-1 p-2 bg-white/5 border-b border-white/10">
          {[
            { icon: Bold, label: 'Bold' },
            { icon: Italic, label: 'Italic' },
            { icon: Underline, label: 'Underline' },
            { separator: true },
            { icon: AlignLeft, label: 'Left' },
            { icon: AlignCenter, label: 'Center' },
            { icon: AlignRight, label: 'Right' },
            { separator: true },
            { icon: List, label: 'Bullet' },
            { icon: ListOrdered, label: 'Number' },
            { separator: true },
            { icon: Link2, label: 'Link' },
            { icon: ImageIcon, label: 'Image' },
            { icon: Code, label: 'Code' },
          ].map((item, idx) => (
            item.separator ? (
              <div key={`sep-${idx}`} className="w-[1px] h-4 bg-white/10 mx-1" />
            ) : (
              <button 
                key={item.label}
                type="button"
                className="p-1.5 hover:bg-white/10 rounded transition-all text-slate-400 hover:text-white"
                title={item.label}
              >
                {item.icon && <item.icon size={16} />}
              </button>
            )
          ))}
          <div className="ml-auto flex items-center gap-2 px-2">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Words: 452</span>
          </div>
       </div>

       {/* Editor Area */}
       <div 
         className="min-h-[300px] p-6 text-slate-300 outline-none focus:outline-none" 
         contentEditable 
         suppressContentEditableWarning={true}
       >
          <p className="mb-4">Start writing your amazing blog story here...</p>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Select text to see more options.</p>
       </div>
    </div>
  );
}
