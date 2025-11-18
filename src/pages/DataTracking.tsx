import { ArrowLeft, Globe, TrendingUp, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const DataTracking = () => {
  const navigate = useNavigate();

  const vpnStats = [
    {
      icon: TrendingUp,
      name: "Aujourd'hui",
      download: "2.4 GB",
      upload: "845 MB",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      name: "Cette semaine",
      download: "18.7 GB",
      upload: "6.2 GB",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Calendar,
      name: "Ce mois",
      download: "72.3 GB",
      upload: "24.8 GB",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const vpnSessions = [
    { server: "France - Paris", duration: "2h 34m", data: "1.2 GB", time: "Il y a 5 min" },
    { server: "Allemagne - Berlin", duration: "45m", data: "340 MB", time: "Hier" },
    { server: "Pays-Bas - Amsterdam", duration: "1h 12m", data: "680 MB", time: "Il y a 2 jours" },
    { server: "Suisse - Zurich", duration: "3h 05m", data: "2.1 GB", time: "Il y a 3 jours" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Statistiques VPN</h1>
            <p className="text-xs text-muted-foreground">Consommation de données</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Card */}
        <Card className="p-5 bg-gradient-primary border-0 shadow-lg">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-white/80 text-sm mb-1">Total téléchargé</p>
              <p className="text-4xl font-bold">72.3 GB</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Total envoyé</p>
              <p className="text-4xl font-bold">24.8 GB</p>
            </div>
          </div>
        </Card>

        {/* VPN Statistics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Statistiques par Période</h2>
          </div>

          <div className="grid gap-3">
            {vpnStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{stat.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-muted-foreground">↓ {stat.download}</p>
                        <p className="text-sm text-muted-foreground">↑ {stat.upload}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* VPN Sessions History */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Historique des Sessions VPN</h2>
          
          <div className="space-y-2">
            {vpnSessions.map((session, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold">{session.server}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Durée: {session.duration} • {session.data} • {session.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Détails
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataTracking;
