import React, { useState } from 'react';
import { Check, Star, X } from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar, MascotMint } from '../components/Mascots';
import { REVIEW_TAGS } from '../data/mockData';
import type { Session, SessionReview } from '../types';

interface RatingModalProps {
  session: Session;
  onClose: () => void;
  onSubmit: (sessionId: string, review: SessionReview) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Kurang nyaman',
  2: 'Biasa saja',
  3: 'Cukup nyaman',
  4: 'Nyaman',
  5: 'Nyaman banget',
};

export function RatingModal({ session, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(session.review?.rating ?? 5);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    session.review?.tags ?? ['Pendengar baik', 'Tidak menghakimi']
  );
  const [comment, setComment] = useState(
    session.review?.comment ??
      'Makasih sudah mendengarkan tanpa buru-buru. Aku jadi lebih lega dan tahu mau mulai dari mana.'
  );
  const [anonymous, setAnonymous] = useState(session.review?.anonymous ?? true);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(session.id, {
      rating,
      tags: selectedTags,
      comment: comment.trim(),
      anonymous,
      submittedAt: '20 Okt 2026',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#BDC8C4]/85 backdrop-blur-xs flex flex-col justify-between overflow-y-auto">
      {/* Top Dimmed Header with Mint Mascot Peeking */}
      <div className="max-w-md mx-auto w-full">
        <PageHeader title="Sesi selesai" onBack={onClose} showMenu />
        <div className="flex justify-center pb-3">
          <MascotMint className="w-24 h-24" />
        </div>
      </div>

      {/* Bottom Review Sheet */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-white rounded-t-[32px] sm:rounded-[32px] sm:mb-8 p-6 shadow-[0_-12px_40px_rgba(22,35,51,0.12)] space-y-4"
      >
        <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto -mt-1" />

        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[22px] font-bold text-[#162333] tracking-tight">
              Gimana rasanya tadi?
            </h2>
            <p className="text-xs text-[#526173] mt-1">
              Ulasanmu membantu teman lain memilih buddy.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup ulasan"
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <MascotAvatar variant={session.buddyMascot} size="sm" />
          <div>
            <p className="text-sm font-bold text-[#162333]">
              {session.buddyName} · {session.service} {session.durationLabel}
            </p>
            <p className="text-xs text-[#526173]">
              {session.dateLabel} · {session.timeRange}
            </p>
          </div>
        </div>

        {/* Interactive 5-Star Picker */}
        <div className="flex flex-col items-center py-2">
          <div className="flex items-center gap-2.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                aria-label={`Beri ${num} bintang`}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 ${
                    num <= rating
                      ? 'fill-[#162333] text-[#162333]'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-[#364457] mt-2 tabular-nums">
            {rating} dari 5 · {RATING_LABELS[rating]}
          </p>
        </div>

        {/* Compliment Tags */}
        <div className="flex flex-wrap gap-2">
          {REVIEW_TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#93A7EC] text-[#162333]'
                    : 'bg-[#F4F7FC] text-[#364457] hover:bg-[#EAEFF9]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Comment Box */}
        <div className="bg-[#F4F7FC] rounded-2xl p-3.5">
          <textarea
            rows={3}
            maxLength={500}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pengalamanmu di sesi tadi..."
            className="w-full bg-transparent text-[13px] text-[#162333] placeholder:text-[#6D7B8D] resize-none focus:outline-none leading-relaxed"
          />
          <p className="text-right text-[11px] text-[#6D7B8D] tabular-nums mt-1">
            {comment.length}/500
          </p>
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            role="checkbox"
            aria-checked={anonymous}
            onClick={() => setAnonymous((v) => !v)}
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
              anonymous
                ? 'border-[#162333] bg-white text-[#162333]'
                : 'border-slate-300 bg-white'
            }`}
          >
            {anonymous && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
          </button>
          <span className="text-xs text-[#364457]">
            Tampilkan ulasan dengan nama samaran
          </span>
        </div>

        <button type="submit" className="w-full tc-btn-primary h-12.5 text-[15px]">
          Kirim ulasan
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-xs font-semibold text-[#364457] hover:underline py-1"
        >
          Nanti saja
        </button>
      </form>
    </div>
  );
}
