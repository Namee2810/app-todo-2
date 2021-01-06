import React from 'react';
import "./style.scss";

const getDate = () => {
  const now = new Date();
  const result = {
    day: `THỨ ${now.getDay()+1}`,
    date: now.getDate().toString(),
    month: `THÁNG ${now.getMonth()+1}`,
    year: now.getFullYear().toString(),
  }
  return result;
}

function ShowDate(props) {
  const { day, date, month, year } = getDate()
  return (
    <div className="Date">
      <div className="d-flex">
        <div className="Date__date">{date}</div>
        <div className="pl-2" style={{margin: "auto 0"}}>
          <div className="Date__month">{month}</div>
          <div className="Date__year">{year}</div>
        </div>
        <div className="Date__day ml-auto">{day}</div>
      </div>
    </div>
  );
}

export default ShowDate;