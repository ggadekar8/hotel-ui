import { useState } from "react";
import Cart, { type CartItem } from "../../cart/Cart";
import { Table } from "../table/Table";
import "./ActiveTables.css";
export type TableStatus = "available" | "occupied";

export interface HotelTable {
  id: string | number;
  name: string;
  status: TableStatus;
  cartItems?: CartItem[];
}

interface ActiveTablesProps {
  tables?: HotelTable[];
  onSelectTable?: (table: HotelTable) => void;
  onViewOrder?: (table: HotelTable) => void;
  onReleaseTable?: (table: HotelTable) => void;
}

export default function ActiveTables({
  tables = [
    { id: 1, name: "Table 1", status: "available" },
    {
      id: 2,
      name: "Table 2",
      status: "occupied",
      cartItems: [
        { id: 1, name: "Garden salad", quantity: 1, price: 12 },
        { id: 2, name: "Grilled salmon", quantity: 2, price: 24 },
        { id: 3, name: "Fresh lemonade", quantity: 2, price: 6 },
      ],
    },
    { id: 3, name: "Table 3", status: "available" },
    {
      id: 4,
      name: "Table 4",
      status: "occupied",
      cartItems: [
        { id: 4, name: "Tomato soup", quantity: 2, price: 9 },
        { id: 5, name: "Herb chicken", quantity: 1, price: 22 },
        { id: 6, name: "Sparkling water", quantity: 1, price: 5 },
      ],
    },
  ],
  onSelectTable,
  onViewOrder,
  onReleaseTable,
}: ActiveTablesProps) {
  const [selectedTable, setSelectedTable] = useState<HotelTable | null>(null);

  return (
    <section className="active-tables" aria-label="Active tables">
      <h2>Tables</h2>
      {tables.length === 0 ? (
        <p>No tables available.</p>
      ) : (
        <div className="active-tables__list">
          {tables.map((table) => (
            <Table
              key={table.id}
              table={table}
              onSelect={onSelectTable}
              onViewOrder={(selected) => {
                onViewOrder?.(selected);
                setSelectedTable(selected);
              }}
              onRelease={onReleaseTable}
            />
          ))}
        </div>
      )}
      {selectedTable && (
        <div
          className="order-modal-backdrop"
          onClick={() => setSelectedTable(null)}
        >
          <div
            className="order-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Order for ${selectedTable.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="order-modal__close"
              type="button"
              aria-label="Close order details"
              onClick={() => setSelectedTable(null)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <Cart
              key={selectedTable.id}
              tableName={selectedTable.name}
              items={selectedTable.cartItems ?? []}
              compact
            />
          </div>
        </div>
      )}
    </section>
  );
}
