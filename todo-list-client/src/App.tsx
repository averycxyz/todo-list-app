import './App.css'
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

const ADD_TODO = gql`
  mutation AddNewTodo {
    addTodo(input: { title: "add a todo from the client" }) {
      id
      title
      isCompleted
      createdAt
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo {
    updateTodo(input: {id: 1007, title: "add a todo from the client", isCompleted: true}) {
      todo {
        id
        title
        isCompleted
        createdAt
      }
    }
  }
`;

type GetTodosQuery = {
  todos: {
    __typename: "User";
    id: number;
    age: number;
    name: string;
    isMarried: boolean;
  };
};

type GetTodosQueryVariables = Record<string, never>;

const GET_TODOS: TypedDocumentNode<
  GetTodosQuery, 
  GetTodosQueryVariables
> = gql`
  query GetTodos {
    todos {
      id
      title
      isCompleted
      createdAt
    }
  }
`;

function DisplayTodos() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      {data.todos.map((todo) => (
        <li style={{textAlign: 'left'}} key={todo.id} >{todo.id}: {todo.title}</li>
      ))}
    </div>
  );
}

function AddTodo() {
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.itemName.value;
    addTodo({variables: {name} });
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type ="text" name="itemName" placeholder="new todo title" />
      <button type="submit">Add Todo</button>
    </form>
  )
}

function UpdateTodo() {
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.itemName.value;
    updateTodo({variables: {name} });
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type ="text" name="itemName" placeholder="todo id" />
      <button type="submit">mark todo completed</button>
    </form>
  )
}

function App() {
  return (
    <>
      {AddTodo()}
      {UpdateTodo()}
      {DisplayTodos()}
    </>
  )
}

export default App
