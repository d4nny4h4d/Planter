import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BonsaiSheet, CareSheet } from '../components/CareSheet'
import { Chip, Screen, Segmented, TopBar } from '../components/ui'
import { BONSAI_STYLES } from '../data/bonsai'
import { savePhoto } from '../lib/image'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import { cap } from '../lib/util'

export function Result() {
  const draft = useStore((s) => s.draft)
  const addPlant = useStore((s) => s.addPlant)
  const showToast = useStore((s) => s.showToast)
  const species = draft?.profile ?? draft?.bonsai
  const defaultWhere = draft?.profile ? (draft.profile.placement === 'indoor' ? 'indoor' : 'outdoor') : draft?.bonsai?.indoorSuitable ? 'indoor' : 'outdoor'
  const [where, setWhere] = useState<'indoor' | 'outdoor'>(defaultWhere)
  const [nickname, setNickname] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!draft) navigate('/', { replace: true })
  }, [draft])
  if (!draft || !species) return null

  const add = async () => {
    setSaving(true)
    try {
      const photoId = draft.photo ? await savePhoto(draft.photo) : undefined
      const id = addPlant({
        kind: draft.kind,
        nickname: nickname.trim() || species.commonName,
        profile: draft.profile,
        bonsai: draft.bonsai,
        emoji: draft.emoji || (draft.kind === 'bonsai' ? '🌳' : '🪴'),
        where,
        photoId,
        style: draft.suggestedStyle,
      })
      showToast(`${species.commonName} added`)
      navigate(`/plant/${id}`, { replace: true })
    } catch {
      setSaving(false)
      showToast('Could not save. Storage may be full.')
    }
  }

  const style = BONSAI_STYLES.find((s) => s.id === draft.suggestedStyle)

  return (
    <>
      <Screen id="/result" className="has-cta">
        <TopBar title={draft.photo ? 'Scan result' : draft.kind === 'bonsai' ? 'Species' : 'Plant'} />
        {draft.photo ? (
          <img className="result-photo" src={draft.photo} alt="" />
        ) : (
          <div className="result-emoji">{draft.emoji}</div>
        )}
        <div className="result-head">
          <h1>{species.commonName}</h1>
          <p className="sci">{species.scientificName}</p>
          <div className="chips">
            {draft.confidence && (
              <Chip tone={draft.confidence === 'high' ? 'good' : draft.confidence === 'medium' ? 'warn' : 'bad'}>{cap(draft.confidence)} confidence</Chip>
            )}
            <Chip>{cap(species.difficulty)} care</Chip>
            {draft.bonsai && <Chip>{cap(draft.bonsai.category)}</Chip>}
            {draft.profile && <Chip>{draft.profile.family}</Chip>}
            {style && <Chip>{style.name}</Chip>}
          </div>
          <p>{species.description}</p>
          {draft.reasoning && <p className="muted small">{draft.reasoning}</p>}
          {draft.alternatives && draft.alternatives.length > 0 && draft.confidence !== 'high' && (
            <p className="muted small">
              Could also be: {draft.alternatives.map((a) => `${a.commonName} (${a.scientificName})`).join(', ')}.
            </p>
          )}
        </div>

        <div className="card pad form">
          <label>
            <span>Nickname</span>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={species.commonName} maxLength={40} />
          </label>
          <div>
            <span className="label">Where does it live?</span>
            <Segmented
              value={where}
              onChange={setWhere}
              options={[
                { value: 'outdoor', label: 'Outdoors' },
                { value: 'indoor', label: 'Indoors' },
              ]}
            />
          </div>
        </div>

        {draft.profile && <CareSheet profile={draft.profile} where={where} />}
        {draft.bonsai && <BonsaiSheet profile={draft.bonsai} where={where} />}
      </Screen>
      <div className="cta-bar">
        <button className="btn primary block" disabled={saving} onClick={add}>
          <Plus /> {draft.kind === 'bonsai' ? 'Add to my trees' : 'Add to my plants'}
        </button>
      </div>
    </>
  )
}
