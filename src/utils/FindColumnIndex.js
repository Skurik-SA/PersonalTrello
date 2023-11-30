export const findColumnIndex = (fullData, source_task_id, type) => {
    let colIndex = {
        index: -1,
        id: '',
    }

    fullData.map((column, i) => column.content.map((el) => {
        if (el.id === source_task_id) {
            colIndex = {
                index: i,
                id: column.id
            }
        }
    }))

    if (type === 'id')
        return colIndex.id
    else if (type === 'index')
        return colIndex.index
}
