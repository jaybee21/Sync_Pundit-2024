// Imports.
import React, { useState, useEffect } from 'react';

// Custom imports.
import EnterCommandForm from './components/EnterCommandForm';
import CommandsList from './components/CommandsList';
import CommandResponse from './components/CommandResponse';
import IntroMessage from './components/IntroMessage';
import { useRef } from 'react';

const AllCommands = ({ allCommands }) =>{
    return (
        <div>
            { allCommands.map((command, index)=> <div> {command} </div> )}
        </div>
    )
}

const App = (props)=> {
    const [allCommands, setAllCommands] = useState([]);

    // auto scrolling when text goes out of view.
    // useRef and useEffect.
    const siteBodyRef = useRef();

    useEffect(()=>{
        if (siteBodyRef.current){
            siteBodyRef.current.scrollIntoView(
                {
                    behaviour: "smooth",
                    block: "end"
                }
            )
        }
    })

    return (
        <div className='container' ref={siteBodyRef}>
            <IntroMessage   />
            <AllCommands allCommands={allCommands}/>
            
            <EnterCommandForm callCommand={
                (newCommand)=>{
                    if (newCommand.trim() === 'commands')
                        setAllCommands([...allCommands, <CommandsList />]);
                    else 
                        setAllCommands([...allCommands, <CommandResponse userCommand={newCommand}/>])
                }
            }/>
        </div>
    )
}

export default App;