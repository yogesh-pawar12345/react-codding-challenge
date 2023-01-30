import React, { useEffect, useState } from 'react';
import './App.css';
import MainModule from './modules/mainModule';

interface IMakeObject {
  make: string,
  percentage: number
}

interface IMakeArrObj {
  property: string,
  items: number | string,
  colorClass?: string,
  percentage?: string
}

interface IInfoObject {
  title: string,
  info: string
}
const App = (): JSX.Element => {

  const [csvArray, setCsvArray] = useState([]);
  const [makeObjectState, setMakeObjectState] = useState<IMakeObject[]>()
  const loadData = () => {
    fetch('./data.csv')
      .then(response => response.text())
      .then(responseText => {
        processCSV(responseText)
      })
  };


  const processCSV = (str: string, delim: string = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');
console.log("rows",rows)
    const newArray: any[] = rows.map(row => {
      const values:string[] = row.split(delim);
      console.log("values",values)
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {})
      return eachObject;
    })

    const cuttedArray = newArray
    const makeArray:any[] = cuttedArray.map(item => item.Make)
    const uniqueItems: string[] = [...new Set(cuttedArray.map(item => item.Make))];
    console.log("unique item",uniqueItems)
    const totalItems:number = makeArray.length
    const makeObject: IMakeObject[] = []
    uniqueItems.forEach((currEle: string) => {
      const numItems:string[] = makeArray.filter(ele => ele === currEle)
      makeObject.push({ make: currEle, percentage: Number(Math.round(numItems.length * 100 / totalItems)) })
    })

    makeObject.sort((a, b) => {
      return b.percentage - a.percentage;
    });

    const otherPercentage:number = makeObject.slice(3).reduce((accumulator, currentValue) => {
      return accumulator + currentValue.percentage
    }, 0)

    const arr:any[] = makeObject.slice(0, 2)
    arr.push({ make: 'Others', percentage: otherPercentage })
    setMakeObjectState(arr)

  }

  useEffect(() => {
    loadData()
  }, [])

  const makeInfoObject: IInfoObject = {
    title: "Make",
    info: "Company of the vehicle"
  }
  const modelInfoObject: IInfoObject = {
    title: "Model",
    info: "Car model"
  }
  const classInfoObject: IInfoObject = {
    title: "Vehicle class",
    info: "Class of vehicle depending on their utility, capacity and weight"
  }
  const makeArrObj: IMakeArrObj[] = [
    {
      property: 'Valid',
      items: 6788,
      colorClass: 'box bg-green',
      percentage: '100 %'
    },
    {
      property: 'Mismatched',
      items: 0,
      colorClass: 'box bg-orange',
      percentage: '0 %'
    },
    {
      property: 'Missing',
      items: 0,
      colorClass: 'box bg-red',
      percentage: '0'
    },
    {
      property: 'Unique',
      items: 67,
    },
    {
      property: 'Most Common',
      items: 'FORD',
      percentage: '9 %'
    }
  ]

  const mainArray = [
    {
      info: makeInfoObject,
      makeObjectState,
      makeArrObj
    },
    {
      info: modelInfoObject,
      makeObjectState,
      makeArrObj
    },
    {
      info: classInfoObject,
      makeObjectState,
      makeArrObj
    }
  ]
  return (
    <div className='main-div'>
      <MainModule mainArray={mainArray} />
    </ div>
  );
}

export default App;
