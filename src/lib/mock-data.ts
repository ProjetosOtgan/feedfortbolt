import { User, Setor, Secao, FuncionarioProfile, AtributoDeDesempenho, AtividadeObservada, Feedback, TipoOcorrencia } from './types';

export const users: User[] = [
  { id: 'admin1', name: 'Admin Geral', email: 'admin@retail.com', role: 'Admin', avatarUrl: 'https://i.pravatar.cc/150?u=admin1' },
  { id: 'lider1', name: 'Carlos Silva', email: 'carlos.silva@retail.com', role: 'Lider', avatarUrl: 'https://i.pravatar.cc/150?u=lider1' },
  { id: 'lider2', name: 'Mariana Costa', email: 'mariana.costa@retail.com', role: 'Lider', avatarUrl: 'https://i.pravatar.cc/150?u=lider2' },
  { id: 'func1', name: 'Ana Pereira', email: 'ana.pereira@retail.com', role: 'Funcionario', avatarUrl: 'https://i.pravatar.cc/150?u=func1' },
  { id: 'func2', name: 'Bruno Alves', email: 'bruno.alves@retail.com', role: 'Funcionario', avatarUrl: 'https://i.pravatar.cc/150?u=func2' },
  { id: 'func3', name: 'Juliana Lima', email: 'juliana.lima@retail.com', role: 'Funcionario', avatarUrl: 'https://i.pravatar.cc/150?u=func3' },
  { id: 'func4', name: 'Ricardo Souza', email: 'ricardo.souza@retail.com', role: 'Funcionario', avatarUrl: 'https://i.pravatar.cc/150?u=func4' },
  { id: 'func5', name: 'Fernanda Oliveira', email: 'fernanda.oliveira@retail.com', role: 'Funcionario', avatarUrl: 'https://i.pravatar.cc/150?u=func5' },
];

export const setores: Setor[] = [
  { id: 'setor1', name: 'Mercearia' },
  { id: 'setor2', name: 'Frios e Laticínios' },
  { id: 'setor3', name: 'Hortifruti' },
];

export const secoes: Secao[] = [
  { id: 'secao1', name: 'Mercearia Seca', setorId: 'setor1' },
  { id: 'secao2', name: 'Bebidas', setorId: 'setor1' },
  { id: 'secao3', name: 'Queijos e Embutidos', setorId: 'setor2' },
  { id: 'secao4', name: 'Iogurtes e Leites', setorId: 'setor2' },
  { id: 'secao5', name: 'Frutas', setorId: 'setor3' },
  { id: 'secao6', name: 'Verduras e Legumes', setorId: 'setor3' },
];

export const funcionarioProfiles: FuncionarioProfile[] = [
  { usuarioId: 'func1', secaoId: 'secao1', liderId: 'lider1', turno: 'Manhã' },
  { usuarioId: 'func2', secaoId: 'secao2', liderId: 'lider1', turno: 'Tarde' },
  { usuarioId: 'func3', secaoId: 'secao3', liderId: 'lider2', turno: 'Manhã' },
  { usuarioId: 'func4', secaoId: 'secao5', liderId: 'lider2', turno: 'Noite' },
  { usuarioId: 'func5', secaoId: 'secao1', liderId: 'lider1', turno: 'Manhã' },
];

export const atributosDeDesempenho: AtributoDeDesempenho[] = [
  { id: 'attr1', name: 'Agilidade' },
  { id: 'attr2', name: 'Gentileza' },
  { id: 'attr3', name: 'Adaptabilidade' },
  { id: 'attr4', name: 'Comunicação' },
  { id: 'attr5', name: 'Trabalho em equipe' },
  { id: 'attr6', name: 'Iniciativa' },
  { id: 'attr7', name: 'Responsabilidade' },
  { id: 'attr8', name: 'Curiosidade' },
];

export const atividadesObservadas: AtividadeObservada[] = [
  { id: 'ativ1', descricao: 'Organização de gôndolas', peso: 7, atributoDeDesempenhoId: 'attr7' },
  { id: 'ativ2', descricao: 'Abordagem proativa ao cliente', peso: 9, atributoDeDesempenhoId: 'attr2' },
  { id: 'ativ3', descricao: 'Reposição rápida de produtos', peso: 8, atributoDeDesempenhoId: 'attr1' },
  { id: 'ativ4', descricao: 'Comunicação clara com colegas', peso: 6, atributoDeDesempenhoId: 'attr4' },
  { id: 'ativ5', descricao: 'Ajuda a colegas de outros setores', peso: 7, atributoDeDesempenhoId: 'attr5' },
  { id: 'ativ6', descricao: 'Sugerir melhoria em processo', peso: 10, atributoDeDesempenhoId: 'attr6' },
  { id: 'ativ7', descricao: 'Manuseio de novo sistema de caixa', peso: 5, atributoDeDesempenhoId: 'attr3' },
  { id: 'ativ8', descricao: 'Busca por informações de produtos', peso: 6, atributoDeDesempenhoId: 'attr8' },
];

export const feedbacks: Feedback[] = [
  {
    id: 'fb1',
    funcionarioId: 'func1',
    liderId: 'lider1',
    data: '2024-07-28T10:00:00Z',
    comentarioQualitativo: 'Ana demonstrou grande responsabilidade na organização da seção de grãos.',
    items: [
      { id: 'fbi1', feedbackId: 'fb1', atividadeObservadaId: 'ativ1', pontuacao: 5 },
      { id: 'fbi2', feedbackId: 'fb1', atividadeObservadaId: 'ativ4', pontuacao: 4 },
    ],
    ocorrencias: [],
  },
  {
    id: 'fb2',
    funcionarioId: 'func1',
    liderId: 'lider1',
    data: '2024-07-20T11:00:00Z',
    comentarioQualitativo: 'Excelente abordagem aos clientes que precisavam de ajuda.',
    items: [
      { id: 'fbi3', feedbackId: 'fb2', atividadeObservadaId: 'ativ2', pontuacao: 5 },
      { id: 'fbi4', feedbackId: 'fb2', atividadeObservadaId: 'ativ3', pontuacao: 4 },
    ],
    ocorrencias: [
      { id: 'oc1', feedbackId: 'fb2', tipo: 'Elogio do Cliente', descricao: 'Cliente elogiou a simpatia e prestatividade.' }
    ],
  },
  {
    id: 'fb3',
    funcionarioId: 'func2',
    liderId: 'lider1',
    data: '2024-07-28T15:00:00Z',
    comentarioQualitativo: 'Bruno foi muito ágil na reposição da área de refrigerantes.',
    items: [
      { id: 'fbi5', feedbackId: 'fb3', atividadeObservadaId: 'ativ3', pontuacao: 5 },
      { id: 'fbi6', feedbackId: 'fb3', atividadeObservadaId: 'ativ5', pontuacao: 3 },
    ],
    ocorrencias: [],
  },
  {
    id: 'fb4',
    funcionarioId: 'func5',
    liderId: 'lider1',
    data: '2024-07-29T09:00:00Z',
    comentarioQualitativo: 'Fernanda mostrou grande iniciativa ao sugerir uma nova organização para os produtos de limpeza.',
    items: [
      { id: 'fbi7', feedbackId: 'fb4', atividadeObservadaId: 'ativ6', pontuacao: 5 },
      { id: 'fbi8', feedbackId: 'fb4', atividadeObservadaId: 'ativ1', pontuacao: 4 },
    ],
    ocorrencias: [
        { id: 'oc2', feedbackId: 'fb4', tipo: 'Iniciativa Digna de Nota', descricao: 'Sugeriu melhoria no layout da seção.' }
    ],
  },
  {
    id: 'fb5',
    funcionarioId: 'func2',
    liderId: 'lider1',
    data: '2024-07-15T16:00:00Z',
    comentarioQualitativo: 'Precisa melhorar a comunicação com os colegas ao trocar de turno.',
    items: [
      { id: 'fbi9', feedbackId: 'fb5', atividadeObservadaId: 'ativ4', pontuacao: 2 },
    ],
    ocorrencias: [],
  },
  {
    id: 'fb6',
    funcionarioId: 'func1',
    liderId: 'lider1',
    data: '2024-06-30T10:30:00Z',
    comentarioQualitativo: 'Muito adaptável ao cobrir um colega no setor de hortifruti de última hora.',
    items: [
      { id: 'fbi10', feedbackId: 'fb6', atividadeObservadaId: 'ativ7', pontuacao: 5 },
      { id: 'fbi11', feedbackId: 'fb6', atividadeObservadaId: 'ativ5', pontuacao: 5 },
    ],
    ocorrencias: [],
  },
];

export const tiposOcorrencia: TipoOcorrencia[] = [
  { id: 'oc-tipo-1', tipo: 'Elogio do Cliente' },
  { id: 'oc-tipo-2', tipo: 'Atraso Não Justificado' },
  { id: 'oc-tipo-3', tipo: 'Meta de Vendas Atingida' },
  { id: 'oc-tipo-4', tipo: 'Quebra de Procedimento' },
  { id: 'oc-tipo-5', tipo: 'Iniciativa Digna de Nota' },
];
