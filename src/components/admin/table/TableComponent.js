import './TableComponent.css';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@mui/material';
import {useMemo, useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PaginationComponent from "../paginationComponent/PaginationComponent";

export default function TableComponent({items, columns, actions}) {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleSort = column => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            if (sortColumn && sortOrder) {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                const isNumericComparison = !isNaN(aValue) && !isNaN(bValue);

                if (isNumericComparison) {
                    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
                } else {
                    const aString = aValue.toString().toLowerCase();
                    const bString = bValue.toString().toLowerCase();

                    if (aString < bString) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    if (aString > bString) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                }
            }
            return 0;
        });
    }, [items, sortColumn, sortOrder]);

    const paginatedItems = sortedItems
        ? sortedItems.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : [];

    return (
        <>
            <TableContainer component={Paper} className="tableContainer">
                <Table aria-label="products table">
                    <TableHead>
                        <TableRow className="tableHeader">
                            {columns.map((column) => (
                                <TableCell key={column}>
                                    <div className="columnHeader">
                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                        {column !== "image" && (
                                            <IconButton
                                                size="small"
                                                onClick={() => handleSort(column)}
                                                color={sortColumn === column ? "primary" : "default"}
                                            >
                                                {sortColumn === column && sortOrder === "asc" ? (
                                                    <ArrowUpwardIcon />
                                                ) : sortColumn === column && sortOrder === "desc" ? (
                                                    <ArrowDownwardIcon />
                                                ) : (
                                                    <ArrowUpwardIcon style={{ opacity: 0.3 }} />
                                                )}
                                            </IconButton>
                                        )}
                                    </div>
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedItems.map((item) => (
                            <TableRow key={item._id} className="tableRow">
                                {columns.map((column) => (
                                    <TableCell key={column}>
                                        {column === "image" ? (
                                            <img src={item[column]} alt="product image" width="50" height="50" />
                                        ) : (
                                            item[column]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {actions.map((action) => (
                                        <IconButton key={action.label} color={action.color} aria-label={action.label} onClick={() => action.action(item._id)}>
                                            {action.icon}
                                        </IconButton>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {items.length > itemsPerPage && (
                <PaginationComponent
                    count={Math.ceil(items.length / itemsPerPage)}
                    page={page}
                    onChange={handleChange}
                />
            )}
        </>
    );
}