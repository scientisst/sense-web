import React from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faSquareCheck, faSquareXmark } from "@fortawesome/free-solid-svg-icons";

export default function Table({ values, deleteRow, changeToggle, changeName, changeKey, changeColor}) {
    const data = useMemo(() => values, [values]);
    const columns = useMemo(
        () => [
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ value, row }) => (
                <button onClick={() => changeName(row.index, values)}>{value}</button>
            ),
        },
        {
            Header: "Key",
            accessor: "key",
            Cell: ({ value, row }) => (
                <button onClick={() => changeKey(row.index, values)}>{value.toUpperCase()}</button>
            ),
        },
        {
            Header: "Color",
            accessor: "color",
            Cell: ({ value, row }) => (
                <input type="color" id="head" name="head" value={value} onChange={(e) => changeColor(row.index, values, e.target.value)}/>
            )
        },
        {
            Header: "Toggle",
            accessor: "toggle",
            Cell: ({ value, row }) => (value 
                ? (<button><FontAwesomeIcon onClick={() => changeToggle(row.index, values)} icon={faSquareCheck} /></button>)
                : (<button><FontAwesomeIcon onClick={() =>changeToggle(row.index, values)} icon={faSquareXmark} /></button>)
            ),

        },
        {
            Header: "Delete",
            accessor: "delete",
            Cell: ({ row }) => (
                <button type="button" onClick={() => deleteRow(row.index, values)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            ),
        },
        ],
        [values, deleteRow, changeToggle, changeName, changeKey, changeColor]
    );

    const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } = useTable({ columns, data });

    return (

        <ChakraTable {...getTableProps()} variant="striped" colorScheme="teal">
        <Thead>
            {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
                ))}
            </Tr>
            ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
            prepareRow(row);
            return (
                <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
                </Tr>
            );
            })}
        </Tbody>
        </ChakraTable>
    );
}
