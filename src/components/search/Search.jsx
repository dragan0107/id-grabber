import React from "react";
import SearchItem from "../searchItem/SearchItem";
import { useState } from "react";
import "./Search.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import { List } from "@mui/material";

function Search({ productList, setIdList, grabIds }) {
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const query = e.target.value;

    if (!query) {
      setFiltered([]);
      return;
    }

    const filteredList = productList.filter((item) => {
      return item["productName"].toLowerCase().includes(query.toLowerCase());
    });
    setFiltered(filteredList.slice(0, 15));
  };
  const btnStyles = {
    margin: "0 .5rem",
    backgroundColor: "#85c92c",
    "&:hover": {
      backgroundColor: "#5a8522",
    },
  };

  const idGrabHandler = () => {
    const ids = grabIds();
    if (ids) {
      navigator.clipboard.writeText(grabIds());
      toast.success("ID List successfully copied!", {
        autoClose: 1500,
      });
    } else {
      toast.error("Add products to list first!", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div>
      <TextField label="Search for products" variant="standard" onChange={handleChange} />
      <Button className="buttons" variant="contained" onClick={() => setIdList([])} sx={btnStyles} endIcon={<ClearIcon />}>
        Clear List
      </Button>
      <Button className="buttons" variant="contained" onClick={idGrabHandler} sx={btnStyles} endIcon={<ContentCopyIcon />}>
        Grab IDs
      </Button>
      <ToastContainer position="top-center" theme="colored" />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#f5f5f5", display: "flex", flexDirection: "column" }}>
        {filtered.length > 0 ? (
          filtered.map((item) => {
            return <SearchItem item={item} key={item["productName"]} setIdList={setIdList} />;
          })
        ) : (
          <h3>No results found.</h3>
        )}
      </List>
    </div>
  );
}

export default Search;
