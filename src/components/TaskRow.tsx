import { Check, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { ACTION_PAST, speciesName, type Task } from '../lib/care'
import { navigate } from '../lib/router'
import { useStore } from '../lib/store'
import type { Plant } from '../lib/types'
import { DAY, relativeDay, startOfDay } from '../lib/util'
import { Avatar, Sheet } from './ui'

export function completeTask(task: Task, plant: Plant) {
  const { logCare, removeEvent, showToast } = useStore.getState()
  const eventId = logCare(plant.id, task.action)
  navigator.vibrate?.(12)
  showToast(`${ACTION_PAST[task.action]} · ${plant.nickname}`, () => removeEvent(plant.id, eventId))
}

export function dueText(task: Task) {
  if (task.inDays < 0) return `${-task.inDays} ${task.inDays === -1 ? 'day' : 'days'} overdue`
  return `Due ${relativeDay(task.dueAt)}`
}

export function TaskRow({ task, plant, showPlant = true }: { task: Task; plant: Plant; showPlant?: boolean }) {
  const [menu, setMenu] = useState(false)
  const snooze = useStore((s) => s.snooze)
  const showToast = useStore((s) => s.showToast)
  const doSnooze = (days: number) => {
    snooze(plant.id, task.action, startOfDay() + days * DAY)
    setMenu(false)
    showToast(`Snoozed ${days === 1 ? 'until tomorrow' : `for ${days} days`}`)
  }
  return (
    <div className={`task ${task.inDays < 0 ? 'overdue' : ''}`}>
      <button className="task-main" onClick={() => navigate(`/plant/${plant.id}`)}>
        {showPlant && <Avatar plant={plant} size="sm" />}
        <span className="task-text">
          <b>{showPlant ? plant.nickname : task.label}</b>
          <span>
            {showPlant ? `${task.label} · ` : ''}
            <em>{dueText(task)}</em>
          </span>
        </span>
      </button>
      <button className="icon-btn" aria-label="More options" onClick={() => setMenu(true)}>
        <MoreHorizontal />
      </button>
      <button className="task-done" aria-label={`Mark ${task.label} done for ${plant.nickname}`} onClick={() => (task.check ? setMenu(true) : completeTask(task, plant))}>
        <Check />
      </button>
      <Sheet open={menu} onClose={() => setMenu(false)} title={`${task.label} · ${plant.nickname}`}>
        <p className="muted">{speciesName(plant)} · {dueText(task)}</p>
        <div className="menu">
          <button
            onClick={() => {
              setMenu(false)
              completeTask(task, plant)
            }}
          >
            {task.check ? 'Wire removed' : 'Mark as done'}
          </button>
          {task.check ? (
            <button onClick={() => doSnooze(14)}>Still fine, check again in 2 weeks</button>
          ) : (
            <>
              <button onClick={() => doSnooze(1)}>Snooze until tomorrow</button>
              <button onClick={() => doSnooze(3)}>Snooze 3 days</button>
            </>
          )}
          <button onClick={() => doSnooze(7)}>Snooze a week</button>
        </div>
      </Sheet>
    </div>
  )
}
