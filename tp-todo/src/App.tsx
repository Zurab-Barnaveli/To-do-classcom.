import React, { Component } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}


interface State {
  todos: Todo[];
  currentTask: string;
}

class TodoList extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      todos: [],
      currentTask: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentTask: event.target.value,
    });
  };

  handleAddTodo = () => {
    if (this.state.currentTask === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      task: this.state.currentTask,
      completed: false,
    };

    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      currentTask: "",
    }));
  };

  handleDeleteTodo = (id: number) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleCompleteTodo = (id: number) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      }),
    }));
  };

  render() {
    const { todos, currentTask } = this.state;

    return (
      <div>
        <h1>TODO List</h1>
        <input type="text" value={currentTask} onChange={this.handleInputChange} />
        <button onClick={this.handleAddTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }} onClick={() => this.handleCompleteTodo(todo.id)}>{todo.task}</span>
              <button onClick={() => this.handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
