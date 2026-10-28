def register(client, email="a@example.com", password="password123", **extra):
    return client.post(
        "/auth/register",
        json={"email": email, "password": password, "full_name": "Test User", **extra},
    )


def login(client, email="a@example.com", password="password123"):
    return client.post("/auth/login", json={"email": email, "password": password})


def test_register_succeeds_and_hides_password(client):
    r = register(client)
    assert r.status_code == 201
    assert "password" not in r.json()
    assert "password_hash" not in r.json()


def test_duplicate_email_rejected_case_insensitively(client):
    register(client, email="a@example.com")
    assert register(client, email="A@Example.com").status_code == 409


def test_cannot_register_as_admin(client):
    assert register(client, role="admin").status_code == 422


def test_short_password_rejected(client):
    assert register(client, password="short").status_code == 422


def test_login_returns_token(client):
    register(client)
    r = login(client)
    assert r.status_code == 200
    assert r.json()["access_token"]


def test_wrong_password_rejected(client):
    register(client)
    assert login(client, password="wrongpassword").status_code == 401


def test_unknown_email_rejected(client):
    assert login(client, email="nobody@example.com").status_code == 401


def test_me_requires_token(client):
    assert client.get("/users/me").status_code == 401


def test_me_with_valid_token(client):
    register(client)
    token = login(client).json()["access_token"]
    r = client.get("/users/me", headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["email"] == "a@example.com"


def test_me_with_garbage_token(client):
    r = client.get("/users/me", headers={"Authorization": "Bearer not.a.token"})
    assert r.status_code == 401