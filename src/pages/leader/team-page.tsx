import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getTeamByLeaderId } from '@/lib/api';
import { ChevronRight } from 'lucide-react';

const CURRENT_LEADER_ID = 'lider1';

export function TeamPage() {
  const team = getTeamByLeaderId(CURRENT_LEADER_ID);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minha Equipe</CardTitle>
        <CardDescription>Visualize e gerencie os membros da sua equipe.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="space-y-4">
            {team.map(member => (
              <Link
                to={`/leader/team/${member.id}`}
                key={member.id}
                className="block p-4 border rounded-lg hover:bg-muted active:bg-muted"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5">
                    <p className="font-medium text-primary">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.setor?.name} / {member.secao?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.profile?.turno}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Avatar</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Seção</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.setor?.name}</Badge>
                  </TableCell>
                  <TableCell>{member.secao?.name}</TableCell>
                  <TableCell>{member.profile?.turno}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/leader/team/${member.id}`} className="text-primary hover:underline">
                      Ver Perfil
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
