'use client'
const LANGUAGES = ['javascript','typescript','python','java','cpp','go','rust','php','ruby']

export default function LanguageSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-violet-500 transition"
    >
      {LANGUAGES.map(l => (
        <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
      ))}
    </select>
  )
}