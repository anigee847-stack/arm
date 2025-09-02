import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalDataCardProps {
  data: any;
  onChange: (data: any) => void;
}

export function PersonalDataCard({ data, onChange }: PersonalDataCardProps) {
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
          Персональные данные абитуриента
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="lastName">Фамилия *</Label>
            <Input
              id="lastName"
              value={data.lastName || ""}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
          
          <div>
            <Label htmlFor="firstName">Имя *</Label>
            <Input
              id="firstName"
              value={data.firstName || ""}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Введите имя"
            />
          </div>
          
          <div>
            <Label htmlFor="middleName">Отчество</Label>
            <Input
              id="middleName"
              value={data.middleName || ""}
              onChange={(e) => updateField("middleName", e.target.value)}
              placeholder="Введите отчество"
            />
          </div>
          
          <div>
            <Label htmlFor="birthDate">Дата рождения *</Label>
            <Input
              id="birthDate"
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
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Мужской</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Женский</Label>
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
            <Label htmlFor="citizenship">Гражданство *</Label>
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
            <Label htmlFor="docSeries">Серия паспорта *</Label>
            <Input
              id="docSeries"
              value={data.document?.series || ""}
              onChange={(e) => updateNestedField("document", "series", e.target.value)}
              placeholder="0000"
              maxLength={4}
            />
          </div>
          
          <div>
            <Label htmlFor="docNumber">Номер паспорта *</Label>
            <Input
              id="docNumber"
              value={data.document?.number || ""}
              onChange={(e) => updateNestedField("document", "number", e.target.value)}
              placeholder="000000"
              maxLength={6}
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="docIssuer">Кем выдан *</Label>
            <Input
              id="docIssuer"
              value={data.document?.issuer || ""}
              onChange={(e) => updateNestedField("document", "issuer", e.target.value)}
              placeholder="Наименование органа, выдавшего документ"
            />
          </div>
          
          <div>
            <Label htmlFor="docIssueDate">Дата выдачи *</Label>
            <Input
              id="docIssueDate"
              type="date"
              value={data.document?.issueDate || ""}
              onChange={(e) => updateNestedField("document", "issueDate", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="docCode">Код подразделения *</Label>
            <Input
              id="docCode"
              value={data.document?.code || ""}
              onChange={(e) => updateNestedField("document", "code", e.target.value)}
              placeholder="000-000"
              maxLength={7}
            />
          </div>
          
          <div>
            <Label htmlFor="snils">СНИЛС *</Label>
            <Input
              id="snils"
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
            <Label htmlFor="registrationAddress">Адрес по прописке *</Label>
            <Input
              id="registrationAddress"
              value={data.addresses?.registration || ""}
              onChange={(e) => updateNestedField("addresses", "registration", e.target.value)}
              placeholder="Полный адрес регистрации"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAddress"
              checked={data.addresses?.sameAsRegistration || false}
              onCheckedChange={(checked) => {
                updateNestedField("addresses", "sameAsRegistration", checked);
                if (checked) {
                  updateNestedField("addresses", "residential", data.addresses?.registration || "");
                }
              }}
            />
            <Label htmlFor="sameAddress">Совпадает с пропиской</Label>
          </div>
          
          <div>
            <Label htmlFor="residentialAddress">Фактический адрес *</Label>
            <Input
              id="residentialAddress"
              value={data.addresses?.residential || ""}
              onChange={(e) => updateNestedField("addresses", "residential", e.target.value)}
              placeholder="Фактический адрес проживания"
              disabled={data.addresses?.sameAsRegistration}
            />
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div>
        <h4 className="font-semibold text-university-primary mb-4">
          Контактные данные
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+7 (000) 000-00-00"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Электронная почта *</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="example@email.com"
            />
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div>
        <h4 className="font-semibold text-university-primary mb-4">
          Наличие льгот
        </h4>
        
        <RadioGroup 
          value={data.benefits || ""} 
          onValueChange={(value) => updateField("benefits", value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="benefits-none" />
            <Label htmlFor="benefits-none">Нет</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="orphan" id="benefits-orphan" />
            <Label htmlFor="benefits-orphan">Сирота</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled" id="benefits-disabled" />
            <Label htmlFor="benefits-disabled">Инвалид</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="veteran" id="benefits-veteran" />
            <Label htmlFor="benefits-veteran">Ветеран боевых действий</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}