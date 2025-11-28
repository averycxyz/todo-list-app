### Todo-list app/api setup

## Install dependencies

# App

```
npm install @apollo/client
```

# API

```
dotnet add package HotChocolate.AspNetCore HotChocolate.Data.EntityFramework Microsoft.EntityFrameworkCore.SqlServer
```

In appsettings.json, update the DefaultConnection string to match your mssql server

```
"ConnectionStrings": {
    "DefaultConnection": "Server=<your mssql server's url>;Database=<your database>;User Id=<your user id>;Password=<your password>;MultipleActiveResultSets=true;TrustServerCertificate=true;"
  },
```

## graphql queries/mutations (https://localhost:5038/graphql)

```
mutation AddNewTodo {
  addTodo(input: { title: "why was the id of my mutation set to 1004 shouldn't it have been 3" }) {
    id
    title
    isCompleted
    createdAt
  }
}

query getTodos {
  todos {
    id
    title
    isCompleted
    createdAt
  }
}

mutation UpdateTodo {
  updateTodo(input: {id: 1004, title: "seals when they go awawawawawawa", isCompleted: true}) {
    todo {
      id
      title
      isCompleted
      createdAt
    }
  }
}
```

# TODO

- mutation deleteTodo
- Add CRUD operations to client
- client UI with tailwind css