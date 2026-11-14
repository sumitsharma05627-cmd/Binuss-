import React, { useState } from 'react';
import { useSocialCommand } from '../../context/SocialCommandContext';
import { PLATFORM_REGISTRY, getPlatformIcon } from '../../utils/platformMeta';
import { SocialPlatformType } from '../../types';
import {
  TrendingUp,
  Download,
  Calendar,
  Share2,
  FileSpreadsheet,
  FileText,
  Filter,
  Eye,
  Heart,
  MessageCircle,
  Repeat,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const AnalyticsReportingView: React.FC = () => {
  const {
    activeClient,
    socialAccounts,
    posts,
    activeClientId,
    clientWorkspaces
  } = useSocialCommand();

  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d');
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const filteredAccounts = activeClientId === 'all'
    ? socialAccounts
    : socialAccounts.filter((a) => a.clientId === activeClientId);

  const filteredPosts = activeClientId === 'all'
    ? posts
    : posts.filter((p) => p.clientId === activeClientId);

  // Aggregated KPIs
  const totalAudience = filteredAccounts.reduce((acc, curr) => acc + curr.followersCount, 0);
  const totalImpressions = filteredPosts.reduce((acc, p) => acc + (p.metrics?.impressions || 0), 0);
  const totalReach = filteredPosts.reduce((acc, p) => acc + (p.metrics?.reach || 0), 0);
  const totalLikes = filteredPosts.reduce((acc, p) => acc + (p.metrics?.likes || 0), 0);
  const totalComments = filteredPosts.reduce((acc, p) => acc + (p.metrics?.comments || 0), 0);
  const totalShares = filteredPosts.reduce((acc, p) => acc + (p.metrics?.shares || 0), 0);
  const totalSaves = filteredPosts.reduce((acc, p) => acc + (p.metrics?.saves || 0), 0);
  const totalClicks = filteredPosts.reduce((acc, p) => acc + (p.metrics?.clicks || 0), 0);

  // Time Series Chart Data - strictly from real post records
  const engagementTrendData = filteredPosts.length > 0
    ? [
        {
          period: 'Current Period',
          reach: totalReach,
          impressions: totalImpressions,
          engagement: totalLikes + totalComments + totalShares,
          clicks: totalClicks
        }
      ]
    : [];

  // Channel Distribution - strictly from real user channels and posts
  const channelBreakdownData = filteredAccounts.map((acc) => ({
    platform: acc.platform.charAt(0).toUpperCase() + acc.platform.slice(1),
    reach: acc.followersCount || 0,
    interactions: filteredPosts
      .filter((p) => (p.platforms || []).includes(acc.platform))
      .reduce((sum, p) => sum + (p.metrics?.likes || 0) + (p.metrics?.comments || 0), 0)
  }));

  const calculatedAvgEngagement = totalImpressions > 0 
    ? (((totalLikes + totalComments + totalShares) / totalImpressions) * 100).toFixed(1) + '%'
    : totalReach > 0
      ? (((totalLikes + totalComments + totalShares) / totalReach) * 100).toFixed(1) + '%'
      : '0.0%';

  const calculatedCtr = totalImpressions > 0 
    ? ((totalClicks / totalImpressions) * 100).toFixed(1) + '%' 
    : '0.0%';

  // Export PDF Report using jsPDF
  const handleExportPdfReport = async () => {
    setIsExportingPdf(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const workspaceName = activeClient ? activeClient.name : 'All Workspaces (Agency Master)';

      // Header Brand
      doc.setFillColor(8, 13, 26);
      doc.rect(0, 0, 210, 42, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text('GWALIOR WEB LABS', 14, 18);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(52, 211, 153);
      doc.text('SOCIAL COMMAND CENTER // EXECUTIVE ANALYTICS REPORT', 14, 26);

      doc.setTextColor(203, 213, 225);
      doc.setFontSize(9);
      doc.text(`Client Workspace: ${workspaceName} | Period: ${dateRange.toUpperCase()}`, 14, 34);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 34);

      // Section: Executive Summary
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('1. Executive Performance Summary', 14, 52);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Audience Reach: ${totalReach.toLocaleString()}`, 14, 62);
      doc.text(`Total Verified Impressions: ${totalImpressions.toLocaleString()}`, 14, 70);
      doc.text(`Cumulative Audience Size: ${totalAudience.toLocaleString()} followers`, 14, 78);
      doc.text(`Total Post Engagements: ${(totalLikes + totalComments + totalShares).toLocaleString()}`, 14, 86);
      doc.text(`Direct Click-Throughs: ${totalClicks.toLocaleString()}`, 14, 94);

      // Section: Channel Distribution
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('2. Channel Distribution & Reach', 14, 110);

      let yPos = 120;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      channelBreakdownData.forEach((ch) => {
        doc.text(`• ${ch.platform}: ${ch.reach.toLocaleString()} reach | ${ch.interactions.toLocaleString()} interactions`, 18, yPos);
        yPos += 8;
      });

      // Section: Top Performing Assets
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('3. Top Performing Content Broadcasts', 14, yPos + 10);

      yPos += 20;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      filteredPosts.slice(0, 4).forEach((p, i) => {
        const title = p.title || p.caption.slice(0, 40);
        doc.text(`${i + 1}. [${p.status.toUpperCase()}] ${title}`, 18, yPos);
        if (p.metrics) {
          doc.text(`   Likes: ${p.metrics.likes} | Comments: ${p.metrics.comments} | Impressions: ${p.metrics.impressions}`, 18, yPos + 5);
        }
        yPos += 14;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Generated by Gwalior Web Labs Social Command Center • https://gwlweblab.com', 14, 285);

      doc.save(`GWL_Social_Report_${workspaceName.replace(/\s+/g, '_')}_${dateRange}.pdf`);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Export CSV Data
  const handleExportCsv = () => {
    const rows = [
      ['Post ID', 'Title', 'Platforms', 'Status', 'Likes', 'Comments', 'Shares', 'Impressions', 'Reach'],
      ...filteredPosts.map((p) => [
        p.id,
        `"${p.title || p.caption.slice(0, 30)}"`,
        `"${p.platforms.join(', ')}"`,
        p.status,
        p.metrics?.likes || 0,
        p.metrics?.comments || 0,
        p.metrics?.shares || 0,
        p.metrics?.impressions || 0,
        p.metrics?.reach || 0
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GWL_Social_Analytics_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#090f1f] border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              Performance Intelligence & Audits
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Granular Cross-Channel ROI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics & Executive Reporting
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Audit follower trajectories, engagement velocity, click-through rates, and export branded PDF presentations for client stakeholders.
          </p>
        </div>

        {/* Date Filters & One-Click PDF/CSV Exports */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            {(['7d', '30d', '90d', 'ytd'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  dateRange === r ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>CSV Export</span>
          </button>

          <button
            onClick={handleExportPdfReport}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Generating PDF...' : 'Download Branded PDF'}</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid (5 metrics cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase">Verified Impressions</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {totalImpressions.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            {filteredPosts.length > 0 ? `${filteredPosts.length} published broadcasts` : 'No broadcasts yet'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase">Total Reach</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {totalReach.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            {filteredAccounts.length > 0 ? `${filteredAccounts.length} connected channel${filteredAccounts.length === 1 ? '' : 's'}` : '0 channels connected'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase">Direct Link Clicks</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {totalClicks.toLocaleString()}
          </div>
          <div className="text-[10px] text-sky-600 dark:text-sky-400 mt-0.5">
            {calculatedCtr} CTR
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase">Total Saves / Bookmarks</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {totalSaves.toLocaleString()}
          </div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 mt-0.5">
            Verified saves
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase">Avg Engagement</div>
          <div className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            {calculatedAvgEngagement}
          </div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
            Live reaction rate
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Engagement & Reach Trajectory (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">Reach & Impression Trends</h3>
              <div className="text-xs text-slate-500 dark:text-slate-400">Progression across official channels</div>
            </div>
            {totalReach > 0 && (
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                {totalReach.toLocaleString()} total reach
              </span>
            )}
          </div>

          <div className="h-64 w-full">
            {engagementTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="impGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                  <XAxis dataKey="period" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--theme-surface, #ffffff)',
                      borderColor: '#cbd5e1',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#0f172a'
                    }}
                  />
                  <Area type="monotone" dataKey="impressions" name="Impressions" stroke="#10b981" fillOpacity={1} fill="url(#impGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="reach" name="Reach" stroke="#3b82f6" fillOpacity={1} fill="url(#reachGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-slate-400 mb-2 opacity-50" />
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">No performance data available yet</div>
                <p className="text-xs text-slate-500 max-w-sm mt-1">Connect your social accounts and publish content to start tracking live reach and impression curves.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Channel Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">Channel Efficiency Comparison</h3>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total Interactions per social network</div>
            </div>
          </div>

          <div className="h-64 w-full">
            {channelBreakdownData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelBreakdownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                  <XAxis dataKey="platform" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--theme-surface, #ffffff)',
                      borderColor: '#cbd5e1',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#0f172a'
                    }}
                  />
                  <Bar dataKey="interactions" name="Interactions" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <Share2 className="w-8 h-8 text-slate-400 mb-2 opacity-50" />
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">No channels connected yet</div>
                <p className="text-xs text-slate-500 max-w-xs mt-1">Connect Instagram, LinkedIn, YouTube, or other channels to compare platform performance.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Posts Ranking Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080d19] border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">Top Performing Content Leaderboard</h3>
            <div className="text-xs text-slate-500 dark:text-slate-400">Ranked by engagement velocity and reach</div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Live Leaderboard
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <tr>
                <th className="pb-3 font-semibold">Content</th>
                <th className="pb-3 font-semibold">Channels</th>
                <th className="pb-3 font-semibold">Format</th>
                <th className="pb-3 font-semibold">Impressions</th>
                <th className="pb-3 font-semibold">Likes</th>
                <th className="pb-3 font-semibold">Comments</th>
                <th className="pb-3 font-semibold">Saves</th>
                <th className="pb-3 font-semibold">Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 pr-4 max-w-xs truncate">
                      <div className="font-bold text-white truncate">{post.title || post.caption.slice(0, 35)}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{new Date(post.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1">
                        {post.platforms.map((p) => (
                          <span key={p} className="text-slate-400">
                            {getPlatformIcon(p, 'w-3 h-3')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-mono text-emerald-400 uppercase text-[10px]">
                      {post.mediaType}
                    </td>
                    <td className="py-3 pr-4 font-mono text-slate-200">
                      {post.metrics?.impressions ? post.metrics.impressions.toLocaleString() : '0'}
                    </td>
                    <td className="py-3 pr-4 font-mono text-slate-200">
                      {post.metrics?.likes || 0}
                    </td>
                    <td className="py-3 pr-4 font-mono text-slate-200">
                      {post.metrics?.comments || 0}
                    </td>
                    <td className="py-3 pr-4 font-mono text-slate-200">
                      {post.metrics?.saves || 0}
                    </td>
                    <td className="py-3 pr-4 font-mono text-emerald-400 font-bold">
                      {post.metrics?.clicks || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <FileSpreadsheet className="w-8 h-8 text-slate-400 mb-2 opacity-40" />
                      <span className="font-medium text-sm text-slate-700 dark:text-slate-300">No data available yet</span>
                      <span className="text-xs text-slate-500 mt-1 max-w-sm">
                        Posts published through Social Command Center will appear here with live engagement metrics.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
