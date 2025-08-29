import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Setor } from '@/lib/api';

interface SetoresSecoesCardProps {
  setores: Setor[];
}

export function SetoresSecoesCard({ setores }: SetoresSecoesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Setores e Seções</CardTitle>
        <CardDescription>Visualize e gerencie os setores e suas respectivas seções.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {setores.map(setor => (
            <div key={setor.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-primary">{setor.name}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {setor.secoes.map(secao => (
                  <Badge key={secao.id} variant="secondary">{secao.name}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <Accordion type="single" collapsible className="w-full">
            {setores.map(setor => (
              <AccordionItem key={setor.id} value={setor.id}>
                <AccordionTrigger className="text-base">{setor.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2 flex flex-wrap gap-2">
                    {setor.secoes.length > 0 ? (
                      setor.secoes.map(secao => (
                        <Badge key={secao.id} variant="outline">{secao.name}</Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma seção cadastrada.</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
