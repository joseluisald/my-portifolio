import fs from "node:fs";
import path from "node:path";

export type BriefingStatus = "Pending" | "In Progress" | "Completed";

export interface BriefingRecord {
  id: string;
  createdAt: string;
  status: BriefingStatus;
  notasInternas?: string;
  cliente: {
    nome: string;
    telefone: string;
    empresa?: string;
  };
  resumoFormatado: string;
  form: {
    objetivoPrincipal: string;
    objetivoOutro?: string;
    referenciasSites?: string;
    concorrentes?: string;
    quantidadePaginas: string;
    paginasDetalhes?: string;
    funcionalidades: string[];
    funcionalidadeOutra?: string;
    tipoPagamento: string;
    idiomas: string;
    identidadeVisual: string;
    conteudoCopy: string;
    dominioHospedagem: string;
    dominioNome?: string;
    prazoUrgencia: string;
    prazoDataEspecifica?: string;
    manutencaoMensal: string;
    observacoes?: string;
  };
}

const dataDir = path.resolve(process.cwd(), "data");
const filePath = path.join(dataDir, "briefings.json");

// Garante que o diretório e o arquivo JSON existam com dados iniciais se vazio
export function ensureBriefingsFile(): void {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getAllBriefings(): BriefingRecord[] {
  ensureBriefingsFile();
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data: BriefingRecord[] = JSON.parse(raw);
    return data
      .map((item) => {
        // Normaliza status para os três estados oficiais: Pending, In Progress, Completed
        let st: BriefingStatus = "Pending";
        if (item.status === "In Progress" || (item.status as string) === "em_analise" || (item.status as string) === "in_progress") {
          st = "In Progress";
        } else if (item.status === "Completed" || (item.status as string) === "aprovado" || (item.status as string) === "concluido" || (item.status as string) === "completed") {
          st = "Completed";
        } else {
          st = "Pending";
        }
        return { ...item, status: st };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Erro ao ler briefings.json:", error);
    return [];
  }
}

export function saveBriefing(newRecord: Omit<BriefingRecord, "id" | "createdAt" | "status">): BriefingRecord {
  ensureBriefingsFile();
  const list = getAllBriefings();

  const record: BriefingRecord = {
    ...newRecord,
    id: `brf_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "Pending",
  };

  list.unshift(record);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  return record;
}

export function updateBriefing(id: string, updates: Partial<BriefingRecord>): BriefingRecord | null {
  ensureBriefingsFile();
  const list = getAllBriefings();
  const idx = list.findIndex((item) => item.id === id);

  if (idx === -1) return null;

  list[idx] = {
    ...list[idx],
    ...updates,
  };

  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  return list[idx];
}

export function deleteBriefing(id: string): boolean {
  ensureBriefingsFile();
  const list = getAllBriefings();
  const filtered = list.filter((item) => item.id !== id);

  if (filtered.length === list.length) return false;

  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
