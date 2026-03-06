import type { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/utils/formatDateTime";
import type { transactionListItem } from "../../schema/types/TransactionSchema.type";

export const TransactionColumns: ColumnDef<transactionListItem>[] = [
    {
        accessorKey: "updatedAt",
        header: "Date",
        cell: ({ getValue }) => {
            const createdAt = getValue<string>()
            return <div>{formatDateTime(createdAt)}</div>
        }
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => {
            const amount = getValue<number>()
            return (
                <span>${amount}</span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<string>()
            return (
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${status === "success" ? "bg-green-400" : "bg-red-400"
                            }`}
                    ></span>
                    {status === "success" ? "Success" : "Failed"}
                </div>
            )
        },
    },
    {
        accessorKey: "stripeInvoiceId",
        header: "Invoice",
        cell: ({ getValue }) => {
            const link = getValue<string>()
            return (
                <div>
                    <a className="text-blue-500" href={`https://dashboard.stripe.com/test/invoices/${link}`}>Invoice</a>
                </div>

            )
        }
    }
]