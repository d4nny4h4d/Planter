import { ChevronRight, ScanLine } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AiLookup, LibraryRow, PlantGrid, SearchField } from '../components/collection'
import { StyleArt } from '../components/StyleArt'
import { Empty, Screen, Segmented } from '../components/ui'
import { BONSAI_LIBRARY, BONSAI_STYLES, BONSAI_TECHNIQUES } from '../data/bonsai'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import { cap } from '../lib/util'

type View = 'trees' | 'species' | 'guides'

export function Bonsai({ view: raw }: { view: string | null }) {
  const view: View = raw === 'species' || raw === 'guides' ? raw : 'trees'
  const all = useStore((s) => s.plants)
  const trees = useMemo(() => all.filter((p) => p.kind === 'bonsai'), [all])
  const setDraft = useStore((s) => s.setDraft)
  const [q, setQ] = useState('')

  const query = q.trim().toLowerCase()
  const matches = useMemo(
    () => BONSAI_LIBRARY.filter((p) => !query || [p.commonName, p.scientificName].some((n) => n.toLowerCase().includes(query))),
    [query],
  )

  return (
    <Screen id="/bonsai" tab>
      <header className="page-head">
        <h1>Bonsai</h1>
        <button className="btn small primary" onClick={() => navigate('/scan?mode=bonsai')}>
          <ScanLine /> Scan
        </button>
      </header>

      <Segmented<View>
        value={view}
        onChange={(v) => navigate(v === 'trees' ? '/bonsai' : `/bonsai?view=${v}`, { replace: true })}
        options={[
          { value: 'trees', label: 'My trees' },
          { value: 'species', label: 'Species' },
          { value: 'guides', label: 'Guides' },
        ]}
      />

      <div className="view" key={view}>
        {view === 'trees' &&
          (trees.length === 0 ? (
            <Empty
              emoji="🌳"
              title="No trees yet"
              action={
                <button className="btn" onClick={() => navigate('/bonsai?view=species', { replace: true })}>
                  Choose a species
                </button>
              }
            >
              Scan a tree to identify its species, or pick one from the species list. Each tree gets its own watering, feeding, wiring and repotting schedule.
            </Empty>
          ) : (
            <PlantGrid plants={trees} />
          ))}

        {view === 'species' && (
          <>
            <SearchField value={q} onChange={setQ} placeholder="Search any species by name" />
            {matches.length > 0 && (
              <div className="card list">
                {matches.map((p) => (
                  <LibraryRow
                    key={p.id}
                    emoji={p.emoji}
                    title={p.commonName}
                    subtitle={`${p.scientificName} · ${cap(p.category)} · ${cap(p.difficulty)}`}
                    onClick={() => {
                      setDraft({ kind: 'bonsai', bonsai: p, emoji: p.emoji })
                      navigate('/result')
                    }}
                  />
                ))}
              </div>
            )}
            {query.length >= 3 && <AiLookup key={query} kind="bonsai" name={q.trim()} />}
          </>
        )}

        {view === 'guides' && (
          <>
            <h2 className="group-title">Techniques</h2>
            <div className="card list">
              {BONSAI_TECHNIQUES.map((t) => (
                <button key={t.id} className="row" onClick={() => navigate(`/technique/${t.id}`)}>
                  <span className="row-text">
                    <b>{t.name}</b>
                    <span className="muted small clamp">{t.summary}</span>
                  </span>
                  <ChevronRight className="row-chev" />
                </button>
              ))}
            </div>
            <h2 className="group-title">Styles</h2>
            <div className="style-grid">
              {BONSAI_STYLES.map((s) => (
                <button key={s.id} className="style-card" onClick={() => navigate(`/style/${s.id}`)}>
                  <StyleArt id={s.id} />
                  <b>{s.name}</b>
                  <span className="muted small">{s.japanese}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Screen>
  )
}
