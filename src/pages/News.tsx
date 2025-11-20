import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  const categories = ["Все", "Обновления", "События", "Успехи", "Партнерства"];

  const newsItems = [
    {
      title: "Запуск нового курса по AI и Machine Learning",
      description: "Начинаем набор на флагманский курс по искусственному интеллекту. Изучите нейросети, компьютерное зрение и NLP.",
      category: "Обновления",
      date: "2 дня назад",
      image: "🤖",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "EduSpace на международной конференции EdTech 2024",
      description: "Наша команда представила инновационный подход к онлайн-образованию на крупнейшей конференции в Европе.",
      category: "События",
      date: "5 дней назад",
      image: "🎯",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Выпускница Анна получила оффер в Google",
      description: "После прохождения курса веб-разработки Анна успешно прошла собеседование и получила работу мечты.",
      category: "Успехи",
      date: "1 неделю назад",
      image: "🏆",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Партнерство с ведущими IT-компаниями",
      description: "Подписали соглашения с 15 компаниями о стажировках и трудоустройстве наших выпускников.",
      category: "Партнерства",
      date: "2 недели назад",
      image: "🤝",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Новая платформа для интерактивного обучения",
      description: "Запустили beta-версию платформы с AR/VR технологиями для погружения в учебный процесс.",
      category: "Обновления",
      date: "3 недели назад",
      image: "🚀",
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Студент Михаил выиграл хакатон",
      description: "Наш студент занял первое место на международном хакатоне по разработке мобильных приложений.",
      category: "Успехи",
      date: "1 месяц назад",
      image: "💎",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === "Все" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <Link to="/services" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Сервисы
            </Link>
            <Link to="/news" className="text-purple-600 font-medium">
              Новости
            </Link>
            <Link to="/admin/login">
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            Новости
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Следи за нашими успехами
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Последние новости, события и достижения нашего сообщества
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Поиск новостей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 border-0" 
                : "border-2"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 overflow-hidden animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-1.5 bg-gradient-to-r ${item.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-5xl w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {item.image}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    <span>{item.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-purple-600">
                    Читать
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default News;