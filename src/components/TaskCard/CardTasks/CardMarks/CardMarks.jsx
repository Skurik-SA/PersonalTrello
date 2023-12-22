import styles from "./CardMarks.module.css"
import {Transition} from "react-transition-group";
import {useRef} from "react";

const CardMarks = (props) => {

    const {
        marks,
        markTextShow,
        setMarkTextShow
    } = props

    const nodeRef = useRef(null);
    const duration = 600;

    const defaultStyle = {
        transition: `max-width ${duration}ms ease-in-out, font-size  ${duration / 2}ms ease-in-out, min-height ${duration / 2}ms ease-in-out`,
        maxWidth: 240,
        fontSize: '0.8rem',
        minHeight: '20px',
    }

    const transitionStyles = {
        entering: {
            maxWidth: 36,
            fontSize: '0rem',
            minHeight: '8px'
        },
        entered:  {
            maxWidth: 36,
            fontSize: '0rem',
            minHeight: '8px'
        },
        exiting:  {
            maxWidth: 240,
            fontSize: '0.8rem',
            minHeight: '20px'
        },
        exited:  {
            maxWidth: 240,
            fontSize: '0.8rem',
            minHeight: '20px'
        },
    };

    return (
        <>
            {marks.length > 0
                ?
                <Transition  nodeRef={nodeRef} in={markTextShow} timeout={duration}>
                    {state => (
                        <div className={styles.taskMarksWrapper}>
                            {marks.map((mark, i) =>
                                <div
                                    key={i}
                                    className={styles.taskMark}
                                    style={{
                                        ...defaultStyle,
                                        ...transitionStyles[state],
                                        background: `${mark.color}`,
                                        color: `${mark.font_color}`
                                    }}
                                    onClick={() => {
                                        setMarkTextShow(!markTextShow)
                                    }}
                                    ref={nodeRef}
                                >
                                    <span className={styles.taskSpanContent} >
                                        {mark.mark_text}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </Transition>
                :
                <>
                </>
            }
        </>
    )
}

export default CardMarks;

