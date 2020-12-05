import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

import "./GameList.css"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    props.history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            <div className="game-container">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div><button className="btn btn-3"
                                    onClick={e => props.history.push(`/games/${game.id}/edit`)}
                                    >Edit Game</button></div>
                    </section>
                })
            }
            </div>
        </article>
    )
}
