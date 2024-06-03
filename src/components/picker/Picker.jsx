import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toast } from "react-toastify";

function Picker({ env, setEnv, setIdList }) {
  const handleChange = (event) => {
    setEnv(event.target.value);
    toast.success(`Environment changed to ${event.target.value.toUpperCase()}.`, {
      autoClose: 1500,
    });
    setIdList([]);
  };
  return (
    <FormControl sx={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Environment:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={env}
        onChange={handleChange}
        sx={{ flexDirection: "row" }}
      >
        <FormControlLabel value="qa" control={<Radio />} label="QA" />
        <FormControlLabel value="production" control={<Radio />} label="Production" />
      </RadioGroup>
    </FormControl>
  );
}

export default Picker;
