import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface AchievementsCardProps {
  data: any;
  onChange: (data: any) => void;
}

export function AchievementsCard({ data, onChange }: AchievementsCardProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateAchievement = (achievement: string, checked: boolean) => {
    const currentAchievements = data.achievements || {};
    onChange({
      ...data,
      achievements: {
        ...currentAchievements,
        [achievement]: checked
      }
    });
  };

  const achievementsList = [
    {
      id: "honor_diploma",
      label: "Аттестат или диплом с отличием (золотая/серебряная медаль)",
      description: "Получение аттестата о среднем общем образовании с отличием или диплома о среднем профессиональном образовании с отличием"
    },
    {
      id: "military_service",
      label: "Прохождение военной службы (по призыву, контракту или мобилизации) в ВС РФ",
      description: "Служба в Вооруженных Силах Российской Федерации"
    },
    {
      id: "volunteer_svo",
      label: "Участие в добровольческих формированиях в ходе СВО",
      description: "Участие в добровольческой деятельности в рамках специальной военной операции"
    },
    {
      id: "volunteer_activity",
      label: "Волонтерская деятельность",
      description: "Систематическая добровольческая деятельность (не менее 4 лет)"
    },
    {
      id: "abilympics",
      label: "Победа или призерство в чемпионате «Абилимпикс»",
      description: "Победитель или призер международного чемпионата по профессиональному мастерству среди инвалидов и лиц с ограниченными возможностями здоровья"
    },
    {
      id: "olympiad",
      label: "Всероссийская олимпиада школьников",
      description: "Победитель или призер заключительного этапа всероссийской олимпиады школьников"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-university-primary mb-2">
          Индивидуальные достижения
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Отметьте индивидуальные достижения, которыми вы обладаете. Они могут быть учтены при поступлении.
        </p>
      </div>

      <div>
        <Label>Наличие индивидуальных достижений *</Label>
        <RadioGroup 
          value={data.hasAchievements?.toString() || ""} 
          onValueChange={(value) => updateField("hasAchievements", value === "true")}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="achievements-yes" />
            <Label htmlFor="achievements-yes">Да</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="achievements-no" />
            <Label htmlFor="achievements-no">Нет</Label>
          </div>
        </RadioGroup>
      </div>

      {data.hasAchievements && (
        <div className="space-y-4">
          <h4 className="font-semibold text-university-primary">
            Список достижений
          </h4>
          
          <div className="space-y-3">
            {achievementsList.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`transition-all duration-200 ${
                  data.achievements?.[achievement.id] 
                    ? "border-university-primary bg-university-primary-light" 
                    : "border-border hover:border-university-primary/50"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={achievement.id}
                      checked={data.achievements?.[achievement.id] || false}
                      onCheckedChange={(checked) => updateAchievement(achievement.id, !!checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={achievement.id}
                        className={`font-medium cursor-pointer ${
                          data.achievements?.[achievement.id] 
                            ? "text-university-primary" 
                            : "text-foreground"
                        }`}
                      >
                        {achievement.label}
                      </Label>
                      <p className={`text-sm mt-1 ${
                        data.achievements?.[achievement.id] 
                          ? "text-university-primary/80" 
                          : "text-muted-foreground"
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {data.hasAchievements && (
        <div className="mt-6 p-4 bg-university-accent-light rounded-lg">
          <p className="text-sm text-university-primary">
            <strong>Выбрано достижений:</strong>{" "}
            {Object.values(data.achievements || {}).filter(Boolean).length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Индивидуальные достижения могут быть учтены приемной комиссией при равенстве конкурсных баллов
          </p>
        </div>
      )}
    </div>
  );
}