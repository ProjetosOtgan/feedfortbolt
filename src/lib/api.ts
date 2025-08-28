import { users, setores, secoes, funcionarioProfiles, feedbacks, atividadesObservadas, atributosDeDesempenho, tiposOcorrencia } from './mock-data';
import { User, Feedback, AtividadeObservada } from './types';

// Helper to get user by ID
const getUserById = (id: string) => users.find(u => u.id === id);

// Helper to get full profile for a user
const getFullEmployeeProfile = (user: User) => {
  if (user.role !== 'Funcionario') return { ...user };

  const profile = funcionarioProfiles.find(p => p.usuarioId === user.id);
  if (!profile) return { ...user };

  const secao = secoes.find(s => s.id === profile.secaoId);
  const setor = setores.find(s => s.id === secao?.setorId);
  const lider = users.find(u => u.id === profile.liderId);

  return {
    ...user,
    profile,
    secao,
    setor,
    lider,
  };
};

// Exported function for employee profile page
export const getEmployeeById = (employeeId: string) => {
  const user = getUserById(employeeId);
  if (!user) return null;
  return getFullEmployeeProfile(user);
};

// Exported function for employee profile page
export const getFeedbacksByEmployeeId = (employeeId: string): Feedback[] => {
  return feedbacks
    .filter(f => f.funcionarioId === employeeId)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .map(fb => {
        const detailedItems = fb.items.map(item => {
            const atividade = atividadesObservadas.find(a => a.id === item.atividadeObservadaId);
            const atributo = atributosDeDesempenho.find(attr => attr.id === atividade?.atributoDeDesempenhoId);
            return {
                ...item,
                atividade,
                atributo
            }
        });
        return {
            ...fb,
            lider: getUserById(fb.liderId),
            items: detailedItems,
        }
    });
};

// Exported function for employee profile page
export const getAtributoById = (id: string) => {
  return atributosDeDesempenho.find(a => a.id === id);
};

// API function to get team members for a specific leader
export const getTeamByLeaderId = (leaderId: string) => {
  const teamProfiles = funcionarioProfiles.filter(p => p.liderId === leaderId);
  return teamProfiles.map(p => {
    const user = getUserById(p.usuarioId);
    return getFullEmployeeProfile(user!);
  });
};

// API function to get dashboard data for a leader
export const getDashboardData = (leaderId: string) => {
  const team = getTeamByLeaderId(leaderId);
  const teamIds = team.map(m => m.id);

  const recentFeedbacks = feedbacks
    .filter(f => teamIds.includes(f.funcionarioId))
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5)
    .map(f => ({
      ...f,
      funcionario: getUserById(f.funcionarioId),
    }));

  const allScores = feedbacks
    .filter(f => teamIds.includes(f.funcionarioId))
    .flatMap(f => f.items.map(i => i.pontuacao));
  
  const averagePerformance = allScores.length > 0 
    ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) 
    : 'N/A';

  return {
    totalTeamMembers: team.length,
    averagePerformance,
    recentFeedbacks,
    team,
  };
};

// API function to get a single employee's full profile and history
export const getEmployeeDetails = (employeeId: string) => {
  const profile = getEmployeeById(employeeId);
  if (!profile) return null;

  const employeeFeedbacks = getFeedbacksByEmployeeId(employeeId);

  return {
    ...profile,
    feedbacks: employeeFeedbacks,
  };
};

// API function for the new management page
export const getManagementData = () => {
  const leaders = users.filter(u => u.role === 'Lider');
  const employees = users.filter(u => u.role === 'Funcionario');

  const leadersWithTeams = leaders.map(leader => ({
    ...leader,
    team: getTeamByLeaderId(leader.id),
  }));

  const employeesWithDetails = employees.map(emp => getFullEmployeeProfile(emp));

  const setoresWithSecoes = setores.map(setor => ({
    ...setor,
    secoes: secoes.filter(secao => secao.setorId === setor.id),
  }));

  return {
    setores: setoresWithSecoes,
    lideres: leadersWithTeams,
    funcionarios: employeesWithDetails,
    allUsers: users,
  };
};

// API function to get feedbacks for a leader
export const getFeedbacksByLeaderId = (leaderId: string) => {
  return feedbacks
    .filter(f => f.liderId === leaderId)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .map(f => ({
      ...f,
      funcionario: getUserById(f.funcionarioId),
    }));
};

// API function to get an activity by ID
export const getAtividadeById = (id: string) => atividadesObservadas.find(a => a.id === id);

// API function to get all observable activities
export const getAllAtividadesObservadas = (): AtividadeObservada[] => {
  return atividadesObservadas;
};

// API function to add a new feedback
export const addFeedback = (data: {
  funcionarioId: string;
  liderId: string;
  comentarioQualitativo: string;
  items: { atividadeObservadaId: string; pontuacao: number }[];
}) => {
  const newFeedbackId = `fb${feedbacks.length + 1 + Math.random()}`;
  const newFeedback: Feedback = {
    id: newFeedbackId,
    data: new Date().toISOString(),
    ocorrencias: [],
    ...data,
    items: data.items.map((item, index) => ({
      id: `fbi${Date.now()}${index}`,
      feedbackId: newFeedbackId,
      ...item,
    })),
  };
  feedbacks.unshift(newFeedback);
  return newFeedback;
};
