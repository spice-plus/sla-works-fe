export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Next.js Starter. すべての権利を保有します。
        </p>
      </div>
    </footer>
  );
}
