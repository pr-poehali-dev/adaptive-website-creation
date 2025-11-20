import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Home = () => {
  const stats = [
    { icon: "Users", value: "15K+", label: "Активных студентов" },
    { icon: "BookOpen", value: "200+", label: "Курсов" },
    { icon: "Award", value: "95%", label: "Успешных выпускников" },
    { icon: "Globe", value: "45", label: "Стран" }
  ];

  const courses = [
    {
      title: "Веб-разработка",
      description: "Создавайте современные сайты и приложения",
      icon: "Code",
      color: "from-purple-500 to-pink-500",
      students: 3500
    },
    {
      title: "Дизайн",
      description: "Изучите UI/UX и графический дизайн",
      icon: "Palette",
      color: "from-orange-500 to-red-500",
      students: 2800
    },
    {
      title: "Маркетинг",
      description: "Станьте экспертом в digital-маркетинге",
      icon: "TrendingUp",
      color: "from-cyan-500 to-blue-500",
      students: 4200
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Icon name="GraduationCap" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              EduSpace
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Главная
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
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

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            Образование будущего
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">ИнфоРесурс</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">Изучай нужную информация для тебя!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-lg px-8">
              Начать обучение
              <Icon name="ArrowRight" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-2">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="pt-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Icon name={stat.icon as any} className="text-purple-600" size={28} />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Популярные направления</h2>
          <p className="text-xl text-gray-600">Выбери свой путь к успеху</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={course.icon as any} className="text-white" size={32} />
                </div>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Users" size={16} />
                    <span className="text-sm font-medium">{course.students.toLocaleString()} студентов</span>
                  </div>
                  <Button size="sm" variant="ghost" className="group-hover:bg-purple-50">
                    Подробнее
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0tOCAwSDIwdi0yaDh2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          <CardContent className="relative py-12 md:py-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Готов начать обучение?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Присоединяйся к тысячам успешных студентов</p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
              Зарегистрироваться сейчас
              <Icon name="Sparkles" size={20} />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;