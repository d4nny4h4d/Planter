import { LibraryRow } from '../components/collection'
import { StyleArt } from '../components/StyleArt'
import { Empty, Screen, TopBar } from '../components/ui'
import { BONSAI_LIBRARY, BONSAI_STYLES, BONSAI_TECHNIQUES } from '../data/bonsai'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'

export function StyleGuide({ id }: { id: string }) {
  const style = BONSAI_STYLES.find((s) => s.id === id)
  const setDraft = useStore((s) => s.setDraft)
  if (!style) return <Missing />
  const species = BONSAI_LIBRARY.filter((s) => s.styles.includes(id))
  return (
    <Screen id={`/style/${id}`}>
      <TopBar title="Style" />
      <div className="guide">
        <div className="guide-art">
          <StyleArt id={id} size={160} />
        </div>
        <h1>{style.name}</h1>
        <p className="eyebrow">{style.japanese}</p>
        <p>{style.description}</p>
        <div className="card pad">
          <h4>What to aim for</h4>
          <ul className="bullets">
            {style.keyPoints.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
        {species.length > 0 && (
          <>
            <h2 className="group-title">Species that suit it</h2>
            <div className="card list">
              {species.map((p) => (
                <LibraryRow
                  key={p.id}
                  emoji={p.emoji}
                  title={p.commonName}
                  subtitle={p.scientificName}
                  onClick={() => {
                    setDraft({ kind: 'bonsai', bonsai: p, emoji: p.emoji, suggestedStyle: id })
                    navigate('/result')
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Screen>
  )
}

export function TechniqueGuide({ id }: { id: string }) {
  const t = BONSAI_TECHNIQUES.find((x) => x.id === id)
  if (!t) return <Missing />
  return (
    <Screen id={`/technique/${id}`}>
      <TopBar title="Technique" />
      <div className="guide">
        <h1>{t.name}</h1>
        <p>{t.summary}</p>
        <div className="card pad">
          <h4>Step by step</h4>
          <ol className="steps">
            {t.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
        <div className="card pad">
          <h4>Common mistakes</h4>
          <ul className="bullets">
            {t.mistakes.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </Screen>
  )
}

function Missing() {
  return (
    <Screen id="missing">
      <TopBar />
      <Empty emoji="🍂" title="Nothing here" />
    </Screen>
  )
}
