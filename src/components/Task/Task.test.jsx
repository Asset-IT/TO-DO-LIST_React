import { render, screen, fireEvent } from '@testing-library/react';
import Task from './Task';
import '@testing-library/jest-dom';

describe('<Task />', () => {
    test('renders the task component', () => {
        render(<Task title="test" realized={false} />);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    test('calls handleTaskRealized when the button is clicked', () => {
        const handleTaskRealizedMock = jest.fn();
        render(<Task title="test" realized={false} handleTaskRealized={handleTaskRealizedMock} />);
        const buttonElement = screen.getByText(/Done/i);
        fireEvent.click(buttonElement);
        expect(handleTaskRealizedMock).toHaveBeenCalledWith('test');
    });

    test('disables the button if the task is realized', () => {
        render(<Task title="test" realized={true} />);
        const buttonElement = screen.getByText(/Done/i).closest('button');
        expect(buttonElement).toBeDisabled();
    });
});
