import React, { useContext, useState, useEffect } from "react"
import { GameContext } from './GameProvider'
import { EventContext } from './EventProvider'

export const EventForm = props => {
  const { getGames, games } = useContext(GameContext)
  const { createEvent, getEvents, events } = useContext(EventContext)
  const [currentEvent, setEvent] = useState({
    organizer: "",
    description: "",
    gameId: 1,
    date: "",
    time: ""
  })

  useEffect(() => {
      getGames();
  }, [])

  const handleControlledInputChange = (event) => {
    const newEventState = Object.assign({}, currentEvent)
    newEventState[event.target.name] = event.target.value
    setEvent(newEventState)
}

  return (
      <form className="gameForm">
        <fieldset>
          <div className="form-group">
            <label htmlFor="organizer">Organizer: </label>
            <input type="text" name="organizer" required autoFocus className="form-control"
                value={currentEvent.organizer}
                onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <label htmlFor="description">Description: </label>
              <input type="text" name="description" required autoFocus className="form-control"
                  value={currentEvent.description}
                  onChange={handleControlledInputChange}
              />
          </div>
        </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="gameId">Game: </label>
                  <select name="gameId" className="form-control"
                      value={currentEvent.gameId}
                      onChange={handleControlledInputChange}>
                      {
                          games.map(game => (
                              <option key={game.id} value={game.id}>{game.title}</option>
                          ))
                      }
                  </select>
              </div>
          </fieldset>
          <fieldset>
          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" required autoFocus className="form-control"
                value={currentEvent.date}
                onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
              <label htmlFor="time">Time: </label>
              <input type="time" name="time" required autoFocus className="form-control"
                  value={currentEvent.time}
                  onChange={handleControlledInputChange}
              />
          </div>
        </fieldset>
        <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: currentEvent.organizer,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gameId: parseInt(currentEvent.gameId)
                    }

                    createEvent(event).then(() => props.history.push({ pathname: "/events" }))
                }}
                className="btn btn-2 btn-sep icon-create">Create</button>
      </form>
  )
}
