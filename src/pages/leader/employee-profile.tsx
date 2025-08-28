import { useParams } from 'react-router-dom';
import { getEmployeeById, getFeedbacksByEmployeeId, getAtividadeById, getAtributoById } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Star } from 'lucide-react';

export function EmployeeProfile() {
  const { employeeId } = useParams<{ employeeId: string }>();
  
  if (!employeeId) {
    return <div>Funcionário não encontrado.</div>;
  }

  const employee = getEmployeeById(employeeId);
  const feedbacks = getFeedbacksByEmployeeId(employeeId);

  if (!employee) {
    return <div>Funcionário não encontrado.</div>;
  }

  const performanceData = feedbacks.map(f => ({
    date: format(new Date(f.data), 'MMM/yy'),
    score: f.items.reduce((acc, item) => acc + item.pontuacao, 0) / f.items.length,
  })).reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={employee.avatarUrl} alt={employee.name} />
          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{employee.name}</h1>
          <p className="text-muted-foreground">{employee.email}</p>
          <div className="mt-2 flex items-center space-x-2">
            <Badge>{employee.setor?.name}</Badge>
            <Badge variant="secondary">{employee.secao?.name}</Badge>
            <Badge variant="outline">{employee.profile?.turno}</Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Desempenho</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" name="Pontuação Média" stroke="currentColor" className="stroke-primary" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Feedback</CardTitle>
          <CardDescription>Todos os feedbacks recebidos por {employee.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          {feedbacks.map((feedback, index) => (
            <div key={feedback.id}>
              <div className="p-4 border rounded-lg mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{format(new Date(feedback.data), "dd 'de' MMMM, yyyy", { locale: ptBR })}</p>
                    <p className="text-sm text-muted-foreground mt-2">{feedback.comentarioQualitativo}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="font-bold">{(feedback.items.reduce((acc, i) => acc + i.pontuacao, 0) / feedback.items.length).toFixed(1)}</span>
                    <Star className="h-4 w-4 fill-primary" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Atividades Observadas:</h4>
                  <ul className="space-y-2">
                    {feedback.items.map(item => {
                      const atividade = getAtividadeById(item.atividadeObservadaId);
                      const atributo = getAtributoById(atividade?.atributoDeDesempenhoId || '');
                      return (
                        <li key={item.id} className="text-sm flex justify-between items-center p-2 bg-muted/50 rounded-md">
                          <div>
                            <span>{atividade?.descricao}</span>
                            <Badge variant="outline" className="ml-2">{atributo?.name}</Badge>
                          </div>
                          <span className="font-bold">{item.pontuacao}/5</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {feedback.ocorrencias.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Ocorrências:</h4>
                    {feedback.ocorrencias.map(occ => (
                      <div key={occ.id} className="text-sm p-2 bg-secondary/50 rounded-md">
                        <span className="font-semibold">{occ.tipo}:</span> {occ.descricao}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {index < feedbacks.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
