import React, { Component } from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import './Global.css'
import WorldStats from './../../components/WorldStats/WorldStats';

 class Global extends Component {

    state = {

        result:{
            "TotalConfirmed":0,
            "TotalDeaths":0,
            "TotalRecovered":0,
            "ActiveCase":0
        }
    }

     async componentDidMount() {

         
         var globalData = await axios.get("https://api.covid19api.com/summary");
         //https://covidtracking.com/data
         //https://api.covid19api.com/summary

          let corona = globalData.data.Global 
          const recovered = parseInt(corona.TotalConfirmed*60/100); 
          this.setState({
              result: {
                "TotalConfirmed":corona.TotalConfirmed,
                "TotalDeaths":corona.TotalDeaths,
                // "TotalRecovered":corona.TotalRecovered,
                 
                "TotalRecovered": recovered,
                "ActiveCase":corona.TotalConfirmed-(recovered+corona.TotalDeaths)
              }
          })

    }

    render() {

        var Stats = Object.keys(this.state.result).map((key,index)=>{
           return <WorldStats 
                    key={index} 
                    about={key} 
                    total={<NumberFormat value={this.state.result[key]} thousandSeparator={true} displayType="text" />}/>
        })
        
        return (
            <div className="Global">
               <h1 className="heading">Covid-19 Tracker</h1>
               <p className="description">Let's Check Information About Covid-19</p>
               
                <div className="world-stats">
                    
                   {Stats}
                    
                </div>
            </div>
        )
    }
}

export default Global;