'use client'

import { useEffect, useRef, useState } from 'react'

type ComboboxOption = {
  id: string
  label: string
}

type ComboboxProps = {
  options: ComboboxOption[]
  value: string
  onChange: (id: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Search…',
  disabled = false,
}: ComboboxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep the displayed text in sync if `value` changes from outside
  // (e.g. parent resets the form, or airport changes and clears store)
  useEffect(() => {
    const selected = options.find((o) => o.id === value)
    setQuery(selected ? selected.label : '')
  }, [value, options])

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered =
    query.trim() === ''
      ? options
      : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))

  function handleSelect(option: ComboboxOption) {
    onChange(option.id)
    setQuery(option.label)
    setOpen(false)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          if (e.target.value === '') onChange('')
        }}
        onFocus={() => setOpen(true)}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '15px',
          border: '1px solid #333',
          borderRadius: '8px',
          boxSizing: 'border-box',
          background: '#1a1a1a',
          color: '#fff',
        }}
      />

      {open && !disabled && (
        <div
          style={{
            position: 'absolute',
            top: '44px',
            left: 0,
            right: 0,
            maxHeight: '240px',
            overflowY: 'auto',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px',
            zIndex: 20,
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '10px 12px', fontSize: '14px', color: '#888' }}>
              No matches
            </div>
          ) : (
            filtered.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                style={{
                  padding: '10px 12px',
                  fontSize: '14px',
                  color: '#fff',
                  cursor: 'pointer',
                  background: option.id === value ? '#292929' : 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#292929')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = option.id === value ? '#292929' : 'transparent')
                }
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}