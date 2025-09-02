import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { PersonalDataCard } from "./cards/PersonalDataCard";
import { LegalRepresentativeCard } from "./cards/LegalRepresentativeCard";
import { PayerSelectionCard } from "./cards/PayerSelectionCard";
import { PayerDataCard } from "./cards/PayerDataCard";
import { DormitoryCard } from "./cards/DormitoryCard";
import { EducationLevelCard } from "./cards/EducationLevelCard";
import { PreviousEducationCard } from "./cards/PreviousEducationCard";
import { AchievementsCard } from "./cards/AchievementsCard";
import { StudyParametersCard } from "./cards/StudyParametersCard";

export interface ApplicationData {
  personalData: any;
  legalRepresentative: any;
  payerSelection: "self" | "representative" | "other";
  payerData: any;
  dormitory: boolean;
  educationLevel: "higher" | "secondary";
  previousEducation: any;
  achievements: any;
  studyParameters: any;
}

const STEPS = [
  { id: 1, title: "Персональные данные", required: true },
  { id: 2, title: "Законный представитель", required: false },
  { id: 3, title: "Выбор плательщика", required: true },
  { id: 4, title: "Данные плательщика", required: false },
  { id: 5, title: "Потребность в общежитии", required: true },
  { id: 6, title: "Уровень образования", required: true },
  { id: 7, title: "Предыдущее образование", required: true },
  { id: 8, title: "Индивидуальные достижения", required: true },
  { id: 9, title: "Параметры обучения", required: true },
];

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalData: {},
    legalRepresentative: {},
    payerSelection: "self",
    payerData: {},
    dormitory: false,
    educationLevel: "higher",
    previousEducation: {},
    achievements: {},
    studyParameters: {},
  });

  const updateData = (field: keyof ApplicationData, data: any) => {
    setApplicationData(prev => ({ ...prev, [field]: data }));
  };

  const isStepRequired = (step: number) => {
    if (step === 2) return calculateAge(applicationData.personalData.birthDate) < 18;
    if (step === 4) return applicationData.payerSelection === "other";
    return STEPS[step - 1].required;
  };

  const canProceedToNext = () => {
    // Add validation logic here
    return true;
  };

  const nextStep = () => {
    if (currentStep < STEPS.length && canProceedToNext()) {
      let nextStepNumber = currentStep + 1;
      // Skip non-required steps
      while (nextStepNumber <= STEPS.length && !isStepRequired(nextStepNumber)) {
        nextStepNumber++;
      }
      if (nextStepNumber <= STEPS.length) {
        setCurrentStep(nextStepNumber);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      let prevStepNumber = currentStep - 1;
      // Skip non-required steps
      while (prevStepNumber >= 1 && !isStepRequired(prevStepNumber)) {
        prevStepNumber--;
      }
      if (prevStepNumber >= 1) {
        setCurrentStep(prevStepNumber);
      }
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataCard
            data={applicationData.personalData}
            onChange={(data) => updateData("personalData", data)}
          />
        );
      case 2:
        return (
          <LegalRepresentativeCard
            data={applicationData.legalRepresentative}
            onChange={(data) => updateData("legalRepresentative", data)}
          />
        );
      case 3:
        return (
          <PayerSelectionCard
            data={applicationData.payerSelection}
            onChange={(data) => updateData("payerSelection", data)}
            isMinor={calculateAge(applicationData.personalData.birthDate) < 18}
          />
        );
      case 4:
        return (
          <PayerDataCard
            data={applicationData.payerData}
            onChange={(data) => updateData("payerData", data)}
          />
        );
      case 5:
        return (
          <DormitoryCard
            data={applicationData.dormitory}
            onChange={(data) => updateData("dormitory", data)}
          />
        );
      case 6:
        return (
          <EducationLevelCard
            data={applicationData.educationLevel}
            onChange={(data) => updateData("educationLevel", data)}
          />
        );
      case 7:
        return (
          <PreviousEducationCard
            data={applicationData.previousEducation}
            onChange={(data) => updateData("previousEducation", data)}
            educationLevel={applicationData.educationLevel}
          />
        );
      case 8:
        return (
          <AchievementsCard
            data={applicationData.achievements}
            onChange={(data) => updateData("achievements", data)}
          />
        );
      case 9:
        return (
          <StudyParametersCard
            data={applicationData.studyParameters}
            onChange={(data) => updateData("studyParameters", data)}
            educationLevel={applicationData.educationLevel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress header */}
      <Card className="bg-gradient-secondary border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-university-primary">
              Подача заявления в приёмную комиссию
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Шаг {currentStep} из {STEPS.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-sm text-university-primary font-medium mt-2">
            {STEPS[currentStep - 1].title}
          </div>
        </CardHeader>
      </Card>

      {/* Current step content */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        {currentStep === STEPS.length ? (
          <Button className="bg-gradient-primary hover:opacity-90 flex items-center">
            <Check className="w-4 h-4 mr-2" />
            Отправить заявление
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            className="bg-gradient-primary hover:opacity-90 flex items-center"
          >
            Далее
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

function calculateAge(birthDate: string): number {
  if (!birthDate) return 18;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}