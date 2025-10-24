function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-gray-600 text-sm">
              © 2024 TaskFlow. Tous droits réservés.
            </span>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Confidentialité
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Conditions
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer