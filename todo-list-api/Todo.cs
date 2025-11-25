public class Todo
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
}

// public record Todo(int Id, string Title, bool IsCompleted, DateTime CreatedAt);