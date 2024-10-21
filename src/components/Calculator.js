import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import './Calculator.css'
import {MoonFill, SunFill} from 'react-bootstrap-icons'

function Calculator() {
    const [value, setValue] = useState('');
    const [isDarkMode, setDarkMode] = useState(false);
    const handleKeyPress = (e) => {
        if((e.key>='0' && e.key<='9') || ['+','-','*','/'].includes(e.key)){
            setValue((prev)=> prev+e.key);
        }else if(e.key ==='Enter'){
            e.preventDefault();
            handleEqual();
        }
        else if(e.key==='Backspace')
            setValue((prev)=> prev.slice(0,-1));
        else if(e.key==='Escape')
            setValue('');
    }
    const handleEqual = ()=>{
        try{
            if(value){
                const result=eval(value);
                setValue(String(result));
            }
        } catch {
            setValue('Error');
        }
    }
    const handleDarkMode = () => {
        setDarkMode((prev)=>!prev);
    }
    useEffect(()=> {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress); 
    }, [value]);
    useEffect(()=>{
        if(isDarkMode){
            document.body.classList.add('dark-mode');
        }else{
            document.body.classList.remove('dark-mode');
        }
    },[isDarkMode])
  return (
    <div className='container'style={{backgroundColor: isDarkMode? '#333':'#fff'}}>
        <div className="toggle">
            <Button onClick={handleDarkMode} style={{backgroundColor: isDarkMode? '#fff' : '#333'}} >
                {isDarkMode ? (
                    <MoonFill style={{fill: '#333'}} size={20} />
                ):(
                <SunFill style={{fill: '#fff'}} size={20} /> )}</Button>
        </div>
      <div className="box" style={{backgroundColor: isDarkMode? '#fff':'#333'}}>
        <div className="display">
            <input type="text" value={value} readOnly/>
        </div>
        <div>
            <input type="button" value={'AC'} onClick={e=>setValue('')}/>
            <input type="button" value={'DE'} onClick={e=>setValue(value.slice(0,-1))}/>
            <input type="button" value={'.'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'/'} onClick={e=>setValue(value+e.target.value)}/>
        </div>
        <div>
            <input type="button" value={'7'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'8'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'9'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'*'} onClick={e=>setValue(value+e.target.value)}/>
        </div>
        <div>
            <input type="button" value={'4'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'5'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'6'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'-'} onClick={e=>setValue(value+e.target.value)}/>
        </div>
        <div>
            <input type="button" value={'1'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'2'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'3'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'+'} onClick={e=>setValue(value+e.target.value)}/>
        </div>
        <div className='last-col'>
            <input type="button" value={'00'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'0'} onClick={e=>setValue(value+e.target.value)}/>
            <input type="button" value={'='} onClick={handleEqual}/>
        </div>
      </div>
    </div>
  )
}

export default Calculator
