import React, { useState } from 'react';
import {
  Bookmark,
  Flag,
  Heart,
  PencilLine,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/Layout';
import { MascotAvatar } from '../components/Mascots';
import type { CommunityPost, UserProfile } from '../types';

interface CommunityScreenProps {
  user: UserProfile;
  posts: CommunityPost[];
  onCreatePost: (content: string, tag: string, isAnonymous: boolean) => void;
  onToggleReaction: (postId: string, kind: 'hug' | 'spirit' | 'relate') => void;
  onToggleSave: (postId: string) => void;
  onAddReply: (postId: string, text: string) => void;
  onReportPost: (postId: string) => void;
  onHelpClick: () => void;
}

const COMMUNITY_TAGS = [
  '#KehidupanKampus',
  '#PelanPelanAja',
  '#Journaling',
  '#CeritaHariIni',
  '#BelajarBareng',
];

export function CommunityScreen({
  user,
  posts,
  onCreatePost,
  onToggleReaction,
  onToggleSave,
  onAddReply,
  onReportPost,
  onHelpClick,
}: CommunityScreenProps) {
  const [tab, setTab] = useState<'for-you' | 'latest' | 'saved'>('for-you');
  const [composerOpen, setComposerOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('#PelanPelanAja');
  const [postAnon, setPostAnon] = useState(true);

  const [replyTargetPostId, setReplyTargetPostId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(false);

  const visiblePosts =
    tab === 'saved'
      ? posts.filter((p) => p.saved)
      : tab === 'latest'
        ? [...posts]
        : posts;

  const activeReplyPost = posts.find((p) => p.id === replyTargetPostId) || null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    onCreatePost(newContent, newTag, postAnon);
    setNewContent('');
    setComposerOpen(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReplyPost || !replyText.trim()) return;
    onAddReply(activeReplyPost.id, replyText);
    setReplyText('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Komunitas" showMenu onHelpClick={onHelpClick} />

      <div className="flex-1 px-5 md:px-0 pb-8 space-y-5">
        <div>
          <h2 className="text-[28px] font-bold text-[#162333] tracking-tight leading-tight">
            Banyak rasa, satu ruang.
          </h2>
          <p className="text-[13.5px] text-[#526173] mt-1">
            Saling dengar. Saling jaga. Tanpa menghakimi.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-full p-1 shadow-[0_4px_16px_rgba(22,35,51,0.04)] grid grid-cols-3 gap-1 max-w-lg">
          {(
            [
              { id: 'for-you', label: 'Untukmu' },
              { id: 'latest', label: 'Terbaru' },
              { id: 'saved', label: 'Disimpan' },
            ] as const
          ).map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`py-2.5 rounded-full text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#93A7EC] text-[#162333]'
                    : 'text-[#526173] hover:text-[#162333]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Feed Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Composer Trigger */}
            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="w-full tc-card p-3.5 px-4 flex items-center justify-between text-left hover:shadow-[0_8px_24px_rgba(22,35,51,0.06)] transition-shadow"
            >
              <div className="flex items-center gap-3">
                <MascotAvatar variant={user.mascot} size="sm" />
                <span className="text-sm text-[#364457]">
                  Apa yang ingin kamu ceritakan?
                </span>
              </div>
              <PencilLine className="w-5 h-5 text-[#526173] shrink-0" />
            </button>

            {visiblePosts.length === 0 ? (
              <div className="tc-card p-6 text-center space-y-2">
                <p className="text-sm font-bold text-[#162333]">
                  Belum ada cerita yang disimpan
                </p>
                <p className="text-xs text-[#526173]">
                  Ketuk ikon simpan pada cerita yang menguatkanmu untuk membacanya lagi nanti.
                </p>
              </div>
            ) : (
              visiblePosts.map((post) => (
                <article key={post.id} className="tc-card p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <MascotAvatar variant={post.mascot} size="md" />
                      <div>
                        <p className="text-[15px] font-bold text-[#162333]">{post.author}</p>
                        <p className="text-xs text-[#526173]">
                          {post.timeAgo}
                          {post.isAnonymous ? ' · Nama samaran' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label={post.saved ? 'Hapus dari tersimpan' : 'Simpan cerita'}
                        onClick={() => onToggleSave(post.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          post.saved
                            ? 'bg-[#EEF2FB] text-[#4B6BD6]'
                            : 'text-[#526173] hover:bg-slate-100'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${post.saved ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        type="button"
                        aria-label="Laporkan cerita"
                        onClick={() => onReportPost(post.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#526173] hover:bg-slate-100"
                      >
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-[#162333]">{post.tag}</p>
                  <p className="text-[14px] text-[#162333] leading-relaxed">{post.content}</p>

                  {/* Reaction Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onToggleReaction(post.id, 'hug')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 tabular-nums transition-colors ${
                        post.userReactedHug
                          ? 'bg-[#93A7EC] text-[#162333]'
                          : 'bg-[#E7F0EC] text-[#162333] hover:bg-[#DCE9E3]'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Peluk {post.hugCount}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleReaction(post.id, 'spirit')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 tabular-nums transition-colors ${
                        post.userReactedSpirit
                          ? 'bg-[#93A7EC] text-[#162333]'
                          : 'bg-[#E7F0EC] text-[#162333] hover:bg-[#DCE9E3]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Semangat {post.spiritCount}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleReaction(post.id, 'relate')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 tabular-nums transition-colors ${
                        post.userReactedRelate
                          ? 'bg-[#93A7EC] text-[#162333]'
                          : 'bg-[#E7F0EC] text-[#162333] hover:bg-[#DCE9E3]'
                      }`}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Aku juga {post.relateCount}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReplyTargetPostId(post.id)}
                    className="text-xs font-semibold text-[#364457] hover:text-[#162333] hover:underline pt-1 inline-block"
                  >
                    {post.replies.length > 0
                      ? `Lihat ${post.replies.length} balasan yang saling menguatkan →`
                      : 'Tulis balasan yang saling menguatkan →'}
                  </button>
                </article>
              ))
            )}
          </div>

          {/* Safety Guidelines Sidebar Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-[#DCEBE5] p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2F5244] shrink-0 mt-0.5" />
              <div>
                <p className="text-[13.5px] font-bold text-[#162333]">
                  Jaga ruang ini tetap hangat
                </p>
                <p className="text-xs text-[#3F554C] mt-1 leading-relaxed">
                  Hindari data pribadi dan konten yang menyakiti. Gunakan ikon bendera untuk melaporkan. Moderator akan meninjau laporan.
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowGuidelines(true)}
                className="text-xs font-semibold text-[#162333] hover:underline"
              >
                Baca panduan komunitas →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Composer Modal */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5">
          <form
            onSubmit={handlePublish}
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#162333]">Bagikan ceritamu</h3>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                aria-label="Tutup"
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={4}
              maxLength={400}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Apa yang sedang kamu rasakan atau syukuri hari ini?"
              className="w-full p-4 rounded-2xl bg-[#F5F8FD] text-sm text-[#162333] placeholder:text-[#6D7B8D] resize-none focus:outline-none focus:ring-2 focus:ring-[#93A7EC]"
            />

            <div>
              <p className="text-xs font-semibold text-[#526173] mb-2">Pilih tagar</p>
              <div className="flex flex-wrap gap-1.5">
                {COMMUNITY_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewTag(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      newTag === t
                        ? 'bg-[#93A7EC] text-[#162333]'
                        : 'bg-[#F3F6FD] text-[#526173]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-[#364457] cursor-pointer">
              <input
                type="checkbox"
                checked={postAnon}
                onChange={(e) => setPostAnon(e.target.checked)}
                className="rounded accent-[#93A7EC]"
              />
              <span>Tampilkan dengan nama samaran (Teman senja)</span>
            </label>

            <button
              type="submit"
              disabled={!newContent.trim()}
              className="w-full tc-btn-primary h-12 text-sm"
            >
              Bagikan ke komunitas
            </button>
          </form>
        </div>
      )}

      {/* Replies Drawer */}
      {activeReplyPost && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-[#162333]">
                Balasan untuk {activeReplyPost.author}
              </h3>
              <button
                type="button"
                onClick={() => setReplyTargetPostId(null)}
                aria-label="Tutup balasan"
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F6F8FD] text-xs text-[#162333] mb-4 leading-relaxed">
              {activeReplyPost.content}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 mb-4 pr-1">
              {activeReplyPost.replies.length === 0 ? (
                <p className="text-xs text-[#6D7B8D] text-center py-4">
                  Jadilah yang pertama mengirim kata penguat.
                </p>
              ) : (
                activeReplyPost.replies.map((r) => (
                  <div key={r.id} className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#EEF5F2]">
                    <MascotAvatar variant={r.mascot} size="xs" />
                    <div>
                      <p className="text-xs font-bold text-[#162333]">
                        {r.author}{' '}
                        <span className="font-normal text-[#6D7B8D]">· {r.timeAgo}</span>
                      </p>
                      <p className="text-xs text-[#364457] mt-0.5 leading-relaxed">{r.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendReply} className="flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tulis dukungan hangat..."
                className="flex-1 h-11 px-4 rounded-full bg-[#F4F7FC] text-xs text-[#162333] focus:outline-none focus:ring-2 focus:ring-[#93A7EC]"
              />
              <button
                type="submit"
                aria-label="Kirim balasan"
                className="w-11 h-11 rounded-full bg-[#93A7EC] flex items-center justify-center text-[#162333] shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Community Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-5">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl relative space-y-3">
            <button
              type="button"
              onClick={() => setShowGuidelines(false)}
              aria-label="Tutup panduan"
              className="absolute right-4 top-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#526173]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-[#162333]">Panduan Komunitas TitipCerita</h3>
            <ul className="text-xs text-[#364457] space-y-2 leading-relaxed">
              <li>• Dengarkan dengan empati, hindari menghakimi atau memberi diagnosis medis.</li>
              <li>• Jangan membagikan nomor telepon, alamat rumah, atau data pribadi sensitif.</li>
              <li>• Gunakan nama samaran saat bercerita agar semua orang merasa aman.</li>
              <li>• Jika melihat konten yang mengkhawatirkan, gunakan tombol bendera untuk melapor.</li>
            </ul>
            <button
              type="button"
              onClick={() => setShowGuidelines(false)}
              className="w-full tc-btn-primary h-11 text-xs mt-2"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
