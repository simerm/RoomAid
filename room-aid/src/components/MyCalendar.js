import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import './Calendar.css';

import { Calendar, Whisper, Popover, Badge } from 'rsuite';

function getTodoList(date) {
  const day = date.getDate();

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const formattedDate = date.toISOString().split('T')[0];

  const filteredTasks = tasks.filter(task => task.dueDate === formattedDate);
  console.log(filteredTasks);

  return filteredTasks;
}

const MyCalendar = () => {
  function renderCell(date) {
    const list = getTodoList(date);
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.roomate}</b> - {item.task}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.roomate}</b> - {item.task}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return <Calendar bordered renderCell={renderCell} />;
};

export default MyCalendar;

ReactDOM.render(<MyCalendar />, document.getElementById('root'));