const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function errorMessage(data, status) {
  const detail = data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((d) => {
        const field = d.loc?.[d.loc.length - 1];
        return field ? `${String(field).replace("_", " ")}: ${d.msg}` : d.msg;
      })
      .join(". ");
  }
  return `Something went wrong (${status})`;
}

export async function api(path, { method = "GET", body, token } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(body && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Can't reach the server. Is the backend running?");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(errorMessage(data, res.status));
    err.status = res.status;
    throw err;
  }
  return data;
}