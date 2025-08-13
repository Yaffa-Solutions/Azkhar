const request = require('supertest');
const app = require('../app');
const db = require("../database/config/connection");
const { getZeker } = require("../database/queries/getZeker"); 

it("should return all users", (done) => {
  request(app)
    .get("/")
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);

      if (res.body.length > 0) {
        if (!("id" in res.body[0]) || !("username" in res.body[0]) || !("email" in res.body[0])) {
          return done(new Error("Missing user fields"));
        }
      }

      done();
    });
});
after((done) => {
  db.end()
    .then(() => done())
    .catch((err) => done(err));
});

describe("getZeker function", () => {
  it("should return rows from zekher table", (done) => {
    getZeker()
      .then(result => {
        if (!Array.isArray(result.rows)) {
          return done(new Error("Expected result.rows to be an array"));
        }

        if (result.rows.length > 0) {
          const first = result.rows[0];
          if (!("id" in first) || !("title" in first) || !("description" in first) || !("is_fav" in first)) {
            return done(new Error("Missing fields in zeker"));
          }
        }

        done();
      })
      .catch(err => done(err));
  });
});

describe("GET /zeker/:id", () => {
  it("should return a specific zeker if exists", (done) => {
    const testId = 1; 

    request(app)
      .get(`/zeker/${testId}`)
      .expect((res) => {
        if (res.statusCode === 200) {
          if (!("title" in res.body) || !("description" in res.body) || !("is_fav" in res.body)) {
            throw new Error("Missing fields in zeker");
          }
        } else if (res.statusCode === 404) {
          if (!res.body.error) throw new Error("Expected error message for missing zeker");
        } else {
          throw new Error("Unexpected status code");
        }
      })
      .end(done);
  });
});

describe("GET /tasks/:id", () => {
  it("should return a specific task if exists", (done) => {
    const testId = 1; 

    request(app)
      .get(`/tasks/${testId}`)
      .expect((res) => {
        if (res.statusCode === 200) {
          const task = res.body;
          if (!("id" in task) || !("user_id" in task) || !("zekher_id" in task) || !("title" in task) || !("due_date" in task) || !("is_done" in task) || !("target_count" in task)) {
            throw new Error("Missing fields in task");
          }
        } else if (res.statusCode === 404) {
          if (!res.body.error) throw new Error("Expected error message for missing task");
        } else {
          throw new Error("Unexpected status code");
        }
      })
      .end(done);
  });
});

describe("POST /tasks", () => {
  it("should create a new task", (done) => {
    const taskData = {
      user_id: 1,
      zekher_id: 2,
      title: "اختبار مهمة",
      due_date: "2025-08-15",
      is_done: false,
      target_count: 10
    };

    request(app)
      .post("/tasks")
      .send(taskData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        const task = res.body;
        if (!("id" in task) || task.title !== taskData.title || task.user_id !== taskData.user_id) {
          return done(new Error("Task not created correctly"));
        }

        done();
      });
  });
});

describe("PUT /tasks/:id", () => {
  it("should update a specific task", (done) => {
    const testId = 1; 
    const updateData = {
      user_id: 1,
      zekher_id: 2,
      title: "تحديث مهمة",
      due_date: "2025-08-20",
      is_done: true,
      target_count: 20
    };

    request(app)
      .put(`/tasks/${testId}`)
      .send(updateData)
      .expect((res) => {
        if (res.statusCode === 200) {
          const task = res.body;
          if (!("id" in task) || task.title !== updateData.title || task.is_done !== updateData.is_done) {
            throw new Error("Task not updated correctly");
          }
        } else if (res.statusCode === 404) {
          if (!res.body.error) throw new Error("Expected error message for missing task");
        } else {
          throw new Error("Unexpected status code");
        }
      })
      .end(done);
  });
});

describe("DELETE /tasks/:id", () => {
  it("should delete a specific task", (done) => {
    const testId = 1; 

    request(app)
      .delete(`/tasks/${testId}`)
      .expect((res) => {
        if (res.statusCode === 200) {
          if (!res.body.message || res.body.message !== "Task deleted successfully") {
            throw new Error("Task not deleted correctly");
          }
        } else if (res.statusCode === 404) {
          if (!res.body.error) throw new Error("Expected error message for missing task");
        } else {
          throw new Error("Unexpected status code");
        }
      })
      .end(done);
  });
});
describe("GET /articles", () => {
  it("should return all articles with author", (done) => {
    request(app)
      .get("/articles")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        if (res.body.length > 0) {
          const first = res.body[0];
          if (!("id" in first) || !("title" in first) || !("author" in first)) {
            return done(new Error("Missing fields in article"));
          }
        }

        done();
      });
  });
});

describe("GET /articles/:id", () => {
  it("should return a specific article if exists", (done) => {
    const testId = 1;

    request(app)
      .get(`/articles/${testId}`)
      .expect((res) => {
        if (res.statusCode === 200) {
          const article = res.body;
          if (!("id" in article) || !("title" in article) || !("author_id" in article)) {
            throw new Error("Missing fields in article");
          }
        } else if (res.statusCode === 404) {
          if (!res.body.error) throw new Error("Expected error message for missing article");
        } else {
          throw new Error("Unexpected status code");
        }
      })
      .end(done);
  });
});