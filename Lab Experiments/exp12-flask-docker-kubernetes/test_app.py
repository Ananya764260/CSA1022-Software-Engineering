import pytest
from app import app, todos


@pytest.fixture
def client():
    todos.clear()
    app.config["TESTING"] = True
    return app.test_client()


def test_home(client):
    assert client.get("/").status_code == 200


def test_health(client):
    assert client.get("/health").get_json()["status"] == "ok"


def test_add_and_list(client):
    r = client.post("/todos", json={"title": "Write report"})
    assert r.status_code == 201
    assert client.get("/todos").get_json()[0]["title"] == "Write report"


def test_add_requires_title(client):
    assert client.post("/todos", json={}).status_code == 400


def test_toggle_and_delete(client):
    client.post("/todos", json={"title": "x"})
    assert client.put("/todos/1").get_json()["done"] is True
    assert client.delete("/todos/1").status_code == 204
    assert client.delete("/todos/1").status_code == 404
