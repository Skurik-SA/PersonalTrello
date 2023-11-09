import styles from "./BoardTitleInput.module.css"

const BoardTitleInput = (props) => {

    const {
        input,
        setInput
    } = props

    return (
        <input id={"board-title-input"}

               value={input}

               maxLength={127}

               className={styles.boardTitleInput}

               placeholder={"Введите название доски"}

               onChange={(e) => {
                   setInput(e.target.value)
                   document.getElementById("board-title-input").style.width = (e.target.value.length + 5) * 9 + 'px'
               }}
               onBlur={(e) => {
                   e.target.setSelectionRange(0, 0)
                   if (input.length <= 0) {
                       document.getElementById("board-title-input").style.minWidth = '200px'
                   }
                   else {
                       document.getElementById("board-title-input").style.minWidth = 'unset'
                   }
               }}
               onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                       document.getElementById("board-title-input").blur()
                   }
               }}
        />
    )
}

export default BoardTitleInput;