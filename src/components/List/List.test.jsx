import { render, screen } from '@testing-library/react';
import TaskList from './List';
import '@testing-library/jest-dom';

const tasks = [
  { title: 'Task 1', realized: false },
  { title: 'Task 2', realized: true },
];

// Prueba del componente TaskList
describe('<TaskList />', () => {
  test('renders the task list component', () => {
    render(<TaskList title="To Do List" tasks={tasks} handleTaskRealized={jest.fn()} />);

   
    expect(screen.getByText('Task 1')).toBeInTheDocument();

   
    tasks.forEach(task => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });
});
