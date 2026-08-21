import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gift,
  Award,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewardsView: React.FC = () => {
  const { currentUser, rewards, claimReward } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [claimSuccessMsg, setClaimSuccessMsg] = useState<string | null>(null);

  const pointsToNext = Math.max(0, 100 - currentUser.points);

  const handleClaim = (rewardId: string, cost: number, title: string) => {
    if (currentUser.points < cost) return;

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }

    const result = claimReward(rewardId);
    if (result.success) {
      setClaimSuccessMsg(`🎉 You have claimed "${title}"! Code: ${result.voucherCode}`);
      setTimeout(() => setClaimSuccessMsg(null), 6000);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const claimedRewards = rewards.filter((r) => r.isClaimed);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-pink-900 to-rose-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 text-xs font-bold">
            <Gift className="w-3.5 h-3.5 text-yellow-300" />
            Redeemable Advisor Perks
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Advisor Rewards & Vouchers
          </h1>
          <p className="text-xs sm:text-sm text-pink-200">
            Convert your verified Impact Points into partner vouchers and official mentoring certificates.
          </p>
        </div>

        {/* Current Balance Progress Box */}
        <div className="bg-white/10 p-5 rounded-2xl border border-white/20 sm:w-64 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs text-pink-200">
            <span className="font-bold uppercase tracking-wider">Available Points</span>
            <span className="text-amber-300 font-bold">{currentUser.points} Pts</span>
          </div>

          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (currentUser.points / 100) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-pink-200">
            {pointsToNext > 0
              ? `Earn ${pointsToNext} more points to unlock your next voucher.`
              : 'You have enough points to claim a reward!'}
          </p>
        </div>
      </div>

      {claimSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{claimSuccessMsg}</span>
        </div>
      )}

      {/* Available Rewards Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-extrabold text-slate-800">Available Reward Catalog</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const canAfford = currentUser.points >= reward.pointsCost;
            return (
              <div
                key={reward.id}
                className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col justify-between space-y-4 ${
                  canAfford ? 'border-pink-200 ring-1 ring-pink-100' : 'border-slate-200 opacity-90'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{reward.icon}</span>
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold">
                      {reward.pointsCost} Points
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">{reward.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{reward.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {reward.isClaimed ? (
                      <span className="text-emerald-700 font-bold">✓ Claimed ({reward.voucherCode})</span>
                    ) : canAfford ? (
                      <span className="text-emerald-700 font-semibold">Ready to claim!</span>
                    ) : (
                      `Need ${reward.pointsCost - currentUser.points} more points`
                    )}
                  </span>

                  <button
                    id={`claim-btn-${reward.id}`}
                    onClick={() => handleClaim(reward.id, reward.pointsCost, reward.title)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      canAfford
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Claim Reward
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Claimed Vouchers Section */}
      {claimedRewards.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">Your Active Vouchers & Coupons</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {claimedRewards.map((reward) => (
              <div
                key={reward.id}
                className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{reward.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs font-extrabold text-purple-900 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                      {reward.voucherCode}
                    </span>
                    <button
                      onClick={() => copyCode(reward.voucherCode || '')}
                      className="text-purple-700 hover:text-purple-900 p-1 text-[11px] font-semibold flex items-center gap-1"
                    >
                      {copiedCode === reward.voucherCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
