using Microsoft.EntityFrameworkCore;

public class Query
{
    /*
    public Todo GetTodo()
    {
        return new Todo
        {
            Id = 1,
            Title = "connect this API to SQL Server",
            IsCompleted = false,
            CreatedAt = DateTime.Now
        };
    }
    */

    public IQueryable<Todo> GetTodos([Service] TodoDbContext context)
    {
        return context.Todos; // Example using Entity Framework Core
    }
}