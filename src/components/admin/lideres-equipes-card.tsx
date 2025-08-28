import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/lib/types";

interface LideresEquipesCardProps {
  lideres: (User & { team: any[] })[];
}

export function LideresEquipesCard({ lideres }: LideresEquipesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Líderes e Equipes</CardTitle>
        <CardDescription>Visualize os líderes e os membros de suas equipes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lideres.map(lider => (
          <div key={lider.id} className="p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={lider.avatarUrl} />
                <AvatarFallback>{lider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{lider.name}</h3>
                <p className="text-sm text-muted-foreground">{lider.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Equipe:</h4>
              <div className="flex flex-wrap gap-4 mt-2">
                {lider.team.map(member => (
                  <div key={member.id} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatarUrl} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{member.name}</span>
                  </div>
                ))}
                {lider.team.length === 0 && <p className="text-sm text-muted-foreground">Nenhum funcionário na equipe.</p>}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
