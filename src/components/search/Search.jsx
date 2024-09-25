import SearchItem from "../searchItem/SearchItem";
import { useState, useRef, useEffect } from "react";
import "./Search.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import { List } from "@mui/material";

function Search({ productList, setIdList, grabIds, env }) {
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    setFiltered([]);
    inputRef.current.value = "";
  }, [env]);
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
    backgroundColor: "#18db18",
    "&:hover": {
      backgroundColor: "#106b10",
    },
  };
  const clearBtnStyles = {
    margin: "0 .5rem",
    backgroundColor: "#ef0b0b",
    "&:hover": {
      backgroundColor: "#8b0000",
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
      <div className="search-grab">
        <TextField inputRef={inputRef} label="Search for products" variant="standard" onChange={handleChange} />
        <Button className="buttons" variant="contained" onClick={() => setIdList([])} sx={clearBtnStyles} endIcon={<ClearIcon />}>
          Clear List
        </Button>
        <Button className="buttons" variant="contained" onClick={idGrabHandler} sx={btnStyles} endIcon={<ContentCopyIcon />}>
          Grab IDs
        </Button>
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          display: inputRef.current?.value ? "block" : "none",
        }}
      >
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
