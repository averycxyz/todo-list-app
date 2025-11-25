import './App.css'
import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
        <li key={todo.id}>heeeehooo {todo.title}</li>
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      {DisplayTodos()}
    </>
  )
}

export default App
