import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl sm:text-2xl">
            <Settings className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="">Painel Retail</span>
          </Link>
        </div>
        <Card>
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Entre com seu email para acessar o painel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <Link to="/signup" className="underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
