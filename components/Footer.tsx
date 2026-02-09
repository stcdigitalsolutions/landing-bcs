export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-gradient-to-r from-blue-500/10 to-green-500/10 border-t border-white/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            BCS Consultoria Tecnológica
          </h2>
          <p className="text-gray-600 mb-6">
            Transformando organizações através da tecnologia e dados
          </p>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} BCS Consultoria Tecnológica. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
