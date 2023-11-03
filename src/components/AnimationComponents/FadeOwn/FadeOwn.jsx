import { Transition } from 'react-transition-group';
import { useRef } from 'react';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

function FadeOwn( props) {

    const {
        // eslint-disable-next-line react/prop-types
        in: inProp,

    } = props

    const nodeRef = useRef(null);
    return (
        <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
            {state => (
                <div ref={nodeRef} style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {props.children}
                </div>
            )}
        </Transition>
    );
}

export default FadeOwn;
