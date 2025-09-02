import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  GraduationCap, 
  FileText, 
  Users, 
  Search, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: "applications" | "search" | "users" | "settings";
}

export function Layout({ children, currentPage }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Новое заявление", href: "/", icon: FileText, id: "applications" },
    { name: "Поиск заявлений", href: "/search", icon: Search, id: "search" },
    ...(user?.role === 'admin' ? [
      { name: "Пользователи", href: "/users", icon: Users, id: "users" },
      { name: "Настройки", href: "/settings", icon: Settings, id: "settings" },
    ] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-university-primary-light via-background to-university-secondary">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-primary shadow-large transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-university-accent p-2">
                <GraduationCap className="h-6 w-6 text-university-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Приёмная комиссия</h1>
                <p className="text-sm text-white/80">Система подачи заявлений</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-university-accent text-university-accent-foreground shadow-medium"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-white/20 p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/60">
                {user?.role === 'admin' ? 'Администратор' : 'Сотрудник приёмной комиссии'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выход
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Сегодня: {new Date().toLocaleDateString('ru-RU')}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}