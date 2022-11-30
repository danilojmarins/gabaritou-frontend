export interface Questao {
    id: number;
    texto: string;
    alternativas: {
        alternativa: string;
        texto: string;
    }[];
}