import React, { useState } from "react";
import './App.css';
import { MetsMap } from './MetsMap';
import abs from './images/abs.jpg';
import running from './images/running.jpg';

const App = () => {
  const [mets, setMets] = useState<number>(MetsMap.crunch);
  const [time, setTime] = useState<number>(60);
  const [weight, setWeight] = useState<number>(60);
  const [calorie, setCalorie] = useState<number>(0);

  const onMetsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mets: number = Number(e.target.value);
    handleMetsInputChange(mets);
  }

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time: number = Number(e.target.valueAsNumber);
    handleTimeInputChange(time);
  }

  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight: number = Number(e.target.valueAsNumber);
    handleWeightInputChange(weight);
  }

  const handleMetsInputChange = (mets: number) => {
    setMets(mets);
    setCalorie(calculateCalorie(mets, time, weight));
  };

  const handleTimeInputChange = (time: number) => {
    setTime(time);
    setCalorie(calculateCalorie(mets, time, weight));
  };

  const handleWeightInputChange = (weight: number) => {
    setWeight(weight);
    setCalorie(calculateCalorie(mets, time, weight));
  };

  const calculateCalorie = (mets: number, time: number, weight: number): number => {
    const hour = time / 60;
    const calorie = Math.round(mets * hour * weight * 1.05);
    if (!calorie) {
      return 0;
    }
    return calorie;
  }

  return (
    <div className="App">
      <header className="header">
        <h2 className="title">筋トレカロリー計算アプリ</h2>
      </header>
      
      <main className="main">
        <div className="menu">
          <p className="item">筋トレの種目</p>
          <select className="menu-pull-down" value={mets} title="メニュー" onChange={onMetsChange}>
            <option value={MetsMap.crunch}>クランチ（腹筋）</option>
            <option value={MetsMap.pushUp}>腕立て伏せ</option>
            <option value={MetsMap.benchPress}>ベンチプレス</option>
            <option value={MetsMap.squat}>スクワット</option>
            <option value={MetsMap.armCurl}>アームカール</option>
            <option value={MetsMap.jogging}>ジョギング</option>
            <option value={MetsMap.crawl}>水泳（クロール）</option>
          </select>
        </div>
        <div className="time">
          <span className="item">時間</span>
          <input className="number-input" type="number" value={time} name="time" step="1" pattern=" [0-9] {1,3}" title="時間" onChange ={onTimeChange} />
          <span className="unit">分</span>
        </div>
        <div className="weight">
          <span className="item">体重</span>
          <input className="number-input" type="number" value={weight} name="weight" step="1" pattern=" [0-9] {1,3}" title="体重" onChange={onWeightChange} />
          <span className="unit">kg</span>
        </div>
        <div className="calorie">
          <span className="item">消費カロリーは</span>
          <p className="number-output">{calorie}</p>
          <span className="unit">kcal</span>
        </div>
        <img className="left-image" src={abs} alt='' />
        <img className="right-image" src={running} alt='' />
      </main>
      
    </div>
  );
}

export default App;