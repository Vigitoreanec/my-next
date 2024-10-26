import { Children, Component, memo, PureComponent, useEffect, useState } from "react";

export function EffectsStand() {
    const
        [checked, setChecked] = useState(true),
        [childProps, setChildProps] = useState(55),
        [value, setValue] = useState('-value-');
    return <fieldset>
        <legend>Perent</legend>
        <input value={value} onInput={event => setValue(event.target.value)} />
        <button onClick={() => setChildProps(prev => 1 + prev)}>{childProps}</button>
        <br />
        <input type="checkbox"
            checked={checked}
            onChange={() => setChecked(prev => !prev)} />
        {/* {visible ? <ChildClassStyle /> : ''} */}
        {checked && <ChildClassStyle prop1={childProps} />}
        {checked && <ChildFunctionalStyle prop1={childProps} />}
    </fieldset>;
}

class ChildClassStyle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { state1: 100 };
        console.debug('constructor');
    }
    render() {
        console.debug('render', this.state.state1, this.props.prop1);
        return <fieldset className="ChildClass">
            <legend>Child ClassStyle</legend>
            Props: {this.props.prop1}
            <br />
            State: <input type='number'
                onChange={event => this.setState({
                    state1: +event.target.value
                })}
                value={this.state.state1} />
            ({this.state.state1})
        </fieldset>
    }
    componentDidMount() {
        console.debug('componentDidMount');
    }
    componentDidUpdate() {
        console.debug('componentDidUpdate');
    }
    componentWillUnmount() {
        console.debug('componentWillUnmount');
    }
}

// function ChildFunctionalStyle({ prop1 }) {
const ChildFunctionalStyle = memo(function ({ prop1 }) {
    const
        [state1, setState1] = useState(99);
    console.debug('render', state1, prop1);
    useEffect(() => console.debug('1) MOunt + Update'), [state1, prop1])
    useEffect(() => console.debug('2) Mount '), [])
    useEffect(() => console.debug('3) MOunt + state1'), [state1])
    useEffect(() => console.debug('4) MOunt + prop1'), [prop1])
    useEffect(() => () => console.debug('5) Unmount'), [])
    return <fieldset className="ChildClass">
        <legend>Child FunctionalStyle</legend>
        Props: {prop1}
        <br />
        State = <input type='number'
            onInput={event => setState1(+event.target.value)}
            value={state1} />
        ({state1})
    </fieldset>
})