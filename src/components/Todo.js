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

export default function Todo(props) {
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState("");
	const [newCurrent, setNewCurrent] = useState(props.current);
	const [newNameError, setNewNameError] = useState("");
	function handleChange(e) {
		setNewName(e.target.value);
	}
	function handleChangeCurrent(e) {
		setNewCurrent(!newCurrent);
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (newName != "") {
			props.editTask(props.id, newName, newCurrent);
			setNewName("");
			setEditing(false);
			setNewNameError("");
		}
		else {
			setNewNameError("La descripción no puede estar vacía");
		}
	}
	const editingTemplate = (
  <form className="stack-small" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor={props.id}>
        Nueva descripción para <span className="todo-name">{props.description}</span>
      </label>
      <TextField variant="outlined" id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />
	  <div className="todo-error-message">{newNameError}</div>
	  <div className="todo-radio">
		<input
			name="todo-current"
			id={"todo-pending-status-" + props.id}
			type="radio"
			defaultChecked={props.current}
			value={newCurrent}
			onChange={handleChangeCurrent}
		/>
		<label className="todo-label" htmlFor={"todo-pending-status-" + props.id}>
			<span>Pendiente</span>
		</label>
		<input
			name="todo-current"
			id={"todo-finished-status-" + props.id}
			type="radio"
			defaultChecked={!props.current}
			value={!newCurrent}
			onChange={handleChangeCurrent}
		/>
		<label className="todo-label" htmlFor={"todo-finished-status-" + props.id}>
			<span>Terminada</span>
		</label>
	  </div>
    </div>
    <div className="btn-group">
      <Button variant="contained" color="primary" onClick={() => setEditing(false)}>
		Cancelar
	  </Button>
	  <ThemeProvider theme={theme}>
		<Button type="submit" variant="contained" color="black">
			Guardar
		</Button>
	  </ThemeProvider>
    </div>
  </form>
);
const viewTemplate = (
  <div className="stack-small">
	<p>{props.description}</p>
	<span className={props.current ? 'todo-current-message-green' : 'todo-current-message-red'}>{props.current ? 'Pendiente' : 'Terminada'}</span>
    <div className="btn-group">
      <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
		Editar
	  </Button>
      <Button variant="contained" color="error" onClick={() => props.deleteTask(props.id)}>
        Borrar
      </Button>
    </div>
  </div>
);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}