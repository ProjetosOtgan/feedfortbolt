import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, AtividadeObservada } from '@/lib/types';
import { Star, PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface NewFeedbackFormProps {
  team: User[];
  activities: AtividadeObservada[];
  onSubmit: (data: any) => void;
}

const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-5 w-5 cursor-pointer",
            star <= rating ? "text-primary fill-primary" : "text-muted-foreground"
          )}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

export function NewFeedbackForm({ team, activities, onSubmit }: NewFeedbackFormProps) {
  const [employeeId, setEmployeeId] = useState<string | undefined>(undefined);
  const [comment, setComment] = useState('');
  const [feedbackItems, setFeedbackItems] = useState<{ activityId: string; score: number }[]>([
    { activityId: '', score: 0 },
  ]);

  const handleAddItem = () => {
    setFeedbackItems([...feedbackItems, { activityId: '', score: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = feedbackItems.filter((_, i) => i !== index);
    setFeedbackItems(newItems);
  };

  const handleItemChange = (index: number, field: 'activityId' | 'score', value: string | number) => {
    const newItems = [...feedbackItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setFeedbackItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || feedbackItems.some(item => !item.activityId || item.score === 0)) {
      // Basic validation
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onSubmit({
      funcionarioId: employeeId,
      comentarioQualitativo: comment,
      items: feedbackItems.map(item => ({
        atividadeObservadaId: item.activityId,
        pontuacao: item.score,
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="employee">Funcionário</Label>
        <Select value={employeeId} onValueChange={setEmployeeId}>
          <SelectTrigger id="employee">
            <SelectValue placeholder="Selecione um membro da equipe" />
          </SelectTrigger>
          <SelectContent>
            {team.map(member => (
              <SelectItem key={member.id} value={member.id}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Atividades Observadas</Label>
        {feedbackItems.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4 relative">
             {feedbackItems.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => handleRemoveItem(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <div className="space-y-2">
              <Label htmlFor={`activity-${index}`}>Atividade</Label>
              <Select
                value={item.activityId}
                onValueChange={(value) => handleItemChange(index, 'activityId', value)}
              >
                <SelectTrigger id={`activity-${index}`}>
                  <SelectValue placeholder="Selecione uma atividade" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map(activity => (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pontuação</Label>
              <StarRating
                rating={item.score}
                setRating={(value) => handleItemChange(index, 'score', value)}
              />
            </div>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Atividade
        </Button>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="comment">Comentário Qualitativo</Label>
        <Textarea
          id="comment"
          placeholder="Descreva os pontos fortes e áreas de melhoria..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Salvar Feedback</Button>
      </div>
    </form>
  );
}
