import React, {useState} from 'react';
import style from "./calculator.module.css";

const Calculator = () => {

    const [counter, setCounter] = useState(0);
    const [result, setResult] = useState(0);
    const [styleFontSize, setStyleFontSize] = useState(60);

    const style2 = {
        height: '62px',
        width: '62px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: '#505050',
        flexDirection: 'column',
        fontSize: '26px',
        cursor: 'pointer',
        color: '#D4D4D2',
        fontFamily: 'Arial',
    }

    const style3 = {
        orange: {backgroundColor: "#FF9500"},
        white: {backgroundColor: "#D4D4D2"},
        black: {color: "black"}
    }

    const symbols = [
        {id: 10, btn: `AC`, style: {...style2, ...style3.white, ...style3.black}},
        {id: 11, btn: '%B1', style: {...style2, ...style3.white, ...style3.black}},
        {id: 12, btn: `%`, style: {...style2, ...style3.white, ...style3.black}},
        {id: 13, btn: '%F7', style: {...style2, ...style3.orange}},
        {id: 7, btn: 7, style: {...style2, fontWeight: 'bold',}},
        {id: 8, btn: 8, style: {...style2, fontWeight: 'bold',}},
        {id: 9, btn: 9, style: {...style2, fontWeight: 'bold',}},
        {id: 14, btn: '%D7', style: {...style2, ...style3.orange}},
        {id: 4, btn: 4, style: {...style2, fontWeight: 'bold',}},
        {id: 5, btn: 5, style: {...style2, fontWeight: 'bold',}},
        {id: 6, btn: 6, style: {...style2, fontWeight: 'bold',}},
        {id: 15, btn: `-`, style: {...style2, ...style3.orange}},
        {id: 1, btn: 1, style: {...style2, fontWeight: 'bold',}},
        {id: 2, btn: 2, style: {...style2, fontWeight: 'bold',}},
        {id: 3, btn: 3, style: {...style2, fontWeight: 'bold',}},
        {id: 16, btn: `+`, style: {...style2, ...style3.orange}},
        {
            id: 0,
            btn: 0,
            style: {
                ...style2,
                width: "124px",
                borderRadius: "25px",
                alignItems: 'flex-start',
                paddingLeft: '8%',
                fontWeight: 'bold',
            }
        },
        {id: 17, btn: `.`, style: {...style2}},
        {id: 18, btn: `=`, style: {...style2, ...style3.orange}}
    ]

    const fontSize = {
        fontSize: {fontSize: styleFontSize + "px"}
    }

    const getResult = (value) => {
        const lastSymbol = String(result).slice(-1);
        const firstNumber = Number(result.slice(0, result.length - 1));
        const counterNum = Number(counter);

        if (lastSymbol === "+" || lastSymbol === "-" || lastSymbol === "*" || lastSymbol === "/" || lastSymbol === "%") {
            setResult(result + counter + value);
        }

        switch (lastSymbol) {
            case '+': {
                setCounter(firstNumber + counterNum)
                break;
            }
            case '-': {
                setCounter(firstNumber - counterNum)
                break;
            }
            case '*': {
                setCounter(firstNumber * counterNum)
                break;
            }
            case '/': {
                setCounter(firstNumber / counterNum)
                break;
            }
            case '%': {
                setCounter((firstNumber * counterNum) / 100)
                break;
            }
        }
    }

    const handler = (value) => {
        const counterStr = String(counter);
        const canAddCounterNumber = !(counterStr.length > 7);

        if (counterStr.length >= 7) {
            setStyleFontSize(50)
        } else if (counterStr.length === 6) {
            setStyleFontSize(55)
        } else {
            setStyleFontSize(60)
        }

        if (canAddCounterNumber) {
            if (counterStr.includes('.')) {
                setCounter(counter + value)
            } else {
                setCounter(counter * 10 + value)
            }
        }

        switch (value) {
            case `AC`:
                setCounter(0);
                setResult(0);
                setStyleFontSize(60)
                break;
            case '%B1':
                setCounter(counter * (-1))
                break;
            case `%`:
                setResult(counter + `%`)
                setCounter(0)
                break;
            case '%F7':
                setResult(counter + `/`)
                setCounter(0)
                break;
            case '%D7':
                setResult(counter + `*`)
                setCounter(0)
                break;
            case `-`:
                setResult(counter + value)
                setCounter(0)
                break;
            case `+`:
                setResult(counter + value)
                setCounter(0)
                break;
            case `.`:
                if (canAddCounterNumber) {
                    if (!counterStr.includes(value)) {
                        setCounter(counter + value)
                    } else {
                        setCounter(counter)
                    }
                }
                break;
            case `=`:
                if (canAddCounterNumber) {
                    getResult(value);
                }
                break;
        }
    }

    return (
        <div className={style.backGroundCalc}>
            <div className={style.calculator}>
                <input type="text" className={style.counterStorage} value={result} disabled/>
                <input type="text" className={style.counter} style={{...fontSize.fontSize}} value={counter} disabled/>
                <div className={style.calcBtn}>
                    {
                        symbols.map(symbol => {
                            return <button key={symbol.id} className={style.buttons} style={{...symbol.style}}
                                           onClick={() => handler(symbol.btn)}>
                                {unescape(symbol.btn)}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Calculator;
