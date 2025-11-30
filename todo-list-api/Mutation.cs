using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

public class Mutation
{
    public async Task<Todo> AddTodoAsync(
        AddTodoInput input,
        [Service] IDbContextFactory<TodoDbContext> dbContextFactory,
        [Service] ITopicEventSender sender)
    {
        await using var dbContext = await dbContextFactory.CreateDbContextAsync();
        var todo = new Todo { Title = input.Title, CreatedAt = DateTime.Now };
        dbContext.Todos.Add(todo);
        await dbContext.SaveChangesAsync();

        // Publish an event to the subscription topic
        await sender.SendAsync(nameof(Subscription.OnTodoAdded), todo);

        return todo;
    }

    public record AddTodoInput(string Title);

    // public async Task<Todo> MarkTodoCompleted(Todo todo) {}
    public async Task<UpdateTodoPayload> UpdateTodo(
        UpdateTodoInput input,
        [Service] TodoDbContext context)
    {
        var todo = await context.Todos.FindAsync(input.Id);

        if (todo == null)
        {
            throw new Exception("Todo not found.");
        }

        todo.IsCompleted = input.IsCompleted ?? todo.IsCompleted; // Update if provided
        todo.Title = input.Title ?? todo.Title; // Update if provided

        await context.SaveChangesAsync();

        return new UpdateTodoPayload { Todo = todo };
    }
}

public class UpdateTodoPayload
{
    public required Todo Todo { get; set; }
}

public class UpdateTodoInput
{
    public int Id { get; set; }
    public string Title { get; set; }
    public bool? IsCompleted { get; set; }
}

