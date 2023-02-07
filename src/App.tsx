import React, { useState } from "react";
import './App.css';
import { MetsMap } from './MetsMap';

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
    <div>
      <div className="App">
        <div className="menu">
        <span>筋トレの種目</span>
        <select value={mets} title="メニュー" onChange={onMetsChange}>
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
          <span>時間</span>
          <input type="number" value={time} step="1" pattern=" [0-9] {1,3}" title="時間" onChange ={onTimeChange} />分
        </div>
        <div className="weight">
          <span>体重</span>
          <input type="number" value={weight} name="weight" step="1" pattern=" [0-9] {1,3}" title="体重" onChange={onWeightChange} />kg
        </div>
        <div className="calorie">
          <span>消費カロリーは</span>
          {calorie}kcal
        </div>
      </div>
    </div>
  );
}

export default App;