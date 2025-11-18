import { Shield, Lock, Eye, Bell, Activity, ChevronRight, Power, Globe, Wifi, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isVpnConnected, setIsVpnConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState("France - Paris");
  const [sessionDuration, setSessionDuration] = useState(0);
  const [bandwidth, setBandwidth] = useState({ upload: 0, download: 0 });
  const protectionScore = isVpnConnected ? 95 : 65;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVpnConnected) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
        setBandwidth({
          upload: Math.floor(Math.random() * 500) + 100,
          download: Math.floor(Math.random() * 2000) + 500
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVpnConnected]);
  
  const handleVpnToggle = () => {
    if (isVpnConnected) {
      setIsVpnConnected(false);
      setSessionDuration(0);
      toast.success("VPN déconnecté", {
        description: "Votre connexion n'est plus protégée"
      });
    } else {
      setIsVpnConnected(true);
      toast.success("VPN connecté", {
        description: `Connecté à ${selectedServer}`
      });
    }
  };
  
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const formatBandwidth = (kb: number) => {
    if (kb < 1024) return `${kb} KB/s`;
    return `${(kb / 1024).toFixed(1)} MB/s`;
  };

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
        {/* VPN Connection Card */}
        <Card className={`p-6 shadow-lg border-0 ${isVpnConnected ? 'bg-gradient-secure' : 'bg-gradient-alert'}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className={`mb-2 ${isVpnConnected ? 'bg-white/20 text-white' : 'bg-white/30 text-white'}`}>
                {isVpnConnected ? 'Connecté' : 'Déconnecté'}
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-1">
                {isVpnConnected ? 'VPN Actif' : 'VPN Inactif'}
              </h2>
              <p className="text-white/80 text-sm">
                {isVpnConnected ? selectedServer : 'Cliquez pour vous connecter'}
              </p>
            </div>
            <Button 
              size="lg"
              onClick={handleVpnToggle}
              className={`w-16 h-16 rounded-full ${isVpnConnected ? 'bg-white/20 hover:bg-white/30' : 'bg-white/30 hover:bg-white/40'} backdrop-blur-sm border-2 border-white/30`}
            >
              <Power className={`w-8 h-8 ${isVpnConnected ? 'text-white' : 'text-white/70'}`} />
            </Button>
          </div>
          
          {isVpnConnected && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90 font-medium">Adresse IP</span>
                <span className="text-sm font-bold text-white">195.78.92.143</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/90 font-medium">Durée de session</span>
                <span className="text-sm font-bold text-white">{formatDuration(sessionDuration)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/70 mb-1">↑ Upload</p>
                  <p className="text-lg font-bold text-white">{formatBandwidth(bandwidth.upload)}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/70 mb-1">↓ Download</p>
                  <p className="text-lg font-bold text-white">{formatBandwidth(bandwidth.download)}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/90 font-medium">Niveau de Protection</span>
              <span className="text-2xl font-bold text-white">{protectionScore}%</span>
            </div>
            <Progress value={protectionScore} className="h-2 bg-white/20" />
          </div>
        </Card>

        {/* Server Selection */}
        {!isVpnConnected && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Sélectionner un serveur</h3>
            <div className="space-y-2">
              {['France - Paris', 'Allemagne - Berlin', 'Pays-Bas - Amsterdam', 'Suisse - Zurich'].map((server) => (
                <button
                  key={server}
                  onClick={() => setSelectedServer(server)}
                  className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                    selectedServer === server 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-medium">{server}</span>
                  </div>
                  {selectedServer === server && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Fichiers chiffrés</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
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
                <h4 className="font-semibold">Statistiques VPN</h4>
                <p className="text-sm text-muted-foreground">Consommation de données</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>

          <Card 
            className="p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/privacy-controls')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold">Chiffrement Local</h4>
                <p className="text-sm text-muted-foreground">Protéger vos fichiers</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>

          <Card 
            className="p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/audit-history')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h4 className="font-semibold">Alertes de Sécurité</h4>
                <p className="text-sm text-muted-foreground">Wi-Fi, fuites DNS</p>
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
