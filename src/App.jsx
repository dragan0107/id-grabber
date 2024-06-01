import React, { useEffect, useState } from "react";
import Search from "./components/search/Search";
import ProductID from "./components/productID/ProductID";
import { Reorder } from "framer-motion";
import "./App.css";

const App = () => {
  const [list, setList] = useState([]);
  const [idList, setIdList] = useState([]);
  const removeItem = (item) => {
    setIdList((prevList) => prevList.filter((listItem) => listItem !== item));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/ctl-test.json");
        const data = await res.json();
        setList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const grabIds = () => {
    return idList.map((item) => item["productId"]).join(", ");
  };

  return (
    <div className="app">
      <h1 className="app-title">ID Grabber</h1>
      <Reorder.Group values={idList} onReorder={setIdList} axis="x" className="id-list">
        {idList.map((item, index) => (
          <Reorder.Item key={item["productId"]} value={item}>
            <ProductID item={item} removeItem={removeItem} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <Search productList={list} setIdList={setIdList} grabIds={grabIds} />
    </div>
  );
};

export default App;
