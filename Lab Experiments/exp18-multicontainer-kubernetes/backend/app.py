import os
import psycopg2
from flask import Flask, jsonify, request

app = Flask(__name__)


def conn():
    return psycopg2.connect(host=os.getenv("DB_HOST", "db"), dbname=os.getenv("DB_NAME", "todos"),
                            user=os.getenv("DB_USER", "postgres"), password=os.getenv("DB_PASSWORD", "postgres"))


def init():
    with conn() as c, c.cursor() as cur:
        cur.execute("CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title TEXT NOT NULL)")


@app.get("/api/todos")
def list_todos():
    with conn() as c, c.cursor() as cur:
        cur.execute("SELECT id, title FROM todos ORDER BY id")
        return jsonify([{"id": r[0], "title": r[1]} for r in cur.fetchall()])


@app.post("/api/todos")
def add():
    title = (request.get_json(silent=True) or {}).get("title", "").strip()
    if not title:
        return jsonify(error="title required"), 400
    with conn() as c, c.cursor() as cur:
        cur.execute("INSERT INTO todos (title) VALUES (%s) RETURNING id", (title,))
        return jsonify(id=cur.fetchone()[0], title=title), 201


@app.get("/api/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    for _ in range(10):
        try:
            init(); break
        except Exception:
            import time; time.sleep(2)
    app.run(host="0.0.0.0", port=5000)
