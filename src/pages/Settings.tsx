import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Save, Database, Bell, Shield, Download } from "lucide-react";

export default function Settings() {
  return (
    <Layout currentPage="settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Настройки системы</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Основные настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Название учреждения</label>
                <Input defaultValue="Московский институт экономики и права" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Адрес учреждения</label>
                <Input defaultValue="г. Москва, ул. Примерная, д. 1" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Контактный телефон</label>
                <Input defaultValue="+7 (495) 123-45-67" />
              </div>
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Уведомления
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email уведомления</p>
                  <p className="text-sm text-muted-foreground">Отправлять уведомления на email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Уведомления о новых заявлениях</p>
                  <p className="text-sm text-muted-foreground">Получать уведомления при подаче заявления</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Системные уведомления</p>
                  <p className="text-sm text-muted-foreground">Уведомления об ошибках и обновлениях</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Резервное копирование
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Автоматическое резервирование</p>
                  <p className="text-sm text-muted-foreground">Ежедневное создание резервных копий</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Последняя резервная копия</p>
                <p className="text-sm text-muted-foreground">Сегодня, 03:00</p>
              </div>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Создать резервную копию
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Безопасность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Двухфакторная аутентификация</p>
                  <p className="text-sm text-muted-foreground">Дополнительная защита аккаунтов</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Логирование действий</p>
                  <p className="text-sm text-muted-foreground">Записывать все действия пользователей</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-muted-foreground">Время сессии (минуты)</label>
                <Input type="number" defaultValue="60" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}