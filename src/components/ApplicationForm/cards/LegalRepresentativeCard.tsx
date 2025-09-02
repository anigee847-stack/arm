import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LegalRepresentativeCardProps {
  data: any;
  onChange: (data: any) => void;
}

export function LegalRepresentativeCard({ data, onChange }: LegalRepresentativeCardProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    onChange({
      ...data,
      [parent]: { ...data[parent], [field]: value }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-4">
          Данные законного представителя
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Заполняется для абитуриентов младше 18 лет
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="repLastName">Фамилия *</Label>
            <Input
              id="repLastName"
              value={data.lastName || ""}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
          
          <div>
            <Label htmlFor="repFirstName">Имя *</Label>
            <Input
              id="repFirstName"
              value={data.firstName || ""}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Введите имя"
            />
          </div>
          
          <div>
            <Label htmlFor="repMiddleName">Отчество</Label>
            <Input
              id="repMiddleName"
              value={data.middleName || ""}
              onChange={(e) => updateField("middleName", e.target.value)}
              placeholder="Введите отчество"
            />
          </div>
          
          <div>
            <Label htmlFor="repBirthDate">Дата рождения *</Label>
            <Input
              id="repBirthDate"
              type="date"
              value={data.birthDate || ""}
              onChange={(e) => updateField("birthDate", e.target.value)}
            />
          </div>
          
          <div>
            <Label>Пол *</Label>
            <RadioGroup 
              value={data.gender || ""} 
              onValueChange={(value) => updateField("gender", value)}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="rep-male" />
                <Label htmlFor="rep-male">Мужской</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="rep-female" />
                <Label htmlFor="rep-female">Женский</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Document section */}
      <div>
        <h4 className="font-semibold text-university-primary mb-4">
          Документ, удостоверяющий личность
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="repCitizenship">Гражданство *</Label>
            <Select onValueChange={(value) => updateNestedField("document", "citizenship", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите гражданство" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rf">Российская Федерация</SelectItem>
                <SelectItem value="other">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="repDocSeries">Серия паспорта *</Label>
            <Input
              id="repDocSeries"
              value={data.document?.series || ""}
              onChange={(e) => updateNestedField("document", "series", e.target.value)}
              placeholder="0000"
              maxLength={4}
            />
          </div>
          
          <div>
            <Label htmlFor="repDocNumber">Номер паспорта *</Label>
            <Input
              id="repDocNumber"
              value={data.document?.number || ""}
              onChange={(e) => updateNestedField("document", "number", e.target.value)}
              placeholder="000000"
              maxLength={6}
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="repDocIssuer">Кем выдан *</Label>
            <Input
              id="repDocIssuer"
              value={data.document?.issuer || ""}
              onChange={(e) => updateNestedField("document", "issuer", e.target.value)}
              placeholder="Наименование органа, выдавшего документ"
            />
          </div>
          
          <div>
            <Label htmlFor="repDocIssueDate">Дата выдачи *</Label>
            <Input
              id="repDocIssueDate"
              type="date"
              value={data.document?.issueDate || ""}
              onChange={(e) => updateNestedField("document", "issueDate", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="repDocCode">Код подразделения *</Label>
            <Input
              id="repDocCode"
              value={data.document?.code || ""}
              onChange={(e) => updateNestedField("document", "code", e.target.value)}
              placeholder="000-000"
              maxLength={7}
            />
          </div>
          
          <div>
            <Label htmlFor="repSnils">СНИЛС *</Label>
            <Input
              id="repSnils"
              value={data.snils || ""}
              onChange={(e) => updateField("snils", e.target.value)}
              placeholder="000-000-000 00"
              maxLength={14}
            />
          </div>
        </div>
      </div>

      {/* Address section */}
      <div>
        <h4 className="font-semibold text-university-primary mb-4">
          Адреса проживания
        </h4>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="repRegistrationAddress">Адрес по прописке *</Label>
            <Input
              id="repRegistrationAddress"
              value={data.addresses?.registration || ""}
              onChange={(e) => updateNestedField("addresses", "registration", e.target.value)}
              placeholder="Полный адрес регистрации"
            />
          </div>
          
          <div>
            <Label htmlFor="repResidentialAddress">Фактический адрес *</Label>
            <Input
              id="repResidentialAddress"
              value={data.addresses?.residential || ""}
              onChange={(e) => updateNestedField("addresses", "residential", e.target.value)}
              placeholder="Фактический адрес проживания"
            />
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div>
        <h4 className="font-semibold text-university-primary mb-4">
          Контактные данные
        </h4>
        
        <div>
          <Label htmlFor="repPhone">Телефон плательщика *</Label>
          <Input
            id="repPhone"
            value={data.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+7 (000) 000-00-00"
          />
        </div>
      </div>
    </div>
  );
}