from flask import Flask, jsonify, request

app = Flask(__name__)
todos = []


@app.get("/")
def home():
    return jsonify(message="Flask API is running", version="1.0")


@app.get("/health")
def health():
    return jsonify(status="ok")


@app.get("/todos")
def list_todos():
    return jsonify(todos)


@app.post("/todos")
def add_todo():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "").strip()
    if not title:
        return jsonify(error="title is required"), 400
    item = {"id": len(todos) + 1, "title": title, "done": False}
    todos.append(item)
    return jsonify(item), 201


@app.put("/todos/<int:todo_id>")
def toggle_todo(todo_id):
    for t in todos:
        if t["id"] == todo_id:
            t["done"] = not t["done"]
            return jsonify(t)
    return jsonify(error="not found"), 404


@app.delete("/todos/<int:todo_id>")
def delete_todo(todo_id):
    global todos
    before = len(todos)
    todos = [t for t in todos if t["id"] != todo_id]
    if len(todos) == before:
        return jsonify(error="not found"), 404
    return "", 204


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
