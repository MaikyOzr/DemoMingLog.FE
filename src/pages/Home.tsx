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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">MindLog 🧠</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/journal"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Мій журнал
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/signin"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Увійти
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90"
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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              MindLog 🧠
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Відстежуйте свій психічний стан, настрій та думки щодня
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Відстеження настрою</h3>
            <p className="mt-2 text-gray-500">
              Записуйте свій настрій щодня та отримуйте детальну статистику
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Щоденник думок</h3>
            <p className="mt-2 text-gray-500">
              Зберігайте свої думки та роздуми в зручному форматі
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Аналітика</h3>
            <p className="mt-2 text-gray-500">
              Отримуйте інсайти про свій психічний стан завдяки графікам
            </p>
          </div>
        </div>
      </div>

      {/* Chart Preview - Only show for authenticated users */}
      {isAuthenticated && entries.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваш настрій за останній час</h2>
            <div className="h-[300px]">
              <MoodChart entries={entries} />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Почніть відстежувати свій настрій сьогодні
              </h2>
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90"
                >
                  Зареєструватися
                </Link>
                <Link
                  to="/auth/signin"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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