import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface StudyParametersCardProps {
  data: any;
  onChange: (data: any) => void;
  educationLevel: "higher" | "secondary";
}

export function StudyParametersCard({ data, onChange, educationLevel }: StudyParametersCardProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addSpecialty = () => {
    const currentSpecialties = data.specialties || [];
    if (currentSpecialties.length < 3) {
      onChange({
        ...data,
        specialties: [...currentSpecialties, ""]
      });
    }
  };

  const updateSpecialty = (index: number, value: string) => {
    const currentSpecialties = [...(data.specialties || [])];
    currentSpecialties[index] = value;
    onChange({
      ...data,
      specialties: currentSpecialties
    });
  };

  const removeSpecialty = (index: number) => {
    const currentSpecialties = [...(data.specialties || [])];
    currentSpecialties.splice(index, 1);
    onChange({
      ...data,
      specialties: currentSpecialties
    });
  };

  const higherEducationSpecialties = [
    "Юриспруденция",
    "Экономика/Экономика предприятия и предпринимательская деятельность",
    "Экономика/Внешнеэкономическая деятельность",
    "Экономика/Финансы и кредит",
    "Экономика/Экономика и организация фирмы",
    "Экономика/Бухгалтерский учет и налогообложение",
    "Управление персоналом",
    "Управление персоналом/Технологии управления персоналом",
    "Государственное и муниципальное управление",
    "Государственное и муниципальное управление/Государственная и муниципальная служба",
    "Прикладная информатика/Информационные системы и технологии в управлении",
    "Таможенное дело"
  ];

  const secondaryEducationSpecialties = [
    "Юриспруденция",
    "Документационное обеспечение управления и архивоведение",
    "Банковское дело",
    "Экономика и бухгалтерский учет (по отраслям)",
    "Торговое дело",
    "Разработка и управление программным обеспечением",
    "Техническая эксплуатация и сопровождение информационных систем"
  ];

  const specialties = educationLevel === "higher" ? higherEducationSpecialties : secondaryEducationSpecialties;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-4">
          Параметры обучения
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Study form */}
          <div>
            <Label className="text-base font-medium">Форма обучения *</Label>
            <RadioGroup 
              value={data.studyForm || ""} 
              onValueChange={(value) => updateField("studyForm", value)}
              className="mt-3 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="form-full-time" />
                <Label htmlFor="form-full-time">Очная</Label>
              </div>
              {educationLevel === "higher" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="part-time" id="form-part-time" />
                  <Label htmlFor="form-part-time">Очно-заочная</Label>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="correspondence" id="form-correspondence" />
                <Label htmlFor="form-correspondence">Заочная</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Financing type */}
          <div>
            <Label className="text-base font-medium">Тип финансирования *</Label>
            <RadioGroup 
              value={data.financing || ""} 
              onValueChange={(value) => updateField("financing", value)}
              className="mt-3 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="budget" id="financing-budget" />
                <Label htmlFor="financing-budget">Бюджетное</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="financing-paid" />
                <Label htmlFor="financing-paid">Внебюджетное</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Admission type */}
      <div>
        <Label className="text-base font-medium">Тип приема *</Label>
        <Select onValueChange={(value) => updateField("admissionType", value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Выберите тип приема" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">Основные места</SelectItem>
            <SelectItem value="separate-quota">Отдельная квота</SelectItem>
            <SelectItem value="special-quota">Особая квота</SelectItem>
            <SelectItem value="target-quota">Целевая квота</SelectItem>
            <SelectItem value="paid-places">Платные места</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Specialties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base font-medium">
            Специальности (до 3 приоритетов) *
          </Label>
          {(!data.specialties || data.specialties.length < 3) && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSpecialty}
              className="flex items-center space-x-1"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить</span>
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {(data.specialties || [""]).map((specialty: string, index: number) => (
            <Card key={index} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-university-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <Select 
                      value={specialty} 
                      onValueChange={(value) => updateSpecialty(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Выберите специальность ${index + 1}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {data.specialties && data.specialties.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpecialty(index)}
                      className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Укажите специальности в порядке предпочтения. Первая специальность - наиболее предпочтительная.
        </p>
      </div>

      {/* Summary */}
      {(data.studyForm || data.financing || data.specialties?.length) && (
        <div className="mt-6 p-4 bg-university-accent-light rounded-lg">
          <h4 className="font-medium text-university-primary mb-2">Выбранные параметры:</h4>
          <div className="space-y-1 text-sm">
            {data.studyForm && (
              <p>
                <strong>Форма обучения:</strong>{" "}
                {data.studyForm === "full-time" && "Очная"}
                {data.studyForm === "part-time" && "Очно-заочная"}
                {data.studyForm === "correspondence" && "Заочная"}
              </p>
            )}
            {data.financing && (
              <p>
                <strong>Финансирование:</strong>{" "}
                {data.financing === "budget" ? "Бюджетное" : "Внебюджетное"}
              </p>
            )}
            {data.specialties?.filter(Boolean).length > 0 && (
              <p>
                <strong>Специальности:</strong>{" "}
                {data.specialties.filter(Boolean).length} из 3
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}