import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lider } from '@/lib/types';
import { Users } from 'lucide-react';

interface LideresEquipesCardProps {
  lideres: Lider[];
}

export function LideresEquipesCard({ lideres }: LideresEquipesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Líderes e Equipes</CardTitle>
        <CardDescription>Visualize os líderes e o tamanho de suas equipes.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {(lideres || []).map(lider => (
            <div key={lider.id} className="p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={lider.avatarUrl} alt={lider.name} />
                  <AvatarFallback>{lider.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-primary">{lider.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {lider.team?.length || 0} membros
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Avatar</TableHead>
                <TableHead>Nome do Líder</TableHead>
                <TableHead>Tamanho da Equipe</TableHead>
                <TableHead>Setor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(lideres || []).map(lider => (
                <TableRow key={lider.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={lider.avatarUrl} alt={lider.name} />
                      <AvatarFallback>{lider.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{lider.name}</TableCell>
                  <TableCell>{lider.team?.length || 0} membros</TableCell>
                  <TableCell>{lider.setor?.name || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
