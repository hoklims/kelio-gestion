'use client'

import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: T[keyof T], item: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  searchable?: boolean
  searchKeys?: (keyof T)[]
  onRowClick?: (item: T) => void
  rowActions?: (item: T) => React.ReactNode
  emptyState?: React.ReactNode
  className?: string
}

interface SortConfig<T> {
  key: keyof T
  direction: 'asc' | 'desc'
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  searchable = true,
  searchKeys,
  onRowClick,
  rowActions,
  emptyState,
  className
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)

  // Search functionality
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    const searchColumns = searchKeys || columns.map(col => col.key)
    
    return data.filter(item =>
      searchColumns.some(key => {
        const value = item[key]
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
  }, [data, searchTerm, searchKeys, columns])

  // Sort functionality
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue)
        return sortConfig.direction === 'asc' ? result : -result
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const result = aValue - bValue
        return sortConfig.direction === 'asc' ? result : -result
      }

      // Date comparison
      if (aValue instanceof Date && bValue instanceof Date) {
        const result = aValue.getTime() - bValue.getTime()
        return sortConfig.direction === 'asc' ? result : -result
      }

      // String comparison for other types
      const result = String(aValue).localeCompare(String(bValue))
      return sortConfig.direction === 'asc' ? result : -result
    })
  }, [filteredData, sortConfig])

  const handleSort = (key: keyof T) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key) {
        return prevConfig.direction === 'asc'
          ? { key, direction: 'desc' }
          : null
      }
      return { key, direction: 'asc' }
    })
  }

  const getSortIcon = (key: keyof T) => {
    if (sortConfig?.key !== key) {
      return <div className="w-4 h-4" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
  }

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {searchable && (
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <div className="h-10 bg-gray-200 animate-pulse rounded-md" />
            </div>
          </div>
        )}
        <TableSkeleton />
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and filters */}
      {searchable && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            <thead className="bg-gray-50 border-b">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                      column.sortable && "cursor-pointer hover:bg-gray-100 select-none",
                      column.width && `w-${column.width}`
                    )}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.label}</span>
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
                {rowActions && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (rowActions ? 1 : 0)} 
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {emptyState || (
                      <div className="space-y-2">
                        <p>Aucun résultat trouvé</p>
                        {searchTerm && (
                          <p className="text-sm">
                            Essayez de modifier votre recherche ou{' '}
                            <button 
                              onClick={() => setSearchTerm('')}
                              className="text-blue-600 underline"
                            >
                              effacer les filtres
                            </button>
                          </p>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                sortedData.map((item, index) => (
                  <tr
                    key={index}
                    className={cn(
                      "hover:bg-gray-50 transition-colors",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className="px-4 py-3 text-sm text-gray-900"
                      >
                        {column.render
                          ? column.render(item[column.key], item)
                          : String(item[column.key] || '')
                        }
                      </td>
                    ))}
                    {rowActions && (
                      <td 
                        className="px-4 py-3 text-right text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {rowActions(item)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with row count */}
      {sortedData.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            {sortedData.length} résultat{sortedData.length > 1 ? 's' : ''}
            {searchTerm && ` pour "${searchTerm}"`}
          </div>
        </div>
      )}
    </div>
  )
}

// Table skeleton component
function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4">
        <div className="flex space-x-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 animate-pulse rounded flex-1" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex space-x-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 animate-pulse rounded flex-1" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
