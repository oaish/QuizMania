"use client";
import React, {useRef, useState} from 'react';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Checkbox} from 'primereact/checkbox';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {RadioButton} from 'primereact/radiobutton';
import {InputTextarea} from "primereact/inputtextarea";
import './admin.css'

const Page = () => {
    const toast = useRef(null);

    const show = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail});
    };

    const [radioValue, setRadioValue] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState({
        a: '',
        b: '',
        c: '',
        d: ''
    });
    const [tf, setTF] = useState(false);

    const [sub, setSub] = useState(null);
    const subjects = [
        {name: 'ETI', code: 'eti'},
        {name: 'MAN', code: 'man'},
    ];

    const [unit, setUnit] = useState(null);
    const units = [
        {name: 'I', code: 'I'},
        {name: 'II', code: 'II'},
        {name: 'III', code: 'II'},
        {name: 'IV', code: 'IV'},
        {name: 'V', code: 'V'},
        {name: 'VI', code: 'VI'},
    ];

    function handleSubmit() {
        if (question === '') {
            show('error', 'Error', 'Please enter a question');
            return;
        }

        if (answer === '') {
            show('error', 'Error', 'Please enter an answer');
            return;
        }

        if (sub === null) {
            show('error', 'Error', 'Please select a subject');
            return;
        }

        if (unit === null) {
            show('error', 'Error', 'Please select a unit');
            return;
        }
        if (options.a === '' || options.b === '' || options.c === '' || options.d === '') {
            show('error', 'Error', 'Please enter all options');
            return;
        }

        let opt = []
        if (tf) {
            opt = ["True", "False"]
        } else {
            opt = [options.a, options.b, options.c, options.d]
        }

        const data = {
            question,
            answer,
            opt,
            subject: sub.name,
            unit: unit.name,
        }

        console.log(data)
        console.log("ANSWER", answer)
    }

    function handleOptions(value) {
        setRadioValue(value)
        if (value === 'oA') {
            setAnswer(options.a)
        } else if (value === 'oB') {
            setAnswer(options.b)
        } else if (value === 'oC') {
            setAnswer(options.c)
        } else if (value === 'oD') {
            setAnswer(options.d)
        } else if (tf) {
            setAnswer(value)
        }
    }

    function handleTF(tf) {
        setTF(tf)
        setAnswer('')
    }

    return (
        <div className="question-card">
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <Checkbox checked={tf} onChange={(e) => handleTF(!tf)}/>
                </span>
                <InputText placeholder="Enter Question" className="pl-3" value={question}
                           onChange={(e) => setQuestion(e.target.value)}/>
            </div>
            {
                tf ? <>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="true" value="true" checked={radioValue === 'true'}
                                             onChange={(e) => handleOptions(e.value)}/>
                            </span>
                            <InputText value="True" className="pl-3" readOnly={true}/>
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="false" value="false" checked={radioValue === 'false'}
                                             onChange={(e) => handleOptions(e.value)}/>
                            </span>
                            <InputText value="False" className="pl-3" readOnly={true}/>
                        </div>
                    </> :
                    <>
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="oA" value="oA" checked={radioValue === 'oA'}
                                             onChange={(e) => handleOptions(e.value)}/>
                            </span>
                            <InputText placeholder="Enter Option A" className="pl-3"
                                       value={options.a} onChange={e => setOptions({...options, a: e.target.value})}
                            />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="oB" value="oB" checked={radioValue === 'oB'}
                                             onChange={(e) => handleOptions(e.value)}/>
                            </span>
                            <InputText placeholder="Enter Option B" className="pl-3"
                                       value={options.b} onChange={e => setOptions({...options, b: e.target.value})}
                            />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="oC" value="oC" checked={radioValue === 'oC'}
                                             onChange={(e) => handleOptions(e.value)}/>
                            </span>
                            <InputText placeholder="Enter Option C" className="pl-3"
                                       value={options.c} onChange={e => setOptions({...options, c: e.target.value})}
                            />
                        </div>

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <RadioButton name="oD" value="oD" checked={radioValue === 'oD'}
                                             onChange={(e) => handleOptions(e.value)}/>
                            </span>
                            <InputText placeholder="Enter Option D" className="pl-3"
                                       value={options.d} onChange={e => setOptions({...options, d: e.target.value})}
                            />
                        </div>
                    </>
            }
            <div className="flex gap-10">
                <Dropdown value={sub} onChange={(e) => setSub(e.value)} options={subjects}
                          optionLabel="name"
                          placeholder="Select a Subject" className="w-full md:w-14rem"/>
                <Dropdown value={unit} onChange={(e) => setUnit(e.value)} options={units}
                          optionLabel="name"
                          placeholder="Select a Subject" className="w-full md:w-14rem"/>
            </div>
            <Button className="bg-warning p-3 text-black" label="Submit" onClick={handleSubmit}/>
            <Toast ref={toast}/>
        </div>
    )
}
export default Page
