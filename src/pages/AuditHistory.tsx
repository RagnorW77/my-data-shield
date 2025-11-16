import { ArrowLeft, Clock, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const AuditHistory = () => {
  const navigate = useNavigate();

  const auditEvents = [
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Tentative d'accès suspect détectée",
      app: "Application inconnue",
      description: "Tentative d'accès à vos contacts bloquée",
      time: "Il y a 15 minutes",
      details: "Localisation: Paris, France"
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Paramètres de sécurité mis à jour",
      app: "DataGuard",
      description: "Chiffrement des données activé",
      time: "Il y a 2 heures",
      details: "Configuration modifiée"
    },
    {
      type: "info",
      icon: Info,
      title: "Nouvelle application analysée",
      app: "Instagram",
      description: "Permissions caméra et localisation accordées",
      time: "Il y a 5 heures",
      details: "Risque: Faible"
    },
    {
      type: "error",
      icon: XCircle,
      title: "Fuite de données détectée",
      app: "Browser",
      description: "Cookies tiers identifiés et bloqués",
      time: "Il y a 1 jour",
      details: "12 trackers bloqués"
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Scan de sécurité complété",
      app: "DataGuard",
      description: "Aucune menace détectée",
      time: "Il y a 1 jour",
      details: "46 applications analysées"
    },
  ];

  const dataRequests = [
    {
      company: "Meta (Facebook)",
      type: "Données personnelles",
      status: "En cours",
      date: "12 Nov 2025",
      deadline: "5 jours restants"
    },
    {
      company: "Google",
      type: "Historique de navigation",
      status: "Complété",
      date: "08 Nov 2025",
      deadline: "Reçu"
    },
    {
      company: "Amazon",
      type: "Données d'achat",
      status: "En attente",
      date: "10 Nov 2025",
      deadline: "7 jours restants"
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Historique d'Audit</h1>
            <p className="text-xs text-muted-foreground">Activités et événements</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="requests">Demandes</TabsTrigger>
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
            <Card className="p-5 bg-primary/5 border-primary/20 mb-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Demandes de Données RGPD</h4>
                  <p className="text-sm text-muted-foreground">
                    Suivez vos demandes d'accès aux données personnelles auprès des entreprises.
                  </p>
                </div>
              </div>
            </Card>

            {dataRequests.map((request, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{request.company}</h3>
                    <p className="text-sm text-muted-foreground">{request.type}</p>
                  </div>
                  <Badge 
                    variant={request.status === 'Complété' ? 'default' : request.status === 'En cours' ? 'secondary' : 'outline'}
                  >
                    {request.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>Demandé le {request.date}</span>
                  <span className={request.status === 'Complété' ? 'text-accent' : ''}>{request.deadline}</span>
                </div>
              </Card>
            ))}

            <Button className="w-full mt-4" variant="outline">
              Nouvelle demande RGPD
            </Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AuditHistory;
