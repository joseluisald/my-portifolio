import type { APIRoute } from "astro";
import {
  getAllBriefings,
  saveBriefing,
  updateBriefing,
  deleteBriefing,
} from "../../lib/briefingsStore";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const briefings = getAllBriefings();
    return new Response(JSON.stringify({ success: true, briefings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Falha ao ler briefings" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body || !body.cliente) {
      return new Response(
        JSON.stringify({ success: false, error: "Dados inválidos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const saved = saveBriefing({
      cliente: {
        nome: body.cliente.nome || "Não informado",
        telefone: body.cliente.telefone || "Não informado",
        empresa: body.cliente.empresa || "",
      },
      resumoFormatado: body.resumoFormatado || "",
      form: body.form || {},
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Briefing salvo com sucesso no arquivo JSON!",
        briefing: saved,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro no POST /api/briefings:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Erro interno ao salvar briefing" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, status, notasInternas } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID obrigatório" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const updated = updateBriefing(id, {
      ...(status ? { status } : {}),
      ...(notasInternas !== undefined ? { notasInternas } : {}),
    });

    if (!updated) {
      return new Response(
        JSON.stringify({ success: false, error: "Briefing não encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, briefing: updated }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao atualizar briefing" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID obrigatório na query" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const deleted = deleteBriefing(id);
    if (!deleted) {
      return new Response(
        JSON.stringify({ success: false, error: "Registro não encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Briefing excluído com sucesso" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Erro ao excluir" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
