// API Service for JSD-MONO Backend (Port 666)

export const API_BASE_URL = "http://localhost:666";

// Stateful In-Memory Database for dynamic simulator
let memoryUsersV1 = [
  { id: "1", username: "alice_crypto", email: "alice@matrix.io" },
  { id: "2", username: "bob_dev", email: "bob@jsd.th" },
  { id: "3", username: "charlie_arch", email: "charlie@swiss.design" }
];

let memoryUsersV2 = [
  { _id: "67c1234567890abcdef12345", username: "alex_dev", email: "alex@example.com", role: "admin" },
  { _id: "67c1234567890abcdef12346", username: "sarah_security", email: "sarah@example.com", role: "user" }
];

export async function checkServerHealth() {
  const startTime = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const latency = Math.round(performance.now() - startTime);
    return {
      online: response.ok || response.status === 200,
      status: response.status,
      latency,
      mode: "live"
    };
  } catch {
    return {
      online: false,
      status: 0,
      latency: 0,
      mode: "ready"
    };
  }
}

export async function executeApiRequest({
  version = "v1",
  endpoint = "/users",
  method = "GET",
  body = null
}) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${API_BASE_URL}/api/${version}${cleanEndpoint}`;
  const startTime = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      signal: controller.signal
    };

    if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      options.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    const response = await fetch(fullUrl, options);
    clearTimeout(timeoutId);
    const latency = Math.round(performance.now() - startTime);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText || (response.ok ? "OK" : "Error"),
      latency,
      url: fullUrl,
      data,
      isLive: true
    };
  } catch {
    // Dynamic Simulator that realistically processes user inputs and payloads
    const latency = Math.max(12, Math.round(performance.now() - startTime));
    return getDynamicResponse(version, cleanEndpoint, method, body, latency);
  }
}

function getDynamicResponse(version, endpoint, method, body, latency) {
  const normMethod = (method || "GET").toUpperCase();

  // 1. Parse JSON body if present
  let parsed = null;
  if (body) {
    if (typeof body === "object") {
      parsed = body;
    } else if (typeof body === "string" && body.trim().length > 0) {
      try {
        parsed = JSON.parse(body);
      } catch (err) {
        return {
          success: false,
          status: 400,
          statusText: "Bad Request",
          latency,
          url: `${API_BASE_URL}/api/${version}${endpoint}`,
          data: {
            error: "Bad Request (400): รูปแบบ JSON ไม่ถูกต้อง",
            details: err.message,
            hint: "โปรดตรวจสอบเครื่องหมายคำพูด (\") หรือเครื่องหมายจุลภาค (,)"
          },
          isLive: false
        };
      }
    }
  }

  // 2. Handle POST requests dynamically based on user typed data
  if (normMethod === "POST") {
    if (endpoint.includes("/register")) {
      const newUser = {
        _id: "67c" + Math.random().toString(16).substring(2, 10) + "38fae4",
        username: parsed?.username || "new_learner",
        email: parsed?.email || "learner@swiss.design",
        role: parsed?.role || "user",
        createdAt: new Date().toISOString()
      };
      memoryUsersV2.push(newUser);
      return {
        success: true,
        status: 201,
        statusText: "Created",
        latency,
        url: `${API_BASE_URL}/api/${version}${endpoint}`,
        data: {
          message: "Register successful (บันทึกผู้ใช้เรียบร้อยแล้ว)",
          user: newUser
        },
        isLive: false
      };
    }

    if (endpoint.includes("/login")) {
      const userEmail = parsed?.email || "somchai@example.com";
      const userName = parsed?.username || userEmail.split("@")[0] || "somchai_code";
      return {
        success: true,
        status: 200,
        statusText: "OK",
        latency,
        url: `${API_BASE_URL}/api/${version}${endpoint}`,
        data: {
          success: true,
          message: `เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ ${userName}`,
          user: {
            _id: "67c1234567890abcdef12345",
            username: userName,
            email: userEmail,
            role: "admin"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzEyMzQ1Njc4OTBhYmNkZWYxMjM0NSIsInJvbGUiOiJhZG1pbiJ9.k7Bv6..."
        },
        isLive: false
      };
    }

    if (endpoint.includes("/users")) {
      if (version === "v1") {
        const newUser = {
          id: String(memoryUsersV1.length + 1),
          username: parsed?.username || "somchai_code",
          email: parsed?.email || "somchai@example.com"
        };
        memoryUsersV1.push(newUser);
        return {
          success: true,
          status: 201,
          statusText: "Created",
          latency,
          url: `${API_BASE_URL}/api/${version}${endpoint}`,
          data: {
            message: "สร้างผู้ใช้ใน FakeDB (v1) สำเร็จ",
            user: newUser
          },
          isLive: false
        };
      } else {
        const newUser = {
          _id: "67c" + Math.random().toString(16).substring(2, 10) + "789abc",
          username: parsed?.username || "alex_dev",
          email: parsed?.email || "alex@example.com",
          role: parsed?.role || "user",
          createdAt: new Date().toISOString()
        };
        memoryUsersV2.push(newUser);
        return {
          success: true,
          status: 201,
          statusText: "Created",
          latency,
          url: `${API_BASE_URL}/api/${version}${endpoint}`,
          data: {
            message: "สร้างผู้ใช้ใน MongoDB (v2) สำเร็จ",
            user: newUser
          },
          isLive: false
        };
      }
    }

    // Generic POST fallback capturing user's typed data
    return {
      success: true,
      status: 201,
      statusText: "Created",
      latency,
      url: `${API_BASE_URL}/api/${version}${endpoint}`,
      data: {
        success: true,
        message: `ส่งคำขอ POST ไปยัง ${endpoint} สำเร็จ`,
        createdData: parsed || {},
        timestamp: new Date().toISOString()
      },
      isLive: false
    };
  }

  // 3. Handle PUT / PATCH
  if (normMethod === "PUT" || normMethod === "PATCH") {
    return {
      success: true,
      status: 200,
      statusText: "OK",
      latency,
      url: `${API_BASE_URL}/api/${version}${endpoint}`,
      data: {
        success: true,
        message: `อัปเดตข้อมูล ${endpoint} สำเร็จ (${normMethod})`,
        updatedFields: parsed || {},
        updatedAt: new Date().toISOString()
      },
      isLive: false
    };
  }

  // 4. Handle DELETE
  if (normMethod === "DELETE") {
    const targetId = endpoint.split("/").filter(Boolean).pop() || "target";
    return {
      success: true,
      status: 200,
      statusText: "OK",
      latency,
      url: `${API_BASE_URL}/api/${version}${endpoint}`,
      data: {
        success: true,
        message: `ลบข้อมูลเป้าหมาย '${targetId}' เรียบร้อยแล้ว`,
        deletedId: targetId,
        timestamp: new Date().toISOString()
      },
      isLive: false
    };
  }

  // 5. Handle GET
  if (endpoint.includes("/auth")) {
    return {
      success: true,
      status: 200,
      statusText: "OK",
      latency,
      url: `${API_BASE_URL}/api/${version}${endpoint}`,
      data: {
        success: true,
        authenticated: true,
        user: {
          _id: "67c1234567890abcdef12345",
          username: "alex_dev",
          role: "admin",
          email: "alex@example.com"
        }
      },
      isLive: false
    };
  }

  if (endpoint.includes("/users")) {
    return {
      success: true,
      status: 200,
      statusText: "OK",
      latency,
      url: `${API_BASE_URL}/api/${version}${endpoint}`,
      data: version === "v1" ? [...memoryUsersV1] : [...memoryUsersV2],
      isLive: false
    };
  }

  // Fallback GET
  return {
    success: true,
    status: 200,
    statusText: "OK",
    latency,
    url: `${API_BASE_URL}/api/${version}${endpoint}`,
    data: {
      success: true,
      endpoint,
      method: "GET",
      timestamp: new Date().toISOString()
    },
    isLive: false
  };
}
