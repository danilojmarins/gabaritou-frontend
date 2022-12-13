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
}