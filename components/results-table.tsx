"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Business } from "@/types"
import * as XLSX from "xlsx"

interface ResultsTableProps {
  businesses: Business[]
  isLoading: boolean
}

export function ResultsTable({ businesses, isLoading }: ResultsTableProps) {
  function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(businesses)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Businesses")
    XLSX.writeFile(wb, "business-leads.xlsx")
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading results...</div>
  }

  if (!businesses.length) {
    return <div className="text-center py-4">No results found</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={exportToExcel} disabled={!businesses.length}>
          Export to Excel
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Website</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business, index) => (
              <TableRow key={index}>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.address}</TableCell>
                <TableCell>{business.phone}</TableCell>
                <TableCell>
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
