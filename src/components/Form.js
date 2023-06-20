import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    black: {
      main: '#000000',
	  contrastText: '#ffffff'
    }
  }
});

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
	if (name != "") {
		props.addTask(name);
		setName("");
	}
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          ¿Qué actividad se debe realizar?
        </label>
      </h2>
      <TextField
	    variant="outlined"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
	  <ThemeProvider theme={theme}>
		<Button type="submit" variant="contained" color="black" style={{width: "100%"}}>
			Agregar
		</Button>
	  </ThemeProvider>
    </form>
  );
}

export default Form;
