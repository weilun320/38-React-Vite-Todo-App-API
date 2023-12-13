import { useEffect } from "react";
import { useState } from "react";

// A component that displays todo title for selected id
function TodoList({ todosData }) {
  return (
    <ul>
      {todosData.map((todo, index) => {
        return (
          <li key={index}>{todo.title}</li>
        );
      })}
    </ul>
  );
}

// Request todo list data from API based on user ID
async function fetchTodoList(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const data = await response.json();

  return data;
}

function App() {
  const [userId, setUserId] = useState("");
  const [todosData, setTodosData] = useState(null);
  const onInputChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  // Fetch todo list on-the-fly when user types in user ID
  useEffect(() => {
    if (userId) {
      fetchTodoList(userId)
        .then((data) => setTodosData(data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  return (
    <div>
      <h1>Posts by User</h1>
      <input
        min={1}
        max={10}
        onChange={onInputChangeHandler}
        type="number"
        value={userId}
      />
      {todosData && (
        <TodoList todosData={todosData} />
      )}
    </div>
  )
}

export default App
