import { Concurso } from "./Concurso";
import { ConcursoCargo } from "./ConcursoCargo";
import { Escolaridade } from "./Escolaridade";
import { Especialidade } from "./Especialidade";
import { TipoEspecialidade } from "./TipoEspecialidade";
import { TipoQuestao } from "./TipoQuestao";

export interface Prova {
    id: number;
    concurso: Concurso;
    cargo: ConcursoCargo;
    especialidade: Especialidade;
    escolaridade: Escolaridade;
    tipo_questao: TipoQuestao;
    tipo_especialidade: TipoEspecialidade;
    files_url: string;
    aluno_premium: boolean;
}