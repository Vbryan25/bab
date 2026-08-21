import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Badge } from "./badge"

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const ROWS = [
  { student: "Jordan Lee", exam: "BIO 201 Midterm", status: "Escalated" },
  { student: "Priya Nair", exam: "CHEM 110 Final", status: "Cleared" },
  { student: "Sam Okafor", exam: "MATH 220 Quiz 3", status: "Cleared" },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Exam</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((row) => (
          <TableRow key={row.student}>
            <TableCell className="font-medium">{row.student}</TableCell>
            <TableCell>{row.exam}</TableCell>
            <TableCell>
              <Badge variant={row.status === "Escalated" ? "destructive" : "secondary"}>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
