import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getFeedbacksByLeaderId, getAtividadeById, getTeamByLeaderId, getAllAtividadesObservadas, addFeedback } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlusCircle, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { NewFeedbackForm } from '@/components/leader/new-feedback-form';

const CURRENT_LEADER_ID = 'lider1';

export function FeedbackPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedbackVersion, setFeedbackVersion] = useState(0); // To force re-render on new feedback

  const feedbacks = getFeedbacksByLeaderId(CURRENT_LEADER_ID);
  const team = getTeamByLeaderId(CURRENT_LEADER_ID);
  const atividades = getAllAtividadesObservadas();

  const handleFeedbackSubmit = (data: any) => {
    addFeedback({
      ...data,
      liderId: CURRENT_LEADER_ID,
    });
    setIsDialogOpen(false);
    setFeedbackVersion(v => v + 1); // Force re-render
  };

  return (
    <div className="space-y-6" key={feedbackVersion}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Histórico de Feedback</h1>
          <p className="text-muted-foreground">Revise todos os feedbacks que você forneceu.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Registrar Novo Feedback</DialogTitle>
              <DialogDescription>
                Selecione o funcionário, as atividades observadas e forneça seus comentários.
              </DialogDescription>
            </DialogHeader>
            <NewFeedbackForm
              team={team}
              activities={atividades}
              onSubmit={handleFeedbackSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedbacks Enviados</CardTitle>
          <CardDescription>Você enviou um total de {feedbacks.length} feedbacks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="p-4 border rounded-lg flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={feedback.funcionario?.avatarUrl} />
                <AvatarFallback>{feedback.funcionario?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{feedback.funcionario?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(feedback.data), "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="font-bold">{(feedback.items.reduce((acc, i) => acc + i.pontuacao, 0) / feedback.items.length).toFixed(1)}</span>
                    <Star className="h-4 w-4 fill-primary" />
                  </div>
                </div>
                <p className="mt-2 text-sm">{feedback.comentarioQualitativo}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold">Atividades: </span>
                  {feedback.items.map(i => getAtividadeById(i.atividadeObservadaId)?.descricao).join(', ')}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
