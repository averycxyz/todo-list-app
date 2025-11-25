using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContextFactory<TodoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services
    .AddCors()
    .AddGraphQLServer()
    .RegisterDbContextFactory<TodoDbContext>()
    .AddQueryType<Query>()  
    .AddMutationType<Mutation>()  
    .AddSubscriptionType<Subscription>()  
    .AddInMemorySubscriptions();

var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

app.MapGraphQL();
app.UseWebSockets();
app.UseCors(MyAllowSpecificOrigins);
app.Run();
