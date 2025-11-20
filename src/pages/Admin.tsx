import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  createdAt: string;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string;
  createdAt: string;
}

interface HistoryItem {
  id: string;
  action: "create" | "delete";
  type: "news" | "service";
  itemTitle: string;
  timestamp: string;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [newsList, setNewsList] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Запуск нового курса по AI",
      description: "Начинаем набор на флагманский курс",
      category: "Обновления",
      emoji: "🤖",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      title: "Конференция EdTech 2024",
      description: "Наша команда на международной конференции",
      category: "События",
      emoji: "🎯",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const [servicesList, setServicesList] = useState<ServiceItem[]>([
    {
      id: "1",
      title: "Онлайн-курсы",
      description: "Более 200 курсов от ведущих экспертов",
      icon: "Monitor",
      features: "Видео в HD, Тесты, Сертификат",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      title: "Вебинары",
      description: "Живое общение с экспертами",
      icon: "Video",
      features: "Живой эфир, Q&A, Записи",
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    toast({
      title: "Выход выполнен",
      description: "Вы успешно вышли из системы",
    });
    navigate("/admin/login");
  };

  const [newsForm, setNewsForm] = useState({
    title: "",
    description: "",
    category: "",
    emoji: "🎯"
  });

  const [serviceForm, setServiceForm] = useState({
    title: "",
    description: "",
    icon: "Monitor",
    features: ""
  });

  const stats = [
    { label: "Всего студентов", value: "15,234", icon: "Users", color: "from-purple-500 to-pink-500" },
    { label: "Активных курсов", value: "247", icon: "BookOpen", color: "from-orange-500 to-red-500" },
    { label: "Новостей", value: newsList.length.toString(), icon: "Newspaper", color: "from-cyan-500 to-blue-500" },
    { label: "Сервисов", value: servicesList.length.toString(), icon: "Briefcase", color: "from-green-500 to-emerald-500" }
  ];

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNews: NewsItem = {
      id: Date.now().toString(),
      ...newsForm,
      createdAt: new Date().toISOString()
    };
    setNewsList([newNews, ...newsList]);
    
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      action: "create",
      type: "news",
      itemTitle: newsForm.title,
      timestamp: new Date().toISOString()
    };
    setHistory([historyItem, ...history]);

    toast({
      title: "Новость добавлена",
      description: "Новость успешно опубликована на платформе",
    });
    setNewsForm({ title: "", description: "", category: "", emoji: "🎯" });
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: ServiceItem = {
      id: Date.now().toString(),
      ...serviceForm,
      createdAt: new Date().toISOString()
    };
    setServicesList([newService, ...servicesList]);

    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      action: "create",
      type: "service",
      itemTitle: serviceForm.title,
      timestamp: new Date().toISOString()
    };
    setHistory([historyItem, ...history]);

    toast({
      title: "Сервис добавлен",
      description: "Новый сервис успешно создан",
    });
    setServiceForm({ title: "", description: "", icon: "Monitor", features: "" });
  };

  const handleDeleteNews = (id: string, title: string) => {
    setNewsList(newsList.filter(news => news.id !== id));
    
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      action: "delete",
      type: "news",
      itemTitle: title,
      timestamp: new Date().toISOString()
    };
    setHistory([historyItem, ...history]);

    toast({
      title: "Новость удалена",
      description: `"${title}" успешно удалена`,
      variant: "destructive"
    });
  };

  const handleDeleteService = (id: string, title: string) => {
    setServicesList(servicesList.filter(service => service.id !== id));

    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      action: "delete",
      type: "service",
      itemTitle: title,
      timestamp: new Date().toISOString()
    };
    setHistory([historyItem, ...history]);

    toast({
      title: "Сервис удален",
      description: `"${title}" успешно удален`,
      variant: "destructive"
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} нед. назад`;
    return date.toLocaleDateString('ru-RU');
  };

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
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
              <Icon name="Shield" size={14} />
              Админ
            </Badge>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Icon name="Home" size={18} />
                На сайт
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <Icon name="LogOut" size={18} />
              Выйти
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Панель управления
          </h1>
          <p className="text-lg text-gray-600">Управляйте контентом платформы</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon name={stat.icon as any} className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="news" className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="news" className="text-base">
              <Icon name="Newspaper" size={18} />
              Новости
            </TabsTrigger>
            <TabsTrigger value="services" className="text-base">
              <Icon name="Briefcase" size={18} />
              Сервисы
            </TabsTrigger>
            <TabsTrigger value="history" className="text-base">
              <Icon name="History" size={18} />
              История
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-base">
              <Icon name="BarChart3" size={18} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Добавить новость</CardTitle>
                <CardDescription>Создайте новую публикацию для платформы</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewsSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="news-title">Заголовок</Label>
                    <Input
                      id="news-title"
                      placeholder="Введите заголовок новости"
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="news-description">Описание</Label>
                    <Textarea
                      id="news-description"
                      placeholder="Введите описание новости"
                      value={newsForm.description}
                      onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                      required
                      className="border-2 min-h-32"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="news-category">Категория</Label>
                      <Select
                        value={newsForm.category}
                        onValueChange={(value) => setNewsForm({ ...newsForm, category: value })}
                      >
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Обновления">Обновления</SelectItem>
                          <SelectItem value="События">События</SelectItem>
                          <SelectItem value="Успехи">Успехи</SelectItem>
                          <SelectItem value="Партнерства">Партнерства</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="news-emoji">Эмодзи</Label>
                      <Input
                        id="news-emoji"
                        placeholder="🎯"
                        value={newsForm.emoji}
                        onChange={(e) => setNewsForm({ ...newsForm, emoji: e.target.value })}
                        className="border-2 text-3xl text-center"
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Icon name="Plus" size={20} />
                    Опубликовать новость
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  Управление новостями
                  <Badge variant="secondary">{newsList.length} новостей</Badge>
                </CardTitle>
                <CardDescription>Просмотр и удаление существующих новостей</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {newsList.map((news) => (
                      <Card key={news.id} className="border hover:shadow-md transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{news.emoji}</span>
                                <div>
                                  <h3 className="font-bold text-lg">{news.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">{news.category}</Badge>
                                    <span className="text-xs text-gray-500">{formatDate(news.createdAt)}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mt-2">{news.description}</p>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Удалить новость?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Вы уверены, что хотите удалить "{news.title}"? Это действие нельзя отменить.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteNews(news.id, news.title)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Удалить
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Добавить сервис</CardTitle>
                <CardDescription>Создайте новый сервис для платформы</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="service-title">Название</Label>
                    <Input
                      id="service-title"
                      placeholder="Введите название сервиса"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Описание</Label>
                    <Textarea
                      id="service-description"
                      placeholder="Введите описание сервиса"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      required
                      className="border-2 min-h-32"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-icon">Иконка</Label>
                    <Select
                      value={serviceForm.icon}
                      onValueChange={(value) => setServiceForm({ ...serviceForm, icon: value })}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monitor">Monitor</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Users">Users</SelectItem>
                        <SelectItem value="Briefcase">Briefcase</SelectItem>
                        <SelectItem value="TrendingUp">TrendingUp</SelectItem>
                        <SelectItem value="MessageCircle">MessageCircle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-features">Особенности (через запятую)</Label>
                    <Input
                      id="service-features"
                      placeholder="Особенность 1, Особенность 2, Особенность 3"
                      value={serviceForm.features}
                      onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                    <Icon name="Plus" size={20} />
                    Создать сервис
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  Управление сервисами
                  <Badge variant="secondary">{servicesList.length} сервисов</Badge>
                </CardTitle>
                <CardDescription>Просмотр и удаление существующих сервисов</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {servicesList.map((service) => (
                      <Card key={service.id} className="border hover:shadow-md transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                                  <Icon name={service.icon as any} className="text-purple-600" size={20} />
                                </div>
                                <div>
                                  <h3 className="font-bold text-lg">{service.title}</h3>
                                  <span className="text-xs text-gray-500">{formatDate(service.createdAt)}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mt-2 mb-2">{service.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {service.features.split(',').map((feature, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {feature.trim()}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Icon name="Trash2" size={16} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Удалить сервис?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Вы уверены, что хотите удалить "{service.title}"? Это действие нельзя отменить.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteService(service.id, service.title)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Удалить
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="History" className="text-purple-600" />
                  История изменений
                </CardTitle>
                <CardDescription>Журнал всех действий в системе</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {history.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Clock" className="mx-auto text-gray-400 mb-4" size={48} />
                      <p className="text-gray-500">История пока пуста</p>
                      <p className="text-sm text-gray-400 mt-2">Здесь будут отображаться все действия</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((item) => (
                        <Card key={item.id} className="border">
                          <CardContent className="pt-4 pb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                item.action === "create" 
                                  ? "bg-green-100" 
                                  : "bg-red-100"
                              }`}>
                                <Icon 
                                  name={item.action === "create" ? "Plus" : "Trash2"} 
                                  className={item.action === "create" ? "text-green-600" : "text-red-600"} 
                                  size={20} 
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">
                                  {item.action === "create" ? "Создано" : "Удалено"}: 
                                  <span className="text-purple-600 ml-1">{item.itemTitle}</span>
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {item.type === "news" ? "Новость" : "Сервис"}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{formatDate(item.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-purple-600" />
                    Рост студентов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    +24%
                  </div>
                  <p className="text-gray-600">За последний месяц</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" className="text-purple-600" />
                    Завершенных курсов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    8,932
                  </div>
                  <p className="text-gray-600">В этом году</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
