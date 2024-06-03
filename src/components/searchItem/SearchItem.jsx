import React from "react";
import "./SearchItem.css";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "../../App.css";

function SearchItem({ item, setIdList }) {
  const listHandler = () => {
    setIdList((prevList) => {
      const itemExists = prevList.some((existingItem) => existingItem["productId"] === item["productId"]);
      if (!itemExists) {
        return [...prevList, item];
      }
      return prevList;
    });
  };

  return (
    <ListItem>
      <ListItemButton onClick={listHandler}>
        <ListItemText primary={item["productName"]} />
      </ListItemButton>
    </ListItem>
  );
}

export default SearchItem;
