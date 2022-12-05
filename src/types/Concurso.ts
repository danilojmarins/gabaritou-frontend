import { Banca } from "./Banca";
import { Orgao } from "./Orgao";

export interface Concurso {
    id: number;
    ano: string;
    banca: Banca;
    orgao: Orgao;
}