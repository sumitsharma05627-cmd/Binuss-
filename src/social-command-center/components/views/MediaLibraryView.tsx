import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { MediaItem } from '../../types';
import { 
  Folder, 
  Image as ImageIcon, 
  Film, 
  Upload, 
  Search, 
  Trash2, 
  Tag, 
  ExternalLink,
  Plus,
  Bookmark,
  Check,
  Copy,
  FolderPlus,
  Eye
} from 'lucide-react';

export const MediaLibraryView: React.FC = () => {
  const { currentClient, mediaLibrary, uploadMedia, deleteMedia } = useSocialCommand();

  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'media' | 'captions' | 'brand_assets'>('media');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedCaptionId, setCopiedCaptionId] = useState<string | null>(null);

  // New media modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');
  const [newFolder, setNewFolder] = useState('Campaign Assets');
  const [newTags, setNewTags] = useState('');

  // Caption template state
  const captionTemplates = [
    {
      id: 'c1',
      title: 'Festival Greetings & Special Offer',
      category: 'Festive / Seasonal',
      text: 'Warm festive greetings from all of us at {Brand}! May this season bring prosperity, joy, and rapid digital growth to your journey. Enjoy our exclusive 25% festive package discount this week only. Contact us or click the link in bio to book your slot! #FestiveOffer #GwaliorBusiness #DigitalGrowth'
    },
    {
      id: 'c2',
      title: 'Client Success & Transformation Reel Caption',
      category: 'Case Studies',
      text: 'From 0 to 50,000+ monthly targeted views in 60 days. 🚀 Consistent content cadence + hyper-targeted regional targeting = sustainable high-ROI growth. Swipe right to see the analytics breakdown. Ready to scale your brand? Drop a "SCALE" in the comments! #ClientSuccess #MarketingResults #AgencyLife'
    },
    {
      id: 'c3',
      title: 'Educational Carousel / Industry Tip',
      category: 'Thought Leadership',
      text: '3 Critical Mistakes 90% of Local Brands Make on Social Media: 1. Inconsistent scheduling. 2. Not responding within 15 minutes. 3. Treating every platform the same. Save this post for your next campaign review! What would you add to this list? #SocialMediaTips #MarketingHacks #GwaliorWebLabs'
    },
    {
      id: 'c4',
      title: 'Behind the Scenes & Agency Culture',
      category: 'Culture',
      text: 'Behind every high-performing viral campaign is a team of creators, coffee, and endless iterations. Here is a sneak peek into our creative lab at Gwalior Web Labs today! Work hard, analyze metrics harder. #BehindTheScenes #CreativeAgency #TeamGWL'
    }
  ];

  // Filter media for the current client workspace
  const clientMedia = mediaLibrary.filter(item => {
    const matchesClient = !item.clientId || (currentClient && item.clientId === currentClient.id);
    const matchesFolder = selectedFolder === 'all' || item.folder === selectedFolder;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesClient && matchesFolder && matchesSearch;
  });

  // Unique folders for current client
  const folders: string[] = Array.from(
    new Set(
      mediaLibrary
        .filter(item => !item.clientId || (currentClient && item.clientId === currentClient.id))
        .map(item => String(item.folder))
    )
  );

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    uploadMedia({
      clientId: currentClient?.id,
      name: newTitle.trim(),
      type: newType,
      url: newUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      size: `${(Math.random() * 2 + 0.8).toFixed(1)} MB`,
      folder: newFolder.trim() || 'Campaign Assets',
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      uploadedAt: new Date().toISOString()
    });

    setNewTitle('');
    setNewUrl('');
    setNewTags('');
    setShowUploadModal(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCaptionId(id);
    setTimeout(() => setCopiedCaptionId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
              <Folder className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Content &amp; Brand Media Library</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Centralized digital asset vault for {currentClient?.name || 'All Clients'}. Organize photos, reels, brand logos, and caption blueprints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('media')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'media' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Media Assets ({clientMedia.length})
            </button>
            <button
              onClick={() => setActiveTab('brand_assets')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'brand_assets' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Logos &amp; Palettes
            </button>
            <button
              onClick={() => setActiveTab('captions')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'captions' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Caption Library
            </button>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-600/20"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MEDIA ASSETS */}
      {activeTab === 'media' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Folders Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Folders</span>
                <span className="text-slate-500">{folders.length} categories</span>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setSelectedFolder('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedFolder === 'all'
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Folder className="w-4 h-4" /> All Files
                  </span>
                  <span>{mediaLibrary.length}</span>
                </button>

                {folders.map((folder) => {
                  const count = mediaLibrary.filter(m => m.folder === folder).length;
                  return (
                    <button
                      key={folder}
                      onClick={() => setSelectedFolder(folder)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedFolder === folder
                          ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Folder className="w-4 h-4 text-slate-400" /> {folder}
                      </span>
                      <span className="text-slate-500 text-[10px]">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Storage Used</span>
                <span className="font-semibold text-white">4.8 GB / 100 GB</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-violet-500 h-full w-[5%]" />
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search filter bar */}
            <div className="flex items-center justify-between gap-4 bg-slate-900/70 p-3 rounded-2xl border border-slate-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search assets by file name, keyword or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="text-xs text-slate-400 shrink-0">
                Showing <span className="font-bold text-white">{clientMedia.length}</span> assets
              </div>
            </div>

            {/* Asset Grid */}
            {clientMedia.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-semibold text-white">No assets found</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Upload campaign photography, promotional banners, or video assets to use in your social publishing studio.
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold hover:bg-violet-500 transition-all inline-flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" /> Upload File
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {clientMedia.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-all flex flex-col justify-between"
                  >
                    {/* Media Preview Box */}
                    <div className="relative aspect-video bg-slate-950 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-white uppercase flex items-center gap-1 border border-white/10">
                        {item.type === 'video' ? <Film className="w-3 h-3 text-rose-400" /> : <ImageIcon className="w-3 h-3 text-cyan-400" />}
                        <span>{item.type}</span>
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
                        {item.size}
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-3.5 space-y-2">
                      <h4 className="font-semibold text-white text-xs truncate" title={item.name}>
                        {item.name}
                      </h4>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate max-w-[120px]">{item.folder}</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                            title="View Full Size"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => deleteMedia(item.id)}
                            className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BRAND ASSETS */}
      {activeTab === 'brand_assets' && (
        <div className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-2">Workspace Identity: {currentClient?.name || 'Gwalior Web Labs'}</h3>
            <p className="text-xs text-slate-400 mb-6">
              Saved vector logos, brand watermarks, hex palettes, and typography presets for fast one-click brand watermarking in the Publishing Studio.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Logo */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Official Shield Crest</span>
                <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700/80 p-2 flex items-center justify-center mb-4">
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png"
                    alt="Brand Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h5 className="text-sm font-semibold text-white">Gwalior Web Labs Master Logo</h5>
                <p className="text-[11px] text-slate-500 mt-1">High-Res Master PNG (Transparent)</p>
                <button
                  onClick={() => copyToClipboard('/assets/aistudio/Gemini_Generated_Image_b1kwab1kwab1kwab_83d54e8a.png', 'logo')}
                  className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
                >
                  {copiedCaptionId === 'logo' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCaptionId === 'logo' ? 'Path Copied!' : 'Copy Asset URL'}</span>
                </button>
              </div>

              {/* Color Palette */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Official Brand Palette</span>
                <div className="space-y-3">
                  {[
                    { name: 'Deep Royal Navy', hex: '#0B132B' },
                    { name: 'Electric Violet', hex: '#6366F1' },
                    { name: 'Imperial Amber / Gold', hex: '#F59E0B' },
                    { name: 'Cyber Cyan', hex: '#06B6D4' },
                  ].map((color, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-md shadow" style={{ backgroundColor: color.hex }} />
                        <span className="text-white font-medium">{color.name}</span>
                      </div>
                      <span className="font-mono text-slate-400">{color.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Contact Details */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Verified Channel Handles</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800">
                      <span className="text-slate-500">WhatsApp:</span>
                      <span className="font-semibold text-emerald-400">+91 75879 39722</span>
                    </div>
                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800">
                      <span className="text-slate-500">Official Email:</span>
                      <span className="font-semibold text-cyan-400">gwaliorweblabs@gmail.com</span>
                    </div>
                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800">
                      <span className="text-slate-500">Website:</span>
                      <span className="font-semibold text-white">gwaliorweblabs.com</span>
                    </div>
                    <div className="flex justify-between text-slate-300 py-1">
                      <span className="text-slate-500">Headquarters:</span>
                      <span className="font-semibold text-slate-300">Gwalior, MP, India</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300">
                  These verified handles automatically populate footer tags and AI-generated post contact blocks.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAPTION TEMPLATES */}
      {activeTab === 'captions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {captionTemplates.map((cap) => (
            <div key={cap.id} className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {cap.category}
                  </span>
                  <span className="text-xs text-slate-500">Reusable Blueprint</span>
                </div>
                <h4 className="font-semibold text-white text-sm">{cap.title}</h4>
                <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 font-sans whitespace-pre-wrap">
                  {cap.text}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end">
                <button
                  onClick={() => copyToClipboard(cap.text, cap.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2 transition-all"
                >
                  {copiedCaptionId === cap.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Caption</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Add Asset to Media Vault</h3>
                <p className="text-xs text-slate-400 mt-0.5">Upload photography, promotional reels, or vectors</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Diwali Campaign Banner #1"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="image">Image (JPG, PNG, WebP)</option>
                    <option value="video">Video (MP4, MOV Reel)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Folder Destination</label>
                  <input
                    type="text"
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder="e.g., Campaign Assets"
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Media URL (CDN or Image Link)</label>
                <input
                  type="url"
                  placeholder="https://... (Leave blank to use sample high-res image)"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., marketing, festive, banner, reels"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-md shadow-violet-600/20"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
