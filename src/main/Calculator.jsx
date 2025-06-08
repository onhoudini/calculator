import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculador extends Component {
    state = {...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.removeDigit = this.removeDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            {/* Usar o try  catch pois sem ele pode gerar problemas. Testar mais
                possibilidades e ver se seria necessário um if ou switch aqui.
                */}
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if(isNaN(values[0]) || isFinite(values[0])){
                    this.clearMemory()
                    return
                }
            } catch(e){
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            {/* 
                0. mudar o estado
                1. receber os valores do índice 0, os resultados da operação armazenado no display
                2. se a operação for equals ela vira nula, se não usa a operação atual
                3. se não for um igual/equals ele limpa o display, se foi então ele não limpa
                4. passa os values pro estado
            */}
            this.setState({
                displayValue: values[0], 
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay : !equals,
                values
            })
        }
    }

    addDigit(n){
        console.log(n)
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' :this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n!== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
        
    }

    removeDigit(){
        const newValue = this.state.displayValue.slice(0, -1);
        this.setState({displayValue: newValue === "" ? "0" : newValue, clearDisplay:false})
    }


    render() {
        return (
            <div className="calculator">
                {/* First column w */}
                <Display value={this.state.displayValue}/>

                {/* Second column w */}
                <Button label="AC" click={this.clearMemory} quadruple/>
                <Button label="x" click={this.removeDigit} delete/>
                
                {/* Third column*/}
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="-" click={this.setOperation} operation/>
                
                {/* Fourth column */}
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="/" click={this.setOperation} operation/>
                
                
                {/* Fifth column */}
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                

                {/* Sixth column  */}
                
                <Button label="=" click={this.setOperation} equals/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                
                
                
            </div>
        );
    }
}