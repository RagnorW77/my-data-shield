import Logo from "./Logo";

const AppFooter = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3">
          <Logo size="lg" clickable={true} />
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Shield - Protection des données personnelles
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
