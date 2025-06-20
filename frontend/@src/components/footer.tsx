export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">Vibe Connect</span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering small businesses with enterprise-level loyalty
              programs.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Vibe Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
