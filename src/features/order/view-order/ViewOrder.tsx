import React from "react";
import "./ViewOrder.css";

export interface ViewOrderItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
}

export interface ViewOrderProps {
  tableName: string;
  items: ViewOrderItem[];
  customerName: string;
  customerMobile: string;
  waiterId: string | number;
  currency?: string;
}

const ViewOrder: React.FC<ViewOrderProps> = ({
  tableName,
  items,
  customerName,
  customerMobile,
  waiterId,
  currency = "$",
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <section className="view-order" aria-label="Order details">
      <header className="view-order__header">
        <h2>Order details</h2>
        <p>Table: {tableName}</p>
      </header>

      <div className="view-order__customer">
        <p>
          <strong>Customer:</strong> {customerName}
        </p>
        <p>
          <strong>Mobile:</strong>{" "}
          <a href={`tel:${customerMobile}`}>{customerMobile}</a>
        </p>
        <p>
          <strong>Waiter ID:</strong> {waiterId}
        </p>
      </div>

      <div className="view-order__items-wrap">
        <table className="view-order__items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {currency}
                    {item.price.toFixed(2)}
                  </td>
                  <td>
                    {currency}
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No items in this order.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} scope="row">
                Total
              </th>
              <th>
                {currency}
                {total.toFixed(2)}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default ViewOrder;
