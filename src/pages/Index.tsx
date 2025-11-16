import { Shield, Lock, Eye, Bell, Activity, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const protectionScore = 85;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">DataGuard</h1>
              <p className="text-xs text-muted-foreground">Protection des données</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Protection Status Card */}
        <Card className="p-6 bg-gradient-primary shadow-lg border-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="bg-accent text-accent-foreground mb-2">
                Actif
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-1">Protection Active</h2>
              <p className="text-white/80 text-sm">Vos données sont sécurisées</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/90 font-medium">Score de Protection</span>
              <span className="text-2xl font-bold text-white">{protectionScore}%</span>
            </div>
            <Progress value={protectionScore} className="h-2 bg-white/20" />
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Apps protégées</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Menaces bloquées</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Fonctionnalités</h3>
          
          <Card 
            className="p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/data-tracking')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Suivi des Données</h4>
                <p className="text-sm text-muted-foreground">Voir les données collectées</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>

          <Card 
            className="p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/privacy-controls')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold">Contrôles de Confidentialité</h4>
                <p className="text-sm text-muted-foreground">Gérer vos permissions</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>

          <Card 
            className="p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/audit-history')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold">Historique d'Audit</h4>
                <p className="text-sm text-muted-foreground">Activités récentes</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>
        </div>

        {/* Security Tips */}
        <Card className="p-5 bg-warning/5 border-warning/20">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Conseil de Sécurité</h4>
              <p className="text-sm text-muted-foreground">
                Activez l'authentification à deux facteurs pour une sécurité renforcée de vos comptes.
              </p>
              <Button variant="link" className="px-0 h-auto mt-2 text-warning">
                En savoir plus →
              </Button>
            </div>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1 text-primary">
              <Shield className="w-5 h-5" />
              <span className="text-xs">Accueil</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={() => navigate('/data-tracking')}>
              <Activity className="w-5 h-5" />
              <span className="text-xs">Données</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={() => navigate('/privacy-controls')}>
              <Lock className="w-5 h-5" />
              <span className="text-xs">Confidentialité</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={() => navigate('/audit-history')}>
              <Eye className="w-5 h-5" />
              <span className="text-xs">Audit</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
