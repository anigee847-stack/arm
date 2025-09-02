import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, UserPlus } from "lucide-react";

interface PayerSelectionCardProps {
  data: "self" | "representative" | "other";
  onChange: (data: "self" | "representative" | "other") => void;
  isMinor: boolean;
}

export function PayerSelectionCard({ data, onChange, isMinor }: PayerSelectionCardProps) {
  const options = [
    {
      value: "self" as const,
      label: "Лично",
      description: "Абитуриент является плательщиком",
      icon: User,
      disabled: isMinor,
    },
    {
      value: "representative" as const,
      label: "Законный представитель",
      description: "Законный представитель является плательщиком",
      icon: Users,
      disabled: !isMinor,
    },
    {
      value: "other" as const,
      label: "Другой",
      description: "Третье лицо является плательщиком",
      icon: UserPlus,
      disabled: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-2">
          Выбор плательщика
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Выберите, кто будет осуществлять оплату обучения
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = data === option.value;
          const isDisabled = option.disabled;

          return (
            <Card
              key={option.value}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-university-primary bg-university-primary-light shadow-medium"
                  : isDisabled
                  ? "border-muted bg-muted cursor-not-allowed opacity-50"
                  : "border-border hover:border-university-primary hover:shadow-soft"
              }`}
              onClick={() => !isDisabled && onChange(option.value)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isSelected
                        ? "bg-university-primary text-white"
                        : isDisabled
                        ? "bg-muted-foreground/20 text-muted-foreground"
                        : "bg-university-secondary text-university-primary"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                
                <h4
                  className={`font-semibold mb-2 ${
                    isSelected
                      ? "text-university-primary"
                      : isDisabled
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {option.label}
                </h4>
                
                <p
                  className={`text-sm ${
                    isSelected
                      ? "text-university-primary/80"
                      : isDisabled
                      ? "text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {option.description}
                </p>

                {isDisabled && (
                  <div className="mt-3 text-xs text-muted-foreground">
                    {option.value === "self" && isMinor
                      ? "Недоступно для несовершеннолетних"
                      : option.value === "representative" && !isMinor
                      ? "Недоступно для совершеннолетних"
                      : ""}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data && (
        <div className="mt-6 p-4 bg-university-accent-light rounded-lg">
          <p className="text-sm text-university-primary">
            <strong>Выбран плательщик:</strong>{" "}
            {options.find((opt) => opt.value === data)?.label}
          </p>
          {(data === "self" || data === "representative") && (
            <p className="text-xs text-muted-foreground mt-1">
              Данные плательщика будут автоматически заполнены из предыдущих карточек
            </p>
          )}
        </div>
      )}
    </div>
  );
}