import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

import "./GameForm.css"


export const GameForm = props => {
    const { createGame, getGameTypes, gameTypes, getGameById, editGame} = useContext(GameContext)

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 1,
        title: "",
        maker: "",
        gameTypeId: 1
    })


    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if ("gameId" in props.match.params) {
            getGameById(props.match.params.gameId).then(game => {
              setCurrentGame({
                skillLevel: game.skill_level,
                numberOfPlayers: game.number_of_players,
                title: game.title,
                maker: game.maker,
                gameTypeId: game.gametype.id
                })
            })
        }
    }, [props.match.params.gameId])


    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
          {
            ("gameId" in props.match.params)
            ?<h2 className="gameForm__title">Edit {currentGame.title}</h2>
            :<h2 className="gameForm__title">Register New Game</h2>
          }
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
              < select
                onChange={handleControlledInputChange}
                className="browser-default custom-select" 
                name="gameTypeId" >
                {
                  gameTypes.map((gametypes) => <option key={gametypes.id} value={gametypes.id}>{gametypes.label}</option>)
                }
              </select >
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label htmlFor="skillLevel">Skill Level: </label>
                  < select
                    onChange={handleControlledInputChange}
                    className="browser-default custom-select" 
                    name="skillLevel">
                      <option selected key={currentGame.skillLevel} value={currentGame.skillLevel}>{currentGame.skillLevel}</option>
                      <option key={1} value={1}>1</option>
                      <option key={2} value={2}>2</option>
                      <option key={3} value={3}>3</option>
                      <option key={4} value={4}>4</option>
                      <option key={5} value={5}>5</option>
                  </select >
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label htmlFor="numberOfPlayers">Number of Players: </label>
                  < select
                    onChange={handleControlledInputChange}
                    className="browser-default custom-select" 
                    name="numberOfPlayers">
                      <option selected key={currentGame.numberOfPlayers} value={currentGame.numberOfPlayers}>{currentGame.numberOfPlayers}</option>
                      <option key={1} value={1}>1</option>
                      <option key={2} value={2}>2</option>
                      <option key={3} value={3}>3</option>
                      <option key={4} value={4}>4</option>
                      <option key={5} value={5}>5</option>
                  </select >
              </div>
            </fieldset>
            {
              ("gameId" in props.match.params)
                  ?            <button 
                  onClick={evt => {
                      // Prevent form from being submitted
                      evt.preventDefault()
  
                      const game = {
                          id: props.match.params.gameId,
                          maker: currentGame.maker,
                          title: currentGame.title,
                          numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                          skillLevel: parseInt(currentGame.skillLevel),
                          gameTypeId: parseInt(currentGame.gameTypeId)
                      }
  
                      editGame(game).then(() => props.history.push({ pathname: "/" }))
                  }}
                  className="btn btn-2 btn-sep icon-create">Edit</button>
                  : <button type="submit"
                  onClick={evt => {
                      // Prevent form from being submitted
                      evt.preventDefault()
  
                      const game = {
                          maker: currentGame.maker,
                          title: currentGame.title,
                          numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                          skillLevel: parseInt(currentGame.skillLevel),
                          gameTypeId: parseInt(currentGame.gameTypeId)
                      }
  
                      createGame(game).then(() => props.history.push({ pathname: "/" }))
                  }}
                  className="btn btn-2 btn-sep icon-create">Create</button>


            }
          </form>
    )
}
