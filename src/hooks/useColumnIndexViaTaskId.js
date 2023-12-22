export const useColumnIndexViaTaskId = (data, taskId, type) => {
    let colIndex = {
        index: -1,
        id: '',
    }

    data.map((column, i) => column.content.map((el) => {
        if (el.id === taskId) {
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
    else if (type === 'index-neighbors')
    {
        const isAvailableLeftBorder = true
        const isAvailableRightBorder = true
        if (colIndex.index === data.length - 1) {
            return [colIndex.index, isAvailableLeftBorder, !isAvailableRightBorder]
        }
        else if (colIndex.index === 0) {
            return [colIndex.index, !isAvailableLeftBorder, isAvailableRightBorder]
        }
        else {
            return [colIndex.index, isAvailableLeftBorder, isAvailableRightBorder]
        }
    }
}