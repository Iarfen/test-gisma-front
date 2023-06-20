import React from "react";
import Button from '@mui/material/Button';

function filter_text(name) {
	if (name == "All") {
		return "Todas";
	}
	else if (name == "Active") {
		return "Pendientes";
	}
	else if (name == "Completed") {
		return "Terminadas";
	}
}

function FilterButton(props) {
  return (
    <Button
	  variant="contained"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.description)}>
      <span>{filter_text(props.description)}</span>
    </Button>
  );
}

export default FilterButton;
