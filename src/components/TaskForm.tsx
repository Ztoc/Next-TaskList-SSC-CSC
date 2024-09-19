'use client'; // Mark this as a client component

import { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new FormData object to send to the server action
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('dueDate', formData.dueDate);

      // Call the server-side action
      await addTask(form);

      // Reset form on success
      setFormData({ title: '', description: '', dueDate: '' });
      alert('Task added successfully!');
    } catch (error) {
      // Handle any error from the server action
      setError(error.message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="rounded-lg border p-2"
        required
      />

      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="rounded-lg border p-2"
        required
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="rounded-lg border p-2"
        required
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
}
