import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',

    displayText: 'Health',
  },

  {
    optionId: 'EDUCATION',

    displayText: 'Education',
  },

  {
    optionId: 'ENTERTAINMENT',

    displayText: 'Entertainment',
  },

  {
    optionId: 'SPORTS',

    displayText: 'Sports',
  },

  {
    optionId: 'TRAVEL',

    displayText: 'Travel',
  },

  {
    optionId: 'OTHERS',

    displayText: 'Others',
  },
]

class MyTask extends Component {
  state = {
    userInput: '',
    selectTag: tagsList.length > 0 ? tagsList[0].optionId : '',
    tasks: [],
    filterTask: '',
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {userInput, selectTag} = this.state

    if (userInput !== '' && selectTag !== '') {
      this.setState(prevState => ({
        tasks: [
          ...prevState.tasks,

          {id: uuidv4(), task: userInput, displayText: selectTag},
        ],

        userInput: '',

        selectTag: tagsList.length > 0 ? tagsList[0].optionId : '',
      }))
    }
  }

  onChangeOption = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickButton = displayId => {
    this.setState({filterTask: displayId})
  }

  render() {
    const {userInput, selectTag, tasks, filterTask} = this.state

    const filterData = filterTask
      ? tasks.filter(eachItem => eachItem.displayId === filterTask)
      : tasks

    return (
      <div className="bg-container">
        <div className="task-container">
          <h1 className="task-heading">Create a task!</h1>

          <form onSubmit={this.onSubmitForm}>
            <div className="input-field-container">
              <label htmlFor="labelInput" className="label">
                Task
              </label>

              <input
                id="labelInput"
                type="text"
                className="input"
                placeholder="Enter the task here"
                onChange={this.onChangeInput}
                value={userInput}
              />

              <label className="label" htmlFor="labelTag">
                Tags
              </label>

              <select
                id="labelTag"
                className="select"
                onChange={this.onChangeOption}
                value={selectTag}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-container">
              <button type="submit" className="button">
                Add Task
              </button>
            </div>
          </form>
        </div>

        <div className="tag-container">
          <h1 className="tag-name">Tags</h1>

          <div>
            <ul className="list-items">
              {tagsList.map(eachTag => (
                <li key={eachTag.optionId} className="list">
                  <button
                    type="button"
                    className="tag-button"
                    onClick={() => this.onClickButton(eachTag.displayId)}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <h1 className="tag-name">Tasks</h1>

          <ul>
            {filterData.length === 0 ? (
              <div className="no-task-container">
                <p className="no-task">No Tasks Added Yet</p>
              </div>
            ) : (
              filterData.map(task => (
                <li key={task.id} className="tasks-list-container">
                  <p className="heading">{task.task}</p>

                  <button type="button" className="tag-item-button">
                    {task.displayText}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default MyTask
