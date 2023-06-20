import { render, screen } from '@testing-library/react';
import App from './App';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';
import Form from './components/Form';

test('renders App component', () => {
  render(<App />);
  const h1Element = screen.getByText(/TODO de actividades/i);
  expect(h1Element).toBeInTheDocument();
  const h2Element = screen.getByText(/¿Qué actividad se debe realizar?/i);
  expect(h2Element).toBeInTheDocument();
});

test('renders TODO component', () => {
  render(<Todo id={"1"} description={"Description 1"} current={true} key={"1"} toggleTaskCompleted={function(){}} deleteTask={function(){}} editTask={function(){}} />);
  const labelElement = screen.getByText(/Description 1/i);
  expect(labelElement).toBeInTheDocument();
  const spanElement = screen.getByText(/Pendiente/i);
  expect(spanElement).toBeInTheDocument();
});

test('renders FilterButton component', () => {
  render(<FilterButton
	  key={"All"}
      description={"All"}
      isPressed={true}
      setFilter={function(){}}
    />);
  const spanElement = screen.getByText(/Todas/i);
  expect(spanElement).toBeInTheDocument();
});

test('renders Form component', () => {
  render(<Form addTask={function(){}} />);
  const labelElement = screen.getByText(/¿Qué actividad se debe realizar?/i);
  expect(labelElement).toBeInTheDocument();
});