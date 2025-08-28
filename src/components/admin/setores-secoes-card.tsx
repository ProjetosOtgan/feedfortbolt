import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Setor } from "@/lib/types";

interface SetoresSecoesCardProps {
  setores: (Setor & { secoes: { id: string; name: string }[] })[];
}

export function SetoresSecoesCard({ setores }: SetoresSecoesCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Setores e Seções</CardTitle>
            <CardDescription>Visualize e adicione novos setores e seções.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Adicionar Setor
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Setor</DialogTitle>
                  <DialogDescription>
                    Preencha o nome do novo setor.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input id="name" defaultValue="Novo Setor" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
             <Button size="sm" variant="outline" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar Seção
                </span>
              </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {setores.map(setor => (
          <div key={setor.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">{setor.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {setor.secoes.map(secao => (
                <Badge key={secao.id} variant="secondary">{secao.name}</Badge>
              ))}
              {setor.secoes.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma seção cadastrada.</p>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
