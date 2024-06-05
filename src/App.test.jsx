import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('<App />', () => {
  test('renders the app component with task lists', () => {
    render(<App />);
    

    expect(screen.getByText('Planned')).toBeInTheDocument();


    expect(screen.getByText('task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.getByText('task 4')).toBeInTheDocument();
    expect(screen.getByText('task 5')).toBeInTheDocument();
  });

  test('adds a new task to the Planned list', () => {
    render(<App />);
    
    const inputElement = screen.getByLabelText('Nueva tarea');
    const addButton = screen.getByText('Agregar');


    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

  
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

 
  test('updates the pending tasks count', () => {
    render(<App />);
    
    const pendingTasksElement = screen.getByText(/Tareas pendientes:/);


    expect(pendingTasksElement).toHaveTextContent('Tareas pendientes: 4');


    const inputElement = screen.getByLabelText('Nueva tarea');
    const addButton = screen.getByText('Agregar');
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

 
    expect(pendingTasksElement).toHaveTextContent('Tareas pendientes: 5');
  });
});
