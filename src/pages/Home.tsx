import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoodChart } from "../components/MoodChart";
import { useJournalFetcher } from "../api/fetcher";

export const Home = () => {
  const { entries } = useJournalFetcher();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                MindLog 🧠
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/journal"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Мій журнал
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/signin"
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    Увійти
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-soft"
                  >
                    Зареєструватися
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              <span className="block">Відстежуйте свій</span>
              <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                психічний стан
              </span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Приєднуйтесь до тисяч користувачів, які вже покращили своє психічне здоров'я
            </p>
            {!isAuthenticated && (
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-soft text-white bg-primary-600 hover:bg-primary-700 transition-all hover:shadow-hover"
                >
                  Почніть безкоштовно
                </Link>
                <Link
                  to="/auth/signin"
                  className="inline-flex items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-soft hover:shadow-hover"
                >
                  Увійти
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">10K+</div>
              <div className="mt-2 text-gray-600">Активних користувачів</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">98%</div>
              <div className="mt-2 text-gray-600">Задоволених користувачів</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">24/7</div>
              <div className="mt-2 text-gray-600">Підтримка</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-hover transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Відстеження настрою</h3>
              <p className="mt-2 text-gray-500">
                Записуйте свій настрій щодня та отримуйте детальну статистику
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-hover transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Щоденник думок</h3>
              <p className="mt-2 text-gray-500">
                Зберігайте свої думки та роздуми в зручному форматі
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-hover transition-all transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Аналітика</h3>
              <p className="mt-2 text-gray-500">
                Отримуйте інсайти про свій психічний стан завдяки графікам
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Preview - Only show for authenticated users */}
      {isAuthenticated && entries.length > 0 && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваш настрій за останній час</h2>
              <div className="h-[300px]">
                <MoodChart entries={entries} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <div className="py-16 bg-gradient-to-b from-white to-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Почніть відстежувати свій настрій сьогодні
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Приєднуйтесь до нашої спільноти та покращуйте своє психічне здоров'я
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-soft text-white bg-primary-600 hover:bg-primary-700 transition-all hover:shadow-hover"
                >
                  Зареєструватися
                </Link>
                <Link
                  to="/auth/signin"
                  className="inline-flex items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-soft hover:shadow-hover"
                >
                  Увійти
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 