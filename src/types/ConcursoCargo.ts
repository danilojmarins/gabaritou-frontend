import { Concurso } from "./Concurso";
import { Escolaridade } from "./Escolaridade";

export interface ConcursoCargo {
    id: number;
    descricao: string;
    concurso: Concurso;
    escolaridade: Escolaridade;
}