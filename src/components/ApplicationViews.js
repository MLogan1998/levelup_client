import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventList } from "./game/EventList.js"
import { EventProvider } from "./game/EventProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./game/EventForm"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            <GameProvider>
                <Route exact path="/" render={props => <GameList {...props} />} />
                <Route exact path="/games/new" render={props => <GameForm {...props} />} />
                <EventProvider>
                    <Route exact path="/events" render={props => <EventList {...props} />} />
                    <Route exact path="/events/new" render={props => <EventForm {...props} />} />
                </EventProvider>
            </GameProvider>
        </main>
    </>
}
