import { ArrowLeft, Shield, Lock, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const PrivacyControls = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    dataEncryption: true,
    trackingPrevention: true,
    locationPrivacy: false,
    cameraProtection: true,
    microphoneProtection: true,
    contactsProtection: false,
    autoDeleteHistory: true,
    vpnProtection: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success("Paramètre mis à jour", {
      description: "Vos préférences de confidentialité ont été enregistrées."
    });
  };

  const privacySettings = [
    {
      id: 'dataEncryption',
      icon: Lock,
      title: "Chiffrement des Données",
      description: "Protège vos données avec un chiffrement de bout en bout",
      recommended: true,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 'trackingPrevention',
      icon: Shield,
      title: "Anti-Tracking",
      description: "Bloque les trackers publicitaires et analytiques",
      recommended: true,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 'locationPrivacy',
      icon: Eye,
      title: "Confidentialité de Localisation",
      description: "Masque votre position GPS réelle",
      recommended: false,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      id: 'cameraProtection',
      icon: Shield,
      title: "Protection Caméra",
      description: "Alerte lors d'accès non autorisés à la caméra",
      recommended: true,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 'microphoneProtection',
      icon: Shield,
      title: "Protection Microphone",
      description: "Détecte l'utilisation suspecte du microphone",
      recommended: true,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 'contactsProtection',
      icon: Lock,
      title: "Protection des Contacts",
      description: "Limite l'accès à votre carnet d'adresses",
      recommended: false,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 'autoDeleteHistory',
      icon: AlertTriangle,
      title: "Suppression Auto",
      description: "Efface automatiquement votre historique après 30 jours",
      recommended: true,
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      id: 'vpnProtection',
      icon: Shield,
      title: "Protection VPN",
      description: "Chiffre votre connexion internet",
      recommended: false,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
  ];

  const enabledCount = Object.values(settings).filter(Boolean).length;
  const totalCount = Object.keys(settings).length;
  const protectionPercentage = Math.round((enabledCount / totalCount) * 100);

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
            <h1 className="text-lg font-bold">Contrôles de Confidentialité</h1>
            <p className="text-xs text-muted-foreground">Gérez vos permissions</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Status Card */}
        <Card className="p-5 bg-gradient-secure border-0 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/90 text-sm mb-1">Niveau de Protection</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-white">{protectionPercentage}%</p>
                <p className="text-white/80 text-sm mb-1">{enabledCount}/{totalCount} actifs</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Paramètres de Sécurité</h2>
          
          <div className="space-y-2">
            {privacySettings.map((setting) => {
              const Icon = setting.icon;
              const isEnabled = settings[setting.id as keyof typeof settings];
              
              return (
                <Card key={setting.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl ${setting.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${setting.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{setting.title}</h3>
                          {setting.recommended && (
                            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                              Recommandé
                            </span>
                          )}
                        </div>
                        <Switch 
                          checked={isEnabled}
                          onCheckedChange={() => handleToggle(setting.id as keyof typeof settings)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Security Tips */}
        <Card className="p-5 bg-primary/5 border-primary/20">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2">Conseil de Sécurité</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Nous recommandons d'activer au moins 6 paramètres de sécurité pour une protection optimale de vos données personnelles.
              </p>
              <Button size="sm" className="bg-primary text-primary-foreground">
                Activer les recommandations
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyControls;
