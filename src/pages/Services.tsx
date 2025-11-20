import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Онлайн-курсы",
      description: "Более 200 курсов от ведущих экспертов индустрии. Видеоуроки, практические задания и сертификаты.",
      icon: "Monitor",
      color: "from-purple-500 to-pink-500",
      features: ["Видео в HD качестве", "Тесты и задания", "Сертификат"]
    },
    {
      title: "Вебинары",
      description: "Живое общение с экспертами. Задавайте вопросы в реальном времени и получайте ответы.",
      icon: "Video",
      color: "from-orange-500 to-red-500",
      features: ["Живой эфир", "Q&A сессии", "Записи"]
    },
    {
      title: "Менторство",
      description: "Персональное сопровождение опытными наставниками. Индивидуальный подход к обучению.",
      icon: "Users",
      color: "from-cyan-500 to-blue-500",
      features: ["1-на-1 встречи", "Обратная связь", "План развития"]
    },
    {
      title: "Практикумы",
      description: "Реальные проекты для портфолио. Отработка навыков на живых кейсах.",
      icon: "Briefcase",
      color: "from-green-500 to-emerald-500",
      features: ["Реальные задачи", "Командная работа", "Портфолио"]
    },
    {
      title: "Карьерная поддержка",
      description: "Помощь в трудоустройстве. Составление резюме, подготовка к собеседованиям.",
      icon: "TrendingUp",
      color: "from-violet-500 to-purple-500",
      features: ["Резюме", "Mock интервью", "Вакансии"]
    },
    {
      title: "Сообщество",
      description: "Доступ к закрытому комьюнити студентов и выпускников. Нетворкинг и обмен опытом.",
      icon: "MessageCircle",
      color: "from-pink-500 to-rose-500",
      features: ["Форум", "Чаты", "Мероприятия"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Icon name="GraduationCap" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              EduSpace
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Главная
            </Link>
            <Link to="/services" className="text-purple-600 font-medium">
              Сервисы
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Новости
            </Link>
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            Наши сервисы
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Всё для твоего успеха
          </h1>
          <p className="text-xl text-gray-600">
            Комплексный подход к обучению: от теории до практики и трудоустройства
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-1.5 bg-gradient-to-r ${service.color}`} />
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon name={service.icon as any} className="text-white" size={32} />
                </div>
                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90`}
                >
                  Подробнее
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0tOCAwSDIwdi0yaDh2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          <CardContent className="relative py-12 md:py-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Хочешь узнать больше?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Запишись на бесплатную консультацию</p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
              Записаться
              <Icon name="Calendar" size={20} />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Services;
