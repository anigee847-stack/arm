import { Card, CardContent } from "@/components/ui/card";
import { Home, Ban } from "lucide-react";

interface DormitoryCardProps {
  data: boolean;
  onChange: (data: boolean) => void;
}

export function DormitoryCard({ data, onChange }: DormitoryCardProps) {
  const options = [
    {
      value: true,
      label: "Да",
      description: "Нуждаюсь в предоставлении места в общежитии",
      icon: Home,
    },
    {
      value: false,
      label: "Нет",
      description: "Не нуждаюсь в предоставлении места в общежитии",
      icon: Ban,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-2">
          Потребность в общежитии
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Укажите, нуждаетесь ли вы в предоставлении места в общежитии
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = data === option.value;

          return (
            <Card
              key={option.value.toString()}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-university-primary bg-university-primary-light shadow-medium"
                  : "border-border hover:border-university-primary hover:shadow-soft"
              }`}
              onClick={() => onChange(option.value)}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isSelected
                        ? "bg-university-primary text-white"
                        : "bg-university-secondary text-university-primary"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                
                <h4
                  className={`font-semibold mb-2 ${
                    isSelected ? "text-university-primary" : "text-foreground"
                  }`}
                >
                  {option.label}
                </h4>
                
                <p
                  className={`text-sm ${
                    isSelected ? "text-university-primary/80" : "text-muted-foreground"
                  }`}
                >
                  {option.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {data !== undefined && (
        <div className="mt-6 p-4 bg-university-accent-light rounded-lg">
          <p className="text-sm text-university-primary">
            <strong>Выбрано:</strong>{" "}
            {data ? "Нуждаюсь в общежитии" : "Не нуждаюсь в общежитии"}
          </p>
          {data && (
            <p className="text-xs text-muted-foreground mt-1">
              При положительном решении о зачислении вам будет предоставлено место в общежитии
            </p>
          )}
        </div>
      )}
    </div>
  );
}