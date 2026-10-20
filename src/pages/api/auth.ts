import type { APIRoute } from "astro";

export const prerender = false;

// Mock de credenciais administrativas da JLA Code
const MOCK_USERS = [
  {
    email: "admin@jlacode.com.br",
    user: "admin",
    pass: "jla2025",
    name: "José Luis Aldrighi",
    role: "Administrador JLA Code",
  },
  {
    email: "jose@jlacode.com.br",
    user: "jose",
    pass: "admin123",
    name: "José Luis Aldrighi",
    role: "Fundador & Desenvolvedor",
  },
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const loginInput = (body.login || body.email || body.user || "").trim().toLowerCase();
    const passwordInput = (body.password || body.senha || "").trim();

    if (!loginInput || !passwordInput) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Por favor informe o usuário/e-mail e a senha.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const matched = MOCK_USERS.find(
      (u) =>
        (u.email.toLowerCase() === loginInput || u.user.toLowerCase() === loginInput) &&
        u.pass === passwordInput
    );

    if (!matched) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Credenciais inválidas. Verifique o usuário e a senha.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Retorna token de sessão mockado
    const sessionToken = `jla_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return new Response(
      JSON.stringify({
        success: true,
        token: sessionToken,
        user: {
          name: matched.name,
          email: matched.email,
          role: matched.role,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Erro interno de autenticação" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
