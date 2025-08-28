import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SetoresSecoesCard } from "@/components/admin/setores-secoes-card";
import { LideresEquipesCard } from "@/components/admin/lideres-equipes-card";
import { FuncionariosCard } from "@/components/admin/funcionarios-card";
import { getManagementData } from "@/lib/api";

export function ManagementPage() {
  const data = getManagementData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestão</h1>
        <p className="text-muted-foreground">Gerencie setores, equipes e funcionários.</p>
      </div>
      <Tabs defaultValue="setores" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setores">Setores & Seções</TabsTrigger>
          <TabsTrigger value="lideres">Líderes & Equipes</TabsTrigger>
          <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
        </TabsList>
        <TabsContent value="setores">
          <SetoresSecoesCard setores={data.setores} />
        </TabsContent>
        <TabsContent value="lideres">
          <LideresEquipesCard lideres={data.lideres} />
        </TabsContent>
        <TabsContent value="funcionarios">
          <FuncionariosCard 
            funcionarios={data.funcionarios}
            lideres={data.lideres.map(l => l)}
            secoes={data.setores.flatMap(s => s.secoes)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
