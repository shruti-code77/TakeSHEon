import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, Lightbulb, Sparkles, Award, TrendingUp, CheckCircle } from 'lucide-react';

export const NotificationDropdown: React.FC = () => {
  const { notifications, currentUser, markNotificationRead, markAllNotificationsRead, setActiveView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userNotifs = notifications.filter((n) => n.userId === currentUser.id);
  const unreadCount = userNotifs.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'points':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'selected':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'experiment':
        return <TrendingUp className="w-4 h-4 text-purple-500" />;
      case 'reward':
        return <Sparkles className="w-4 h-4 text-pink-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-pink-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {userNotifs.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                No notifications right now
              </div>
            ) : (
              userNotifs.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    markNotificationRead(item.id);
                    if (item.type === 'points' || item.type === 'reward') {
                      setActiveView('advisor-impact');
                    } else if (item.type === 'experiment') {
                      setActiveView('entrepreneur-ai-insights');
                    } else {
                      setActiveView('community-feed');
                    }
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 hover:bg-purple-50/50 cursor-pointer transition flex items-start gap-3 ${
                    !item.read ? 'bg-purple-50/30' : ''
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-slate-800 truncate">{item.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
