import { defineComponent, h } from 'vue'

export const TableWithSelection = defineComponent({
  name: 'BaseTable',
  props: ['rows', 'loading', 'total', 'currentPage', 'totalPages'],
  setup(props, { slots }) {
    return () =>
      h('div', [
        ...props.rows.map((row) =>
          h('div', { key: row._id ?? row.numero }, [
            slots['body-cell-marcar']?.({ row }),
            slots['body-cell-opciones']?.({ row }),
          ]),
        ),
        slots['footer-left']?.(),
      ])
  },
})

export const CardWithBody = defineComponent({
  name: 'BaseDataCard',
  props: ['rows', 'title'],
  setup(props, { slots }) {
    return () => h('div', slots.body?.({ rows: props.rows, gridStyle: {} }))
  },
})
