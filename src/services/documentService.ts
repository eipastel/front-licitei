import { api } from '../config/api'
import { endpoints } from '../config/endpoints';

interface ApiResponse {
    data : {
        data: any;
        message: string;
        success: boolean;
    },
    status: number
}

interface Requisito {
    id: number;
    atende: boolean;
    descricao: string;
    titulo: string;
    observacao: string;
}

export const initProcessFile = async (file: File): Promise<ApiResponse> => {
    const formData = new FormData();
    
    formData.append('file', file);

    return api.post(endpoints.DOCUMENTO.PROCESSAR, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    // const ficticio = {
    //     data: {
    //         data: {
    //             id: 23
    //         },
    //         message: 'Sucesso',
    //         success: true
    //     },
    //     status: 200
    // }

    // return new Promise((resolve, reject) => {
    //     resolve(ficticio)
    // })
}

export const verifyExtraction = async (id: number): Promise<ApiResponse> => {
    return api.get(`${endpoints.DOCUMENTO.VERIFICAR}/${id}`)
}

export const startAnalysis = async (id: number): Promise<ApiResponse> => {
    return api.get(`${endpoints.DOCUMENTO.ANALISAR}/${id}`)
}

export const getResult = async (id: number): Promise<ApiResponse> => {
    return api.get(`${endpoints.DOCUMENTO.RESULTADO}/${id}`)
}

export const generateAndDownloadCsv = async (requisitos: Requisito[]) => {
    const header = "ID,Título,Descrição,Observação,Atende";

    // Função para escapar os campos
    const escapeCsvField = (field: string | number) => {
        if (typeof field === 'string') {
            return `"${field.replace(/\n/g, ' ').replace(/"/g, '""')}"`;
        }
        return `"${field}"`; // Garantir que valores numéricos ou booleanos também sejam convertidos para string
    };

    const csvContent = requisitos.map(requisito => 
        [
            escapeCsvField(requisito.id),
            escapeCsvField(requisito.titulo),
            escapeCsvField(requisito.descricao),
            escapeCsvField(requisito.observacao),
            escapeCsvField(requisito.atende ? 'Sim' : 'Não')
        ].join(',')
    ).join('\n');

    const csv = `${header}\n${csvContent}`;
    const blob = new Blob([csv], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'requisitos.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};