import { useState } from "react";
import ago from 's-ago';

// function epochToDate(epochSinceMidnight) {
//   let today = Date.now();
//   let todayAt00InMillis = new Date(today.getFullYear(), today.getMonth()+1, today.getDay()+1).getMilliseconds();

//   return new Date(todayAt00InMillis + epochSinceMidnight);
// }

// function getFormattedDate(date) {
//   const day = date.getDay()+1;
//   const month = date.getMonth()+1;
//   const year = date.getFullYear();

//   return  day + '/' + month + '/' + year;
// }

export default function CurrentSchedule() {
  const [pumpSchedule] = useState({
    startsOn: {
      minLevel: 600
    },
    endsOn: {
      maxLevel: 1500
    },
    lastUpdatedOn: new Date(1636494845000)
  });

  return (
  <div>
    <h3>Water pump schedule</h3>
    <p className='fw-normal'>This page shows the current schedule of your water pumping system.</p>
    <div className="row">
      <div className="col-8">
        <div className='card mb-3 top-m-5'>
          <div className='row g-0'>
              <div className='col-md-4 bg-secondary'>
                  <div className='img-fluid rounded-start d-flex align-items-center justify-content-center h-100'>
                      <i className='bi bi-calendar2-date-fill' style={{fontSize: '07rem', color: 'cornflowerblue'}}></i>
                  </div>
              </div>
              <div className='col-md-8'>
                  <div className='card-body'>
                      <h5 className='card-title'>Pump timings</h5>
                      Current schedule of your water pump is as follows:
                      <p></p>
                      <h6>Turns on</h6>
                      <p className='card-text'>Whenever water level drops below&nbsp;
                        <span className='fw-bold'>{pumpSchedule.startsOn.minLevel}</span> liters.</p>
                      <h6>Turns off</h6>
                      <p className='card-text'>Whenever water level reaches&nbsp;
                        <span className='fw-bold'>{pumpSchedule.endsOn.maxLevel}</span> liters.</p>
                      <p className='card-text'>
                        <small className='text-muted'>Updated {ago(pumpSchedule.lastUpdatedOn)}</small>
                      </p>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='d-flex col-8 justify-content-end gx-0'>
          <div><button className="btn btn-primary bg-lt">Change schedule</button></div>
        </div>
      </div>
    </div>
  </div>
  )
}