import { Regiao } from "./Regiao";

export interface Estado {
    id: number;
    nome: string;
    regiao: Regiao;
}