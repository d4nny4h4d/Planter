import { ScanLine } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AiLookup, LibraryRow, PlantGrid, SearchField } from '../components/collection'
import { Empty, Screen } from '../components/ui'
import { PLANT_LIBRARY } from '../data/plants'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import { cap } from '../lib/util'

export function Plants() {
  const all = useStore((s) => s.plants)
  const plants = useMemo(() => all.filter((p) => p.kind === 'plant'), [all])
  const setDraft = useStore((s) => s.setDraft)
  const [q, setQ] = useState('')

  const query = q.trim().toLowerCase()
  const matches = useMemo(
    () =>
      PLANT_LIBRARY.filter(
        (p) => !query || [p.commonName, p.scientificName, ...p.otherNames].some((n) => n.toLowerCase().includes(query)),
      ),
    [query],
  )

  return (
    <Screen id="/plants" tab>
      <header className="page-head">
        <h1>Plants</h1>
        <button className="btn small primary" onClick={() => navigate('/scan?mode=plant')}>
          <ScanLine /> Scan
        </button>
      </header>

      {plants.length === 0 ? (
        <Empty emoji="🌿" title="No plants yet">
          Scan one with the camera, or add one from the library below.
        </Empty>
      ) : (
        <section className="group">
          <h2 className="group-title">
            My plants <span>{plants.length}</span>
          </h2>
          <PlantGrid plants={plants} />
        </section>
      )}

      <section className="group">
        <h2 className="group-title">Plant library</h2>
        <SearchField value={q} onChange={setQ} placeholder="Search any plant by name" />
        {matches.length > 0 && (
          <div className="card list">
            {matches.map((p) => (
              <LibraryRow
                key={p.id}
                emoji={p.emoji}
                title={p.commonName}
                subtitle={`${p.scientificName} · ${cap(p.placement === 'both' ? 'indoor or outdoor' : p.placement)}`}
                onClick={() => {
                  setDraft({ kind: 'plant', profile: p, emoji: p.emoji })
                  navigate('/result')
                }}
              />
            ))}
          </div>
        )}
        {query.length >= 3 && <AiLookup key={query} kind="plant" name={q.trim()} />}
      </section>
    </Screen>
  )
}
