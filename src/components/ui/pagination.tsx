import * as React from 'react'
    import { cn } from '../lib/utils'

    const Pagination = ({ className, ...props }) => (
      <nav
        role="navigation"
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
      />
    )

    const PaginationContent = React.forwardRef<
      HTMLUListElement,
      React.HTMLAttributes<HTMLUListElement>
    >(({ className, ...props }, ref) => (
      <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-1', className)}
        {...props}
      />
    ))

    const PaginationItem = React.forwardRef<
      HTMLLIElement,
      React.HTMLAttributes<HTMLLIElement>
    >(({ className, ...props }, ref) => (
      <li ref={ref} className={cn('', className)} {...props} />
    ))

    const PaginationPrevious = ({ className, ...props }) => (
      <PaginationItem>
        <button
          aria-label="Go to previous page"
          className={cn(
            'h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            className
          )}
          {...props}
        >
          Previous
        </button>
      </PaginationItem>
    )

    const PaginationNext = ({ className, ...props }) => (
      <PaginationItem>
        <button
          aria-label="Go to next page"
          className={cn(
            'h-10 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            className
          )}
          {...props}
        >
          Next
        </button>
      </PaginationItem>
    )

    export {
      Pagination,
      PaginationContent,
      PaginationItem,
      PaginationPrevious,
      PaginationNext,
    }
