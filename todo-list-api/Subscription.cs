public class Subscription
{
    [Subscribe]
    public Todo OnTodoAdded([EventMessage] Todo todo) => todo;
}