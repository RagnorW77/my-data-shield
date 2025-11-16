import { ArrowLeft, Globe, MapPin, Camera, Mic, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const DataTracking = () => {
  const navigate = useNavigate();

  const dataCategories = [
    {
      icon: MapPin,
      name: "Localisation",
      apps: 8,
      status: "active",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      icon: Camera,
      name: "Photos & Caméra",
      apps: 12,
      status: "active",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Mic,
      name: "Microphone",
      apps: 5,
      status: "limited",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Smartphone,
      name: "Contacts",
      apps: 6,
      status: "active",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Globe,
      name: "Navigation Web",
      apps: 15,
      status: "monitored",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const recentAccess = [
    { app: "Instagram", type: "Caméra", time: "Il y a 5 min", risk: "low" },
    { app: "Maps", type: "Localisation", time: "Il y a 12 min", risk: "medium" },
    { app: "WhatsApp", type: "Microphone", time: "Il y a 1h", risk: "low" },
    { app: "Chrome", type: "Navigation", time: "Il y a 2h", risk: "high" },
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
            <h1 className="text-lg font-bold">Suivi des Données</h1>
            <p className="text-xs text-muted-foreground">Données collectées par les apps</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Overview Card */}
        <Card className="p-5 bg-gradient-primary border-0 shadow-lg">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-white/80 text-sm mb-1">Total d'applications</p>
              <p className="text-4xl font-bold">46</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Accès aujourd'hui</p>
              <p className="text-4xl font-bold">127</p>
            </div>
          </div>
        </Card>

        {/* Data Categories */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Catégories de Données</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Tout voir
            </Button>
          </div>

          <div className="grid gap-3">
            {dataCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.apps} applications</p>
                      </div>
                    </div>
                    <Switch defaultChecked={category.status === 'active'} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Access */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Accès Récents</h2>
          
          <div className="space-y-2">
            {recentAccess.map((access, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{access.app}</h4>
                      <Badge 
                        variant={access.risk === 'high' ? 'destructive' : access.risk === 'medium' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {access.risk === 'high' ? 'Risque élevé' : access.risk === 'medium' ? 'Moyen' : 'Faible'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{access.type} • {access.time}</p>
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
