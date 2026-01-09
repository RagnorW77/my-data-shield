import { ArrowLeft, Clock, AlertTriangle, CheckCircle, Info, XCircle, Wifi, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import AppFooter from "@/components/AppFooter";

const AuditHistory = () => {
  const navigate = useNavigate();

  const auditEvents = [
    {
      type: "warning",
      icon: Wifi,
      title: "Wi-Fi non sécurisé détecté",
      app: "Réseau Public",
      description: "Connexion à un réseau Wi-Fi non chiffré détectée",
      time: "Il y a 5 minutes",
      details: "SSID: CoffeeShop_Free | Risque: Élevé"
    },
    {
      type: "error",
      icon: XCircle,
      title: "Fuite DNS détectée",
      app: "VPN",
      description: "Vos requêtes DNS ne passent pas par le VPN",
      time: "Il y a 25 minutes",
      details: "Serveur DNS exposé: 8.8.8.8"
    },
    {
      type: "success",
      icon: Shield,
      title: "VPN connecté avec succès",
      app: "DataGuard VPN",
      description: "Connexion sécurisée établie à France - Paris",
      time: "Il y a 1 heure",
      details: "Protocole: WireGuard | Chiffrement: AES-256"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Kill Switch activé",
      app: "DataGuard VPN",
      description: "Connexion internet coupée suite à la perte du VPN",
      time: "Il y a 3 heures",
      details: "VPN reconnecté automatiquement"
    },
    {
      type: "info",
      icon: Info,
      title: "Chiffrement local activé",
      app: "DataGuard",
      description: "24 fichiers ont été chiffrés avec AES-256",
      time: "Il y a 5 heures",
      details: "Espace total: 2.4 GB"
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Rapport hebdomadaire généré",
      app: "DataGuard",
      description: "Aucune menace détectée cette semaine",
      time: "Il y a 1 jour",
      details: "Temps VPN total: 42h 15m"
    },
  ];

  const securityReports = [
    {
      title: "Rapport Hebdomadaire",
      period: "11-18 Nov 2025",
      status: "Sécurisé",
      details: "42h de connexion VPN • 18.7 GB de données protégées"
    },
    {
      title: "Rapport Mensuel",
      period: "Oct 2025",
      status: "Sécurisé",
      details: "156h de connexion VPN • 72.3 GB de données protégées"
    },
    {
      title: "Analyse de Sécurité",
      period: "Trimestre Q4",
      status: "Excellent",
      details: "Aucune fuite de données • 8 menaces bloquées"
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case "warning":
        return { text: "text-warning", bg: "bg-warning/10", badge: "bg-warning/20 text-warning" };
      case "error":
        return { text: "text-destructive", bg: "bg-destructive/10", badge: "bg-destructive/20 text-destructive" };
      case "success":
        return { text: "text-accent", bg: "bg-accent/10", badge: "bg-accent/20 text-accent" };
      default:
        return { text: "text-primary", bg: "bg-primary/10", badge: "bg-primary/20 text-primary" };
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Logo size="sm" clickable={true} />
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Alertes de Sécurité</h1>
            <p className="text-xs text-muted-foreground">Événements et rapports</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Alertes</TabsTrigger>
            <TabsTrigger value="requests">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-3">
            {auditEvents.map((event, index) => {
              const Icon = event.icon;
              const colors = getEventColor(event.type);
              
              return (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm leading-tight">{event.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colors.badge}`}>
                          {event.type === 'warning' ? 'Attention' : 
                           event.type === 'error' ? 'Erreur' : 
                           event.type === 'success' ? 'Succès' : 'Info'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{event.app}</p>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="text-muted-foreground">{event.details}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="requests" className="space-y-3">
            <div className="space-y-2">
              {securityReports.map((report, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.period}</p>
                    </div>
                    <Badge variant={
                      report.status === "Excellent" ? "default" :
                      report.status === "Sécurisé" ? "secondary" : "outline"
                    }>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    {report.details}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-accent/5 border-accent/20">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Rapports de Sécurité</h4>
                  <p className="text-sm text-muted-foreground">
                    Consultez vos rapports hebdomadaires et mensuels pour suivre votre utilisation VPN et votre niveau de protection.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AppFooter />
    </div>
  );
};

export default AuditHistory;
