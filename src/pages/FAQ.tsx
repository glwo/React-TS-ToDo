import React from 'react';
import Divider from '@mui/joy/Divider';

interface FAQProps {}

const FAQ: React.FC<FAQProps> = (props) => {
  return (
    <div className='Page-container'>
      <h1>Frequently Asked Questions</h1>
      <Divider></Divider>

      <h2>How can I manage my tasks effectively in the Todo app?</h2>
      <p>{"To effectively manage your tasks, you can follow these steps:"}</p>
      <p><strong>Create Tasks:</strong> Use the 'Add Task' feature to create new tasks with descriptions and types (work, wellness, personal, learning).</p>
      <p><strong>Update Task Status:</strong> Mark tasks as completed or toggle their status to keep track of your progress.</p>
      <p><strong>Edit Task Details:</strong> Click on a task to view and edit its details, including description and types.</p>
      <p><strong>Delete Tasks:</strong> Remove unwanted tasks using the 'Delete' option in the Todo app.</p>
      <Divider></Divider>

      <h2>Can I categorize tasks based on different types?</h2>
      <p>Yes, you can categorize tasks into four types: work, wellness, personal, and learning. Use the 'Type' category to distinguish between different task categories.</p>
      <Divider></Divider>

      <h2>Is it possible to delete multiple tasks at once?</h2>
      <p>No, the Todo app currently supports deleting tasks individually. To remove a task, use the 'Delete' option for that specific task.</p>
      <Divider></Divider>

      <h2>How to navigate to view detailed information about a specific task?</h2>
      <p>Click on a task's edit button to navigate to a detailed view, where you can see more information about the task and make necessary updates.</p>
    </div>
  );
}

export default FAQ;
