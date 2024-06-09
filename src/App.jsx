import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { bulletinData } from "./components/BulletinData";
import "react-datepicker/dist/react-datepicker.css";

function App() {

  const [startDate, setStartDate] = useState(Date.now());
  const [filterDate, setFilterDate] = useState(14);

  const subtractedDate = moment(startDate).subtract(filterDate, "days").format('YYYY-MM-DD')

  const onOptionChange = (event) => {
    setFilterDate(parseInt(event.target.value));
  }

  const filteredBulletinLeft = bulletinData
    .filter(validityDate => moment(validityDate.date).isSameOrAfter(subtractedDate))
    .filter(validityDate => moment(validityDate.date).isSameOrBefore(startDate))
    .map(item => {
      return ( 
        <div className="column" key={item.id}>
          <div className="right-column">
            {item.date}: {item.time}
          </div>
        </div>
      )
    })

    const filteredBulletinRight = bulletinData
    .filter(validityDate => moment(validityDate.date).isSameOrAfter(subtractedDate))
    .filter(validityDate => moment(validityDate.date).isSameOrBefore(startDate))
    .map(item => {
      return ( 
        <div className="column" key={item.id}>
          <div className="right-column">
            {item.id}: {item.title}
          </div>
        </div>
      )
    })

    const filteredBulletin = bulletinData
    .filter(validityDate => moment(validityDate.date).isSameOrAfter(subtractedDate))
    .filter(validityDate => moment(validityDate.date).isSameOrBefore(startDate))

  return (
    <>
      <h1>公告主旨產生器<span className="version">v.1.0</span></h1>
      
      <div className="datePicker">
      <DatePicker 
        selected={startDate} 
        showIcon
        onChange={(date) => setStartDate(date)} 
      />
      </div>

      <div className="filterDateSelector">
      <label>
          <input 
            type="radio" 
            name="selectDate" 
            value="7" 
            onChange={onOptionChange}
          />
          一週內
        </label>
        
        <label>
          <input 
            type="radio" 
            name="selectDate" 
            value="14" 
            defaultChecked
            onChange={onOptionChange}
          />
          兩週內
        </label>
        
        <label>
          <input 
            type="radio" 
            name="selectDate" 
            value="365" 
            onChange={onOptionChange}
          />
          一年內
        </label>

        <p><span className="redText">{subtractedDate}</span> ~ <span className="redText">{moment(startDate).format("YYYY-MM-DD")}</span> 之間的公告</p>
      </div>

      <hr />

      <div className="heading">
        <p className="date-heading">日期</p>
        <p className="time-heading">時間</p>
        <p>編號: 主旨</p>
      </div>
      
      <div className="column">
        <div>
          {filteredBulletinLeft}
        </div>
        <div>
          {filteredBulletinRight}
        </div>
        
      </div>
    
    </>
  )
}

export default App
