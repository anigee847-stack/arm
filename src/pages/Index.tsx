import { Layout } from "@/components/Layout";
import { ApplicationForm } from "@/components/ApplicationForm/ApplicationForm";

const Index = () => {
  return (
    <Layout currentPage="applications">
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-university-primary mb-2">
            Подача нового заявления
          </h1>
          <p className="text-muted-foreground">
            Заполните все необходимые данные для подачи заявления в приёмную комиссию
          </p>
        </div>
        
        <ApplicationForm />
      </div>
    </Layout>
  );
};

export default Index;
