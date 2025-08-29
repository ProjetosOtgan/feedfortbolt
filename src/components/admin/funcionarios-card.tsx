import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Funcionario, Lider, Secao } from '@/lib/api';
import { Badge } from '../ui/badge';

interface FuncionariosCardProps {
  funcionarios: Funcionario[];
  lideres: Lider[];
  secoes: Secao[];
}

export function FuncionariosCard({ funcionarios, lideres, secoes }: FuncionariosCardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [liderFilter, setLiderFilter] = useState('all');
  const [secaoFilter, setSecaoFilter] = useState('all');

  const filteredFuncionarios = funcionarios.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLider = liderFilter === 'all' || f.liderId === liderFilter;
    const matchesSecao = secaoFilter === 'all' || f.secaoId === secaoFilter;
    return matchesSearch && matchesLider && matchesSecao;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos os Funcionários</CardTitle>
        <CardDescription>Pesquise e filtre todos os funcionários da empresa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select value={liderFilter} onValueChange={setLiderFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por líder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Líderes</SelectItem>
              {lideres.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={secaoFilter} onValueChange={setSecaoFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por seção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Seções</SelectItem>
              {secoes.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredFuncionarios.map(member => (
            <div key={member.id} className="p-4 border rounded-lg">
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
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]">Avatar</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Seção</TableHead>
                  <TableHead>Líder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFuncionarios.length > 0 ? (
                  filteredFuncionarios.map(f => (
                    <TableRow key={f.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={f.avatarUrl} alt={f.name} />
                          <AvatarFallback>{f.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{f.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{f.setor?.name}</Badge>
                      </TableCell>
                      <TableCell>{f.secao?.name}</TableCell>
                      <TableCell>{lideres.find(l => l.id === f.liderId)?.name || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
