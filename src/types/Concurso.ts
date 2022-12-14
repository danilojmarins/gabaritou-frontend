import { Banca } from "./Banca";
import { Estado } from "./Estado";
import { Orgao } from "./Orgao";

export interface Concurso {
    id: number;
    ano: string;
    banca: Banca;
    orgao: Orgao;
    status: number;
    estado: Estado;
    edital_url: string | null;
    inicio_inscricao: Date | null;
    fim_inscricao: Date | null;
    taxa_inscricao: number | null;
    num_vagas: number | null;
    data_prova: Date | null;
    min_salario: number | null;
    max_salario: number | null;
}