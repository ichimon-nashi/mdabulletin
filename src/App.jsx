import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { bulletinData } from "./components/BulletinData";
import "react-datepicker/dist/react-datepicker.css";

function App() {

  const [startDate, setStartDate] = useState(Date.now());
  const [filterDate, setFilterDate] = useState(14);
  const [textToCopy, setTextToCopy] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);
  const subtractedDate = moment(startDate).subtract(filterDate, "days").format('YYYY-MM-DD')

  // radio button selection
  const onOptionChange = (event) => {
    setFilterDate(parseInt(event.target.value));
  }

  const filteredBulletin = bulletinData
  .filter(criteria => moment(criteria.date).isSameOrAfter(subtractedDate))
  .filter(criteria => moment(criteria.date).isSameOrBefore(startDate));

  const bulletinTitle = filteredBulletin.map((item, index) => {
    return (
      <li key={`id${item.id}`}>{`2.${index+1}. ${item.id} : ${item.title}`}</li>
    )
  });

  const handleCopyButton = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    const copiedData = document.querySelector("#copyBulletinData").innerHTML
      .replaceAll(/(<p>|<\/p>|<\/li>)/g,"")
      .replaceAll(/(<li>)/g,"\r\n");
    console.log(copiedData);
    setTextToCopy(copiedData);
  };

  useEffect(() => {
    const copiedData = document.querySelector("#copyBulletinData").innerHTML
    .replaceAll(/(<p>|<\/p>|<\/li>)/g,"")
    .replaceAll(/(<li>)/g,"\r\n");
    setTextToCopy(copiedData);
  },[subtractedDate])

  return (
    <>
      <section className="topPortion">
        <div className="title-container">
          <h1 className="title">公告主旨產生器</h1>
          <small className="versionNo">v.1.2.1</small>
        </div>
        <div className="datePicker-container">
        <DatePicker 
          selected={startDate} 
          showIcon
          onChange={(date) => setStartDate(date)} 
        />
        </div>
        <div className="dateFilter-container">
          <label className="radioLabel">
            <input 
              type="radio" 
              name="selectDate" 
              value="7" 
              onChange={onOptionChange}
            />
            一週內
          </label>
          <label className="radioLabel">
            <input 
              type="radio" 
              name="selectDate" 
              value="14" 
              defaultChecked
              onChange={onOptionChange}
            />
            兩週內
          </label>
          <label className="radioLabel">
            <input 
              type="radio" 
              name="selectDate" 
              value="365" 
              onChange={onOptionChange}
            />
            一年內
          </label>

          <p className="dateRange"><span className="highlightedText">{subtractedDate}</span> ~ <span className="highlightedText">{moment(startDate).format("YYYY-MM-DD")}</span> 的公告</p>
          <small>⚠️自己確認公告發布時間vs任務報到時間⚠️</small>
        </div>
      </section>

      <hr />

      <section className="bottomPortion">
        <div className="leftColumn">
          <div className="date-container">
            <div className="dateHeading-container">
              <h2>日期</h2>
            </div>
            <div className="dateData-container">
              <p className="empty">!</p>
              {filteredBulletin.map(item => <li key={`date${Math.random()}`}>{item.date}</li>)}
            </div>
          </div>
          <div className="time-container">
            <div className="timeHeading-container">
              <h2>時間</h2>
            </div>
            <div className="timeData-container">
            <p className="empty">!</p>
              {filteredBulletin.map(item => <li key={`time${Math.random()}`}>{item.time}</li>)}
            </div>
          </div>
        </div>
        <div className="rightColumn">
          <div className="bulletin-container">
            <div className="bulletinTitle-container">
              <h2>公告編號: 主旨 
                <CopyToClipboard text={textToCopy} >
                  <button 
                    className={copyStatus ? "copied" : ""}
                    onClick={handleCopyButton}
                  >
                    {copyStatus ? "COPIED ✅" : "COPY  📋"}
                  </button>
                </CopyToClipboard>
              </h2>
            </div>
            <div id="copyBulletinData" className="bulletinData-container">
              <p>2.公告抽問合格，摘要如下：</p>
              {bulletinTitle}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
