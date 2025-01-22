import { useQuery } from '@tanstack/react-query'
    import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'
    import { Input } from '@/components/ui/input'
    import { Button } from '@/components/ui/button'
    import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
    import { Skeleton } from '@/components/ui/skeleton'

    const fetchPromoters = async () => {
      const response = await fetch('/api/promoters')
      if (!response.ok) throw new Error('Failed to fetch promoters')
      return response.json()
    }

    const columns = [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Customers', accessorKey: 'customers' },
      { header: 'Revenue', accessorKey: 'revenue' },
      { header: 'Status', accessorKey: 'status' }
    ]

    export default function Promoters() {
      const { data, isLoading, error } = useQuery({
        queryKey: ['promoters'],
        queryFn: fetchPromoters
      })

      const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
      })

      if (error) return <div>Error loading promoters</div>

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Promoters</h1>
            <Button>Add Promoter</Button>
          </div>

          <div className="flex items-center gap-4">
            <Input placeholder="Search promoters..." className="max-w-sm" />
            {/* Add filters here */}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.column.columnDef.header}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {cell.renderValue()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )
    }
