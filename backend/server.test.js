const request = require("supertest");
const mongoose = require("mongoose");

const app = require("./app");
const Todo = require("./model");

jest.setTimeout(30000);

const TEST_DB_URI = "mongodb://127.0.0.1:27017/todo_test";

beforeAll(async () => {
  console.log("Connecting to test MongoDB...");

  await mongoose.connect(TEST_DB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });

  console.log("Test MongoDB connected");
});

afterEach(async () => {
  await Todo.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();

  console.log("Test MongoDB disconnected");
});


describe("Todo API", () => {

  test("POST /api/todoname - should create a todo", async () => {

    const response = await request(app)
      .post("/api/todoname")
      .send({
        title: "Learn CI/CD",
        description: "Learn GitHub Actions",
        priority: "High",
        status: "Pending",
        dueDate: "2026-10-05"
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe(
      "Todo created successfully"
    );

    expect(response.body.todo.title).toBe("Learn CI/CD");
  });


  test("GET /api/todoname - should return all todos", async () => {

    await Todo.create({
      title: "Learn Node",
      description: "Learn Express",
      priority: "Medium",
      status: "Pending"
    });

    const response = await request(app)
      .get("/api/todoname");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Learn Node");
  });


  test("GET /api/todoname/:id - should return one todo", async () => {

    const todo = await Todo.create({
      title: "Learn MongoDB",
      description: "Practice MongoDB",
      priority: "High",
      status: "Pending"
    });

    const response = await request(app)
      .get(`/api/todoname/${todo._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Learn MongoDB");
  });


  test("PATCH /api/todoname/:id - should update todo", async () => {

    const todo = await Todo.create({
      title: "Old Title",
      description: "Old Description",
      priority: "Low",
      status: "Pending"
    });

    const response = await request(app)
      .patch(`/api/todoname/${todo._id}`)
      .send({
        title: "Updated Title",
        status: "Completed"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.todo.title).toBe("Updated Title");
    expect(response.body.todo.status).toBe("Completed");
  });


  test("DELETE /api/todoname/:id - should delete todo", async () => {

    const todo = await Todo.create({
      title: "Delete Me",
      description: "This todo will be deleted",
      priority: "Low",
      status: "Pending"
    });

    const response = await request(app)
      .delete(`/api/todoname/${todo._id}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe(
      "Todo deleted successfully"
    );

    const deletedTodo = await Todo.findById(todo._id);

    expect(deletedTodo).toBeNull();
  });

});