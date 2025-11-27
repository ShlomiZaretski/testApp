import React, { useState, FormEvent } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface Persona {
  id: string;
  name: string;
  mood: string;
  imageUrl: string;
  starterTodos: string[];
}

const PERSONAS: Persona[] = [
  {
    id: "coffee-goblin",
    name: "Coffee Goblin",
    mood: "Powered by 17 espressos.",
    imageUrl:
      "https://images.pexels.com/photos/1556747/pexels-photo-1556747.jpeg?auto=compress&cs=tinysrgb&w=200",
    starterTodos: [
      "Brew an actually drinkable coffee",
      "Answer that one email you've ignored for 3 days",
      "Rename TODO list to \"Definitely Not Procrastinating\"",
    ],
  },
  {
    id: "fitness-penguin",
    name: "Fitness Penguin",
    mood: "Cardio? More like car-don't.",
    imageUrl:
      "https://images.pexels.com/photos/86405/penguin-snow-winter-86405.jpeg?auto=compress&cs=tinysrgb&w=200",
    starterTodos: [
      "Do 10 jumping jacks (if you remember)",
      "Take the stairs once today",
      "Stretch like you mean it for 30 seconds",
    ],
  },
  {
    id: "zen-cat",
    name: "Zen Cat",
    mood: "Professional nap consultant.",
    imageUrl:
      "https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg?auto=compress&cs=tinysrgb&w=200",
    starterTodos: [
      "Schedule a 5‑minute nothing break",
      "Declutter one tiny corner of your desk",
      "Close one tab. Just one. You can do it.",
    ],
  },
];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);

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

  const applyPersona = (persona: Persona) => {
    setActivePersonaId((current) =>
      current === persona.id ? null : persona.id
    );

    setTodos((prev) => {
      const existingTexts = new Set(prev.map((t) => t.text));
      const newOnes = persona.starterTodos.filter(
        (label) => !existingTexts.has(label)
      );

      const now = Date.now();
      const generated = newOnes.map((label, index) => ({
        id: now + index,
        text: label,
        done: false,
      }));

      return [...prev, ...generated];
    });
  };

  return (
    <div className="app-root">
      <main className="app">
        <header className="app-header">
          <h1>Todo</h1>
          <p className="app-subtitle">Pick a persona. Respect the chaos.</p>
        </header>

        <section className="persona-strip" aria-label="Choose your persona">
          {PERSONAS.map((persona) => (
            <button
              key={persona.id}
              type="button"
              className={
                persona.id === activePersonaId
                  ? "persona-card active"
                  : "persona-card"
              }
              onClick={() => applyPersona(persona)}
            >
              <div className="persona-avatar-wrapper">
                <img
                  src={persona.imageUrl}
                  alt={persona.name}
                  className="persona-avatar"
                  loading="lazy"
                />
              </div>
              <div className="persona-meta">
                <span className="persona-name">{persona.name}</span>
                <span className="persona-mood">{persona.mood}</span>
              </div>
            </button>
          ))}
        </section>

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
