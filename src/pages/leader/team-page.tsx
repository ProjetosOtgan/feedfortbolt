import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getTeamByLeaderId } from '@/lib/api';

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead className="hidden md:table-cell">Seção</TableHead>
              <TableHead className="hidden md:table-cell">Turno</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map(member => (
              <TableRow key={member.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{member.setor?.name}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{member.secao?.name}</TableCell>
                <TableCell className="hidden md:table-cell">{member.profile?.turno}</TableCell>
                <TableCell>
                  <Link to={`/leader/team/${member.id}`} className="text-primary hover:underline">
                    Ver Perfil
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
