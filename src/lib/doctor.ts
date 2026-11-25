import type { DoctorFindings } from './ai'
import { savePhoto } from './image'
import { useStore } from './store'
import type { DoctorReport, Plant } from './types'
import { uid } from './util'

export const SYMPTOMS = [
  'Yellow leaves',
  'Brown tips or edges',
  'Spots on leaves',
  'Wilting or drooping',
  'Leaves dropping',
  'White powder or fuzz',
  'Sticky residue',
  'Insects or webbing',
  'Holes or chewed leaves',
  'Soft or black stem',
  'Mould on soil',
  'No new growth',
]

/** Store a finished check-up with its photos and note it in the plant's journal. Returns the report id. */
export async function saveReport(found: DoctorFindings, input: { plant?: Plant; photos: string[]; symptoms: string[]; notes: string }) {
  const { identifiedAs, ...rest } = found
  const photoIds = await Promise.all(input.photos.map(savePhoto))
  const report: DoctorReport = {
    ...rest,
    id: uid(),
    at: Date.now(),
    plantId: input.plant?.id,
    plantName: input.plant?.nickname ?? identifiedAs,
    photoIds,
    symptoms: input.symptoms,
    notes: input.notes,
  }
  const { addReport, logCare } = useStore.getState()
  addReport(report)
  if (input.plant) logCare(input.plant.id, 'note', `Dr. Green: ${report.headline}. ${report.summary}`)
  return report.id
}
