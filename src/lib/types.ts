export type UserRole = 'Admin' | 'Lider' | 'Funcionario';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface Setor {
  id: string;
  name: string;
}

export interface Secao {
  id: string;
  name: string;
  setorId: string;
}

export interface FuncionarioProfile {
  usuarioId: string;
  secaoId: string;
  liderId: string;
  turno: 'Manhã' | 'Tarde' | 'Noite';
}

export interface AtributoDeDesempenho {
  id: string;
  name: 'Agilidade' | 'Gentileza' | 'Adaptabilidade' | 'Comunicação' | 'Trabalho em equipe' | 'Iniciativa' | 'Responsabilidade' | 'Curiosidade';
}

export interface AtividadeObservada {
  id: string;
  descricao: string;
  peso: number; // 1-10
  atributoDeDesempenhoId: string;
}

export interface Feedback {
  id: string;
  funcionarioId: string;
  liderId: string;
  data: string; // ISO 8601 date string
  comentarioQualitativo: string;
  items: FeedbackItem[];
  ocorrencias: Ocorrencia[];
}

export interface FeedbackItem {
  id: string;
  feedbackId: string;
  atividadeObservadaId: string;
  pontuacao: number; // 1-5
}

export interface Ocorrencia {
  id: string;
  feedbackId: string;
  tipo: string;
  descricao: string;
}

export interface TipoOcorrencia {
  id: string;
  tipo: string;
}

export interface FuncionarioComDetalhes extends User {
  profile?: FuncionarioProfile;
  secao?: Secao;
  setor?: Setor;
  lider?: User;
}

export interface Lider extends User {
  team: FuncionarioComDetalhes[];
  setor?: Setor;
}
