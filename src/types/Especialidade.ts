import { Concurso } from "./Concurso";
import { ConcursoCargo } from "./ConcursoCargo";

export interface Especialidade {
    id: number;
    descricao: string;
    concurso: Concurso;
    cargo: ConcursoCargo;
}