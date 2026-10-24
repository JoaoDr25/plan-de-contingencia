const INTERACTIVE_CONTENT = 'button, .q-btn, .q-chip, .q-checkbox, .q-toggle, .marquee-cell__content'
const MARQUEE_SPEED_PX_PER_SECOND = 35

function getCellOverflow(cell) {
  const cellStyle = window.getComputedStyle(cell)
  const horizontalPadding =
    Number.parseFloat(cellStyle.paddingLeft) + Number.parseFloat(cellStyle.paddingRight)
  const contentWidth = cell.clientWidth - horizontalPadding
  const range = document.createRange()

  range.selectNodeContents(cell)

  const measuredTextWidth = range.getBoundingClientRect().width
  const scrollWidth = cell.scrollWidth - cell.clientWidth

  return Math.ceil(Math.max(scrollWidth, measuredTextWidth - contentWidth, 0))
}

export function useTableCellMarquee() {
  let activeCell = null
  let activeMarquee = null
  let activeMarqueeText = null

  function onCellHover(event) {
    const marquee = event.target.closest?.('.modal-marquee-cell__content')

    if (marquee) {
      if (marquee === activeMarquee) {
        return
      }

      resetActiveCell()

      const text = marquee.querySelector('.modal-marquee-cell__text')
      const overflow = text.scrollWidth - marquee.clientWidth

      if (overflow <= 0) {
        return
      }

      activeMarquee = marquee
      activeMarqueeText = text
      text.style.transitionDuration = `${Math.max(1, overflow / MARQUEE_SPEED_PX_PER_SECOND)}s`
      text.style.setProperty('--marquee-distance', `-${overflow}px`)
      text.classList.add('is-marquee')
      return
    }

    const cell = event.target.closest?.('tbody td')

    if (cell === activeCell) {
      return
    }

    resetActiveCell()

    if (!cell || cell.querySelector(INTERACTIVE_CONTENT)) {
      return
    }

    const overflow = getCellOverflow(cell)

    if (overflow <= 0) {
      return
    }

    activeCell = cell
    cell.style.transition = `text-indent ${Math.max(1, overflow / MARQUEE_SPEED_PX_PER_SECOND)}s linear`
    cell.style.textOverflow = 'clip'
    cell.style.textIndent = `-${overflow}px`
  }

  function resetActiveCell() {
    if (activeMarqueeText) {
      activeMarqueeText.classList.remove('is-marquee')
      activeMarqueeText.style.removeProperty('--marquee-distance')
      activeMarqueeText.style.transitionDuration = ''
      activeMarqueeText = null
      activeMarquee = null
    }

    if (!activeCell) {
      return
    }

    activeCell.style.transition = 'text-indent 0.3s ease-out'
    activeCell.style.textIndent = ''
    activeCell.style.textOverflow = ''
    activeCell = null
  }

  return { onCellHover, resetActiveCell }
}
