"use client"
import { useEffect, useState } from 'react';
import { User, MapPin, Award, TrendingUp, Search } from 'lucide-react';

interface Initiative {
  id: string;
  title: string;
  author_fullname: string;
  quarter_title: string;
  region_title: string;
  district_title: string;
  vote_count: number;
}

export default function Dashboard() {
  const [data, setData] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchInitiatives() {
      try {
        // Fetching list of initiatives for board 53
        const listRes = await fetch('https://openbudget.uz/api/v1/initiatives?board_id=53&limit=50');
        const listJson = await listRes.json();
        const initiatives = listJson.results || [];

        // Note: The list API might have stale or zero vote counts.
        // We will attempt to fetch real-time counts for each initiative to ensure ranking is correct.
        // In a production app, this should be done on the backend for performance.
        const initiativesWithVotes = await Promise.all(
          initiatives.map(async (init: any) => {
            try {
              const countRes = await fetch(`https://openbudget.uz/api/v2/info/initiative/count/${init.id}`);
              const countJson = await countRes.json();
              return {
                id: init.id,
                title: init.description || "İsimsiz İnisiyatif",
                author_fullname: init.author_fullname || "Anonim",
                quarter_title: init.quarter_title || "Belirtilmemiş",
                region_title: init.region_title,
                district_title: init.district_title,
                vote_count: countJson.count || 0
              };
            } catch {
              return {
                id: init.id,
                title: init.description || "İsimsiz İnisiyatif",
                author_fullname: init.author_fullname || "Anonim",
                quarter_title: init.quarter_title || "Belirtilmemiş",
                region_title: init.region_title,
                district_title: init.district_title,
                vote_count: init.vote_count || 0
              };
            }
          })
        );

        setData(initiativesWithVotes);
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInitiatives();
  }, []);

  const sortedData = [...data]
    .filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author_fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.vote_count - a.vote_count);

  if (loading) {
    return (
      <main className="dashboard-container loading-container">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>İnisiyatifler ve Oy Sayıları Analiz Ediliyor...</p>
      </main>
    );
  }

  const totalVotes = data.reduce((acc, curr) => acc + curr.vote_count, 0);
  const topInitiative = sortedData[0];

  return (
    <main className="dashboard-container">
      <div className="header">
        <h1>Bütçe İnisiyatifleri</h1>
        <p>Canlı Oy Sıralaması ve Takibi</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <Award size={20} color="#facc15" />
          <div className="stat-value">{data.length}</div>
          <div className="stat-label">Toplam</div>
        </div>
        <div className="stat-card">
          <TrendingUp size={20} color="#10b981" />
          <div className="stat-value">{totalVotes.toLocaleString()}</div>
          <div className="stat-label">Toplam Oy</div>
        </div>
        <div className="stat-card">
          <User size={20} color="#a78bfa" />
          <div className="stat-value">{topInitiative?.vote_count ? topInitiative.vote_count.toLocaleString() : 0}</div>
          <div className="stat-label">Lider Oy</div>
        </div>
      </div>

      <div className="search-box glass-panel">
        <Search size={18} color="var(--text-secondary)" />
        <input
          type="text"
          placeholder="İnisiyatif veya yazar adı ile ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="ranking-list">
        {sortedData.map((item, index) => {
          const rank = index + 1;
          const rankClass = rank <= 3 ? `rank-${rank}` : '';

          return (
            <div key={item.id} className={`ranking-card ${rankClass}`}>
              <div className="rank-badge">#{rank}</div>

              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <div className="card-meta">
                  <div className="meta-item">
                    <User size={12} />
                    <span>{item.author_fullname}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={12} />
                    <span>{item.district_title}, {item.quarter_title}</span>
                  </div>
                </div>
              </div>

              <div className="vote-badge">
                <span className="vote-label">OY</span>
                <span className="vote-number">{item.vote_count.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
