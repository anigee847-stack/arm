import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Users as UsersIcon, Plus, Edit, Trash2, Shield } from "lucide-react";

export default function Users() {
  const { user: currentUser } = useAuth();
  const users = [
    {
      id: 1,
      name: "Иван Петров",
      role: "staff",
      email: "staff@institute.edu",
      status: "Активен",
      lastLogin: "Сегодня, 14:30"
    },
    {
      id: 2,
      name: "Анна Сидорова", 
      role: "admin",
      email: "admin@institute.edu",
      status: "Активен",
      lastLogin: "Вчера, 18:45"
    }
  ];

  return (
    <Layout currentPage="users">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Управление пользователями</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Добавить пользователя
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Список пользователей
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-university-accent rounded-full flex items-center justify-center">
                      <span className="text-university-accent-foreground font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role === "admin" ? "Администратор" : "Сотрудник приёмной комиссии"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Последний вход: {user.lastLogin}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.status === "Активен" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}