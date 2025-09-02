import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface PreviousEducationCardProps {
  data: any;
  onChange: (data: any) => void;
  educationLevel: "higher" | "secondary";
}

export function PreviousEducationCard({ data, onChange, educationLevel }: PreviousEducationCardProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    onChange({
      ...data,
      [parent]: { ...data[parent], [field]: value }
    });
  };

  const subjects = [
    "Русский язык",
    "Математика",
    "Прикладная математика",
    "Математика в экономике и управлении",
    "Обществознание",
    "Обществознание в экономике и управлении",
    "Право и обществознание",
    "История",
    "История государства и права",
    "Информатика и ИКТ",
    "Информатика в технических науках",
    "Иностранный язык",
    "География",
    "Физика",
    "Дополнительное испытание профессиональной направленности по таможенному делу",
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-4">
          Предыдущее образование и оценки
        </h3>
        
        {/* General education data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="graduationYear">Год окончания *</Label>
            <Input
              id="graduationYear"
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              value={data.graduationYear || ""}
              onChange={(e) => updateField("graduationYear", e.target.value)}
              placeholder="2024"
            />
          </div>
          
          <div>
            <Label htmlFor="educationType">Тип образования *</Label>
            <Select onValueChange={(value) => updateField("educationType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип образования" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic-general">Основное общее</SelectItem>
                <SelectItem value="secondary-general">Среднее общее</SelectItem>
                <SelectItem value="secondary-professional">Среднее профессиональное</SelectItem>
                <SelectItem value="higher">Высшее</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="institutionType">Тип учреждения *</Label>
            <Select onValueChange={(value) => updateField("institutionType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип учреждения" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="school">Школа</SelectItem>
                <SelectItem value="gymnasium">Гимназия</SelectItem>
                <SelectItem value="lyceum">Лицей</SelectItem>
                <SelectItem value="college">Колледж</SelectItem>
                <SelectItem value="technical-school">Техникум</SelectItem>
                <SelectItem value="vocational-school">Училище</SelectItem>
                <SelectItem value="university">ВУЗ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="institutionName">Наименование учреждения *</Label>
            <Input
              id="institutionName"
              value={data.institutionName || ""}
              onChange={(e) => updateField("institutionName", e.target.value)}
              placeholder="Полное наименование учебного заведения"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="city">Город *</Label>
            <Input
              id="city"
              value={data.city || ""}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Город расположения учебного заведения"
            />
          </div>
        </div>
      </div>

      {/* Document about education */}
      <div>
        <h4 className="font-semibold text-university-primary mb-4">
          Документ об образовании
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="documentSeries">Серия документа</Label>
            <Input
              id="documentSeries"
              value={data.document?.series || ""}
              onChange={(e) => updateNestedField("document", "series", e.target.value)}
              placeholder="Серия"
            />
          </div>
          
          <div>
            <Label htmlFor="documentNumber">Номер документа *</Label>
            <Input
              id="documentNumber"
              value={data.document?.number || ""}
              onChange={(e) => updateNestedField("document", "number", e.target.value)}
              placeholder="Номер"
            />
          </div>
          
          <div>
            <Label>Тип документа *</Label>
            <RadioGroup 
              value={data.document?.type || ""} 
              onValueChange={(value) => updateNestedField("document", "type", value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="original" id="doc-original" />
                <Label htmlFor="doc-original">Оригинал</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="copy" id="doc-copy" />
                <Label htmlFor="doc-copy">Копия</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Grades for secondary education */}
      {educationLevel === "secondary" && (
        <div>
          <h4 className="font-semibold text-university-primary mb-4">
            Оценки (для СПО)
          </h4>
          
          <div>
            <Label htmlFor="averageGrade">Средний балл аттестата *</Label>
            <Input
              id="averageGrade"
              type="number"
              min="1"
              max="5"
              step="0.01"
              value={data.averageGrade || ""}
              onChange={(e) => updateField("averageGrade", e.target.value)}
              placeholder="4.50"
            />
          </div>
        </div>
      )}

      {/* EGE/VI for higher education */}
      {educationLevel === "higher" && (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-university-primary mb-4">
              ЕГЭ / Вступительные испытания
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasEGE"
                  checked={data.hasEGE || false}
                  onCheckedChange={(checked) => updateField("hasEGE", checked)}
                />
                <Label htmlFor="hasEGE">Сдавал ЕГЭ</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasVI"
                  checked={data.hasVI || false}
                  onCheckedChange={(checked) => updateField("hasVI", checked)}
                />
                <Label htmlFor="hasVI">Есть основание для вступительных испытаний</Label>
              </div>
            </div>
          </div>

          {data.hasEGE && (
            <div>
              <h5 className="font-medium text-university-primary mb-4">
                Результаты ЕГЭ
              </h5>
              
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject} className="grid grid-cols-3 gap-4 items-center">
                    <div className="col-span-2">
                      <Label>{subject}</Label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={data.egeResults?.[subject] || ""}
                        onChange={(e) => updateNestedField("egeResults", subject, e.target.value)}
                        placeholder="Балл"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.hasVI && (
            <div>
              <h5 className="font-medium text-university-primary mb-4">
                Выбранные предметы для вступительных испытаний
              </h5>
              
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`vi-${subject}`}
                      checked={data.viSubjects?.[subject] || false}
                      onCheckedChange={(checked) => updateNestedField("viSubjects", subject, checked)}
                    />
                    <Label htmlFor={`vi-${subject}`}>{subject}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h5 className="font-medium text-university-primary mb-4">
              Предыдущий паспорт
            </h5>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPreviousPassport"
                  checked={data.hasPreviousPassport || false}
                  onCheckedChange={(checked) => updateField("hasPreviousPassport", checked)}
                />
                <Label htmlFor="hasPreviousPassport">Сдавал ЕГЭ с предыдущим паспортом</Label>
              </div>
              
              {data.hasPreviousPassport && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prevPassportSeries">Серия предыдущего паспорта *</Label>
                    <Input
                      id="prevPassportSeries"
                      value={data.previousPassport?.series || ""}
                      onChange={(e) => updateNestedField("previousPassport", "series", e.target.value)}
                      placeholder="0000"
                      maxLength={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prevPassportNumber">Номер предыдущего паспорта *</Label>
                    <Input
                      id="prevPassportNumber"
                      value={data.previousPassport?.number || ""}
                      onChange={(e) => updateNestedField("previousPassport", "number", e.target.value)}
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}