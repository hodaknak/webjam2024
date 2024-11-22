'use client';

import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const URL = "http://localhost:3001";

const socket = io(URL);

const fetchGame = () => {
    let data = {
        code: "1234"
    }

    socket.emit("fetchGame", data);
}

export default function Host() {
    const [participants, setParticipants] = useState([])
    const [gameCode, setGameCode] = useState("")

    let getGameCode = () => {
        if (gameCode.length == 0) {
            return "In progress..."
        } else {
            return gameCode;
        }
    }

    useEffect(() => {
        socket.on("fetchGame", (msg) => {
            console.log(msg)
            console.log("fetched")
            setParticipants(msg.participants);
        });

        socket.on("createGame", (msg) => {
            setGameCode(msg.code);
            socket.emit("fetchGame", {});
        });

        socket.emit("createGame", {});

        return () => {
            socket.off("createGame"); // Needed to clean up
            socket.off("fetchGame");
        };
    }, []);

    const getParticipants = () => {
        // Get a list of all the participants in the current game
        // TODO: get all rooms
        let res = participants;
        return res;
    }

    const getRooms = () => {
        // Should be like [{"roomname": "A", "users": ["user 1", "user 2"]}, {"roomname": "B", "users": ["user 3"]}]
        //let res = [{"roomname": "A", "users": ["user 1", "user 2"]}, {"roomname": "B", "users": ["user 3"]}];
        let res = [{"roomname": "A", "users": ["user 1", "user 2"]}, {"roomname": "B", "users": ["user 3"]}, {"roomname": "B", "users": ["user 3"]}, {"roomname": "B", "users": ["user 3"]}, {"roomname": "B", "users": ["user 3"]}, {"roomname": "B", "users": ["user 3"]}, {"roomname": "B", "users": ["user 3"]}];
        console.log("got rooms: " + res)
        return res;
    }

    const hostAddRoom = () => {
        // TODO: connect to socket and attempt
        // TODO: update/fetch afterwards
    }

    const hostRemoveRoom = () => {
        // TODO: connect to socket and attempt
        // TODO: update/fetch afterwards
    }

    const hostShuffleParticipants = () => {
        // TODO: connect to socket and attempt
        // TODO: update/fetch afterwards
    }

    return (
        <div className="w-full text-center">
            <div className="roundbox">
                <div>Game code: <span className="codespan">{getGameCode()}</span></div>
                <div>
                    <ul>
                        {getParticipants().map((item, index) => (
                            <span style={{"margin": "10px"}} key={index}> {item} </span>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text-xl mt-20">
                You are the host! Give the above game code to your participants so they can join.
                <br/>Don't reload this page.
            </p>
            <br/>
            <button onClick={hostAddRoom}>+ Add a room</button>
            <button onClick={hostRemoveRoom}>- Remove a room</button>
            <br/>
            <button onClick={hostShuffleParticipants}>Shuffle/distribute participants</button>
            <p className="text-xl mt-20">
                Rooms:
            </p>
            <div style={{"display": "flex", "flexWrap": "wrap"}}>
                {getRooms().map((item, index) => (
                    <div className="roombox" key={index}>
                        <span style={{"fontWeight": "bold"}}>Room {item.roomname}</span>
                        <br/>
                        <ul>
                            {item.users.map((user, i2) => (
                                <span key={i2}>{user}<br/></span>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            {/* TODO: List of participants */}
            <p className="m-40">
                Welcome to the game!
            </p>
        </div>
    );
}

/*function MessageBox() {
    const [fieldText, setFieldText] = useState("");

    const sendMessage = () => {
        console.log(fieldText);
        socket.emit("msg", fieldText);
        setFieldText("")
    }

    return (
        <div className="roundbox">
            <input
            className="messagebox border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            type="text"
            value={fieldText}
            onChange={(e) => setFieldText(e.target.value)}
        />
            <button onClick={sendMessage}>send</button>
        </div>
    )
}*/
