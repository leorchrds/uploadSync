import { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-navy-900 text-gray-100">
        <header className="bg-navy-800 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
                <Link href="/" className="flex items-center text-white">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <span className="ml-3 text-3xl font-bold text-gray-300">uploadSync</span>
                </Link>
              </div>
              <div className="hidden sm:block">
                <div className="flex space-x-4">
                  <NavLink href="/auth/login">Login</NavLink>
                  <NavLink href="/groups/create-group">Criar Grupo</NavLink>
                  <NavLink href="/groups/group-info">Informações dos grupos</NavLink>
                </div>
              </div>
              <div className="sm:hidden">
                <button className="text-gray-300 hover:bg-navy-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-navy-800 rounded-lg shadow-xl p-6 sm:p-8">
            {children}
          </div>
        </main>

        <footer className="bg-navy-800 mt-auto">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
            <p>Desafio de Upload de Planilhas © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-300 hover:bg-navy-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
    >
      {children}
    </Link>
  );
}