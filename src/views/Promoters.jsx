import React, { useState } from 'react'
    import { Button } from '../components/ui/button'
    import { Input } from '../components/ui/input'
    import {
      Tabs,
      TabsContent,
      TabsList,
      TabsTrigger,
    } from '../components/ui/tabs'
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from '../components/ui/table'
    import {
      Pagination,
      PaginationContent,
      PaginationItem,
      PaginationNext,
      PaginationPrevious,
    } from '../components/ui/pagination'

    const promoterStates = [
      { value: 'top', label: 'Top Performers' },
      { value: 'new', label: 'Newest' },
      { value: 'suspicious', label: 'Suspicious' },
    ]

    const promotersData = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        customers: 50,
        owed: '$500',
        paid: '$2000',
        revenue: '$2500',
        joined: '2023-01-15',
      },
      // Add more data
    ]

    export default function Promoters() {
      const [currentPage, setCurrentPage] = useState(1)
      const [searchQuery, setSearchQuery] = useState('')

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Promoters</h1>
            <Button>New Promoter</Button>
          </div>

          <Tabs defaultValue="top" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                {promoterStates.map((state) => (
                  <TabsTrigger key={state.value} value={state.value}>
                    {state.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="w-64">
                <Input
                  placeholder="Search promoters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {promoterStates.map((state) => (
              <TabsContent key={state.value} value={state.value}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Promoter</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Customers</TableHead>
                        <TableHead>Owed</TableHead>
                        <TableHead>Paid</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promotersData.map((promoter, index) => (
                        <TableRow key={index}>
                          <TableCell>{promoter.name}</TableCell>
                          <TableCell>{promoter.email}</TableCell>
                          <TableCell>{promoter.customers}</TableCell>
                          <TableCell>{promoter.owed}</TableCell>
                          <TableCell>{promoter.paid}</TableCell>
                          <TableCell>{promoter.revenue}</TableCell>
                          <TableCell>{promoter.joined}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <span className="px-4">{currentPage}</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )
    }
