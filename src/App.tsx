import React, { useState, FormEvent } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim(), done: false },
    ]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-root">
      <main className="app">
        <header className="app-header">
          <h1>Todo</h1>
          <p className="app-subtitle">Simple, clean, responsive.</p>
        </header>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            className="todo-input"
            placeholder="Add a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="todo-add" type="submit">
            Add
          </button>
        </form>

        <section className="todo-list" aria-label="Todo list">
          {todos.length === 0 ? (
            <p className="todo-empty">Nothing here yet. Add your first task.</p>
          ) : (
            todos.map((todo) => (
              <article key={todo.id} className="todo-item">
                <label className="todo-main">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.done ? "todo-text done" : "todo-text"}>
                    {todo.text}
                  </span>
                </label>
                <button
                  type="button"
                  className="todo-remove"
                  onClick={() => removeTodo(todo.id)}
                  aria-label="Remove todo"
                >
                  ✕
                </button>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
};
