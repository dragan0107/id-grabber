import React from "react";
import "./ProductID.css";

function ProductID({ item, removeItem, idx }) {
  return (
    <div className="productID tooltip" onDoubleClick={() => removeItem(item)}>
      <h3>{item["productId"]}</h3>
      <span className="tooltip-text">{item["productName"]}</span>
    </div>
  );
}

export default ProductID;
