import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PayerDataCardProps {
  data: any;
  onChange: (data: any) => void;
}

export function PayerDataCard({ data, onChange }: PayerDataCardProps) {
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
          Данные плательщика (третье лицо)
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Заполните данные лица, которое будет осуществлять оплату обучения
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="payerLastName">Фамилия *</Label>
            <Input
              id="payerLastName"
              value={data.lastName || ""}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
          
          <div>
            <Label htmlFor="payerFirstName">Имя *</Label>
            <Input
              id="payerFirstName"
              value={data.firstName || ""}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Введите имя"
            />
          </div>
          
          <div>
            <Label htmlFor="payerMiddleName">Отчество</Label>
            <Input
              id="payerMiddleName"
              value={data.middleName || ""}
              onChange={(e) => updateField("middleName", e.target.value)}
              placeholder="Введите отчество"
            />
          </div>
          
          <div>
            <Label htmlFor="payerBirthDate">Дата рождения *</Label>
            <Input
              id="payerBirthDate"
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
                <RadioGroupItem value="male" id="payer-male" />
                <Label htmlFor="payer-male">Мужской</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="payer-female" />
                <Label htmlFor="payer-female">Женский</Label>
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
            <Label htmlFor="payerCitizenship">Гражданство *</Label>
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
            <Label htmlFor="payerDocSeries">Серия паспорта *</Label>
            <Input
              id="payerDocSeries"
              value={data.document?.series || ""}
              onChange={(e) => updateNestedField("document", "series", e.target.value)}
              placeholder="0000"
              maxLength={4}
            />
          </div>
          
          <div>
            <Label htmlFor="payerDocNumber">Номер паспорта *</Label>
            <Input
              id="payerDocNumber"
              value={data.document?.number || ""}
              onChange={(e) => updateNestedField("document", "number", e.target.value)}
              placeholder="000000"
              maxLength={6}
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="payerDocIssuer">Кем выдан *</Label>
            <Input
              id="payerDocIssuer"
              value={data.document?.issuer || ""}
              onChange={(e) => updateNestedField("document", "issuer", e.target.value)}
              placeholder="Наименование органа, выдавшего документ"
            />
          </div>
          
          <div>
            <Label htmlFor="payerDocIssueDate">Дата выдачи *</Label>
            <Input
              id="payerDocIssueDate"
              type="date"
              value={data.document?.issueDate || ""}
              onChange={(e) => updateNestedField("document", "issueDate", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="payerDocCode">Код подразделения *</Label>
            <Input
              id="payerDocCode"
              value={data.document?.code || ""}
              onChange={(e) => updateNestedField("document", "code", e.target.value)}
              placeholder="000-000"
              maxLength={7}
            />
          </div>
          
          <div>
            <Label htmlFor="payerSnils">СНИЛС *</Label>
            <Input
              id="payerSnils"
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
            <Label htmlFor="payerRegistrationAddress">Адрес по прописке *</Label>
            <Input
              id="payerRegistrationAddress"
              value={data.addresses?.registration || ""}
              onChange={(e) => updateNestedField("addresses", "registration", e.target.value)}
              placeholder="Полный адрес регистрации"
            />
          </div>
          
          <div>
            <Label htmlFor="payerResidentialAddress">Фактический адрес *</Label>
            <Input
              id="payerResidentialAddress"
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
          <Label htmlFor="payerPhone">Телефон плательщика *</Label>
          <Input
            id="payerPhone"
            value={data.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+7 (000) 000-00-00"
          />
        </div>
      </div>
    </div>
  );
}