import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Filter } from "lucide-react";

export default function Search() {
  return (
    <Layout currentPage="search">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Поиск заявлений</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
              Фильтры поиска
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">ФИО абитуриента</label>
                <Input placeholder="Введите ФИО..." />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Специальность</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите специальность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="law">Юриспруденция</SelectItem>
                    <SelectItem value="economics">Экономика</SelectItem>
                    <SelectItem value="it">Прикладная информатика</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Форма обучения</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите форму" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Очная</SelectItem>
                    <SelectItem value="part-time">Очно-заочная</SelectItem>
                    <SelectItem value="remote">Заочная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                Найти
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Сбросить фильтры
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center py-12 text-muted-foreground">
              <SearchIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Используйте фильтры выше для поиска заявлений</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}