import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/formatDate";
import type { cashTransactionList } from "../../schema/TransactionCreateFormSchema";
import { TRANSACTION_STATUS_MAP, TRANSACTION_TYPE_MAP } from "../../constants";
import { TableActions } from "@/components/Table";
import { useModalTypeStore } from "../../store/useModalTypeStore";
import { getTransactionFormType } from "../../constants"
import { useTransactionModalStore } from "../../store/useTransactionModalStore";

export const transactionDetailColumns: ColumnDef<cashTransactionList>[] = [
    {
        accessorKey: "createDo",
        header: "Created Date",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (formatDate(data) || "-")
        }
    },
    {
        accessorKey: "effectiveDo",
        header: "Effective Date",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (formatDate(data) || "-")
        }
    },
    {
        accessorKey: "groupId",
        header: "Group Id",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "transactionId",
        header: "Cash Transaction ID",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "orgName",
        header: "Client Name",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "transactionType",
        header: "Type",
        cell: ({ getValue }) => {

            const value = getValue<string>()

            if (!value) return "-"

            const status = TRANSACTION_TYPE_MAP[value]

            if (!status) return value

            return (status.label)
        }
    },
    {
        accessorKey: "bankAccountNum",
        header: "Bank Account",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "isin",
        header: "ISIN",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "debit",
        header: "Debit",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "credit",
        header: "Credit",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "bankChargesAmt",
        header: "Bank Charges",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "feesAmt",
        header: "Fees",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "gstAmt",
        header: "GST",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "netAmt",
        header: "Net Amount",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "orderStatus",
        header: "Status",
        cell: ({ getValue }) => {
            const value = getValue<string>()

            if (!value) return "-"

            const status = TRANSACTION_STATUS_MAP[value]

            if (!status) return value
            return (
                <span
                    style={{ backgroundColor: status.style, color: "white", padding: 4, borderRadius: "6px" }}
                >
                    {status.label}
                </span>
            )
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const data = row.original
            const { setSelectedData, setTypeOpen } = useModalTypeStore()
            const { openModal } = useTransactionModalStore()

            const handleView = () => {
                const formType = getTransactionFormType(data.transactionType)
                setSelectedData(data)
                setTypeOpen("View")
                openModal(formType)
            }

            return (
                <TableActions
                    onView={() => handleView()}
                />
            )
        },
    }
]