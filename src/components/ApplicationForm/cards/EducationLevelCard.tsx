import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen } from "lucide-react";

interface EducationLevelCardProps {
  data: "higher" | "secondary";
  onChange: (data: "higher" | "secondary") => void;
}

export function EducationLevelCard({ data, onChange }: EducationLevelCardProps) {
  const options = [
    {
      value: "higher" as const,
      label: "Высшее образование",
      description: "Программы бакалавриата, специалитета, магистратуры",
      icon: GraduationCap,
    },
    {
      value: "secondary" as const,
      label: "Среднее профессиональное образование",
      description: "Программы подготовки специалистов среднего звена",
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-2">
          Уровень образования
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Выберите уровень образования, на который подаете документы
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = data === option.value;

          return (
            <Card
              key={option.value}
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

      {data && (
        <div className="mt-6 p-4 bg-university-accent-light rounded-lg">
          <p className="text-sm text-university-primary">
            <strong>Выбран уровень образования:</strong>{" "}
            {options.find((opt) => opt.value === data)?.label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Это определит доступные специальности и формы обучения
          </p>
        </div>
      )}
    </div>
  );
}