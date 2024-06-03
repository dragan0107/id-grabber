import React, { useEffect, useState } from "react";
import Search from "./components/search/Search";
import ProductID from "./components/productID/ProductID";
import { Reorder } from "framer-motion";
import "./App.css";
import Picker from "./components/picker/Picker";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [list, setList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [env, setEnv] = useState("qa");
  const removeItem = (item) => {
    setIdList((prevList) => prevList.filter((listItem) => listItem !== item));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/products-${env}.json`);
        const data = await res.json();
        setList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [env]);

  const grabIds = () => {
    return idList.map((item) => item["productId"]).join(", ");
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">AUVERE ID Grabber</h1>
        <Picker env={env} setEnv={setEnv} setIdList={setIdList} />
      </div>
      <Reorder.Group values={idList} onReorder={setIdList} axis="x" className="id-list">
        {idList.map((item, index) => (
          <Reorder.Item key={item["productId"]} value={item}>
            <ProductID item={item} removeItem={removeItem} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <Search productList={list} setIdList={setIdList} grabIds={grabIds} env={env} />
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default App;
