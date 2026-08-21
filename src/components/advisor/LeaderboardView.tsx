import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Sparkles, Medal, Users, ArrowUpRight } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { currentUser } = useApp();
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('month');

  const leaders = [
    { rank: 1, name: 'Anjali Deshmukh', points: 450, ideasGiven: 28, ideasSelected: 12, growthVerified: 6, badge: '🏆 Impact Champion', city: 'Nagpur', isCurrent: currentUser.name.includes('Anjali') },
    { rank: 2, name: 'Rahul Joshi', points: 380, ideasGiven: 22, ideasSelected: 9, growthVerified: 4, badge: '💡 Idea Contributor', city: 'Pune' },
    { rank: 3, name: 'Sneha Kulkarni', points: 320, ideasGiven: 18, ideasSelected: 8, growthVerified: 3, badge: '🌱 Growth Supporter', city: 'Mumbai' },
    { rank: 4, name: 'Arjun Patil', points: 275, ideasGiven: 15, ideasSelected: 6, growthVerified: 2, badge: '🔥 Rising Advisor', city: 'Akola' },
    { rank: 5, name: 'Kavya Rao', points: 220, ideasGiven: 14, ideasSelected: 5, growthVerified: 2, badge: '🌱 Growth Supporter', city: 'Nagpur' },
    { rank: 6, name: 'Meera Iyer', points: 190, ideasGiven: 11, ideasSelected: 4, growthVerified: 1, badge: '💡 Contributor', city: 'Pune' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-extrabold text-slate-900">Top Advisors Leaderboard</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Community advisors ranked by verified impact and business growth improvements delivered.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex rounded-xl bg-slate-100 p-1 self-start sm:self-auto">
          {(['week', 'month', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                timeFilter === tab ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Time' : `This ${tab}`}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaders.slice(0, 3).map((leader) => (
          <div
            key={leader.rank}
            className={`bg-white rounded-3xl p-5 border shadow-xs text-center space-y-3 relative ${
              leader.rank === 1
                ? 'border-amber-300 ring-2 ring-amber-300/30 bg-gradient-to-b from-amber-50/30 to-white'
                : 'border-purple-100'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              {leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : '🥉'}
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">{leader.name}</h3>
              <p className="text-[11px] text-slate-500">📍 {leader.city}</p>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Impact Points</span>
              <p className="text-lg font-extrabold text-purple-900">{leader.points} Pts</p>
            </div>

            <span className="inline-block text-[10px] font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
              {leader.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Full Rankings</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="pb-3 font-bold">Rank</th>
                <th className="pb-3 font-bold">Advisor</th>
                <th className="pb-3 font-bold">Badge</th>
                <th className="pb-3 font-bold text-center">Ideas Selected</th>
                <th className="pb-3 font-bold text-center">Verified Growth</th>
                <th className="pb-3 font-bold text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leaders.map((leader) => (
                <tr
                  key={leader.rank}
                  className={`hover:bg-purple-50/30 transition ${
                    leader.isCurrent ? 'bg-purple-50/60 font-semibold' : ''
                  }`}
                >
                  <td className="py-3.5 font-extrabold text-slate-700">#{leader.rank}</td>
                  <td className="py-3.5">
                    <div className="font-bold text-slate-900">{leader.name}</div>
                    <span className="text-[10px] text-slate-400">{leader.city}</span>
                  </td>
                  <td className="py-3.5">
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {leader.badge}
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-bold text-slate-700">{leader.ideasSelected}</td>
                  <td className="py-3.5 text-center font-bold text-emerald-700">
                    +{leader.growthVerified} cases
                  </td>
                  <td className="py-3.5 text-right font-extrabold text-purple-900 text-sm">
                    {leader.points} Pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
