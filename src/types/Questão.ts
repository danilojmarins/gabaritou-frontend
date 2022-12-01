export interface Questao {
    id: number;
    texto: string;
    alternativas: {
        letra: string;
        texto: string;
    }[];
    gabarito: string;
    ano: string;
    tipo_id: number;
    banca_id: number;
    orgao_id: number;
    area_conhecimento_id: number;
    disciplina_id: number;
}