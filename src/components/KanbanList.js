import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, {useState} from 'react'
import Badge from '@material-ui/core/Badge';
import uuidv4 from 'uuid/v4'
import {saveCards} from '../lib/card-stoarage'
import KanbanCard from './KanbanCard'
import Timer from './Timer'
import './KanbanList.css'
import AddIcon from '@material-ui/icons/Add';

const KanbanList = ({kanbanList, leftKanbanList, rightKanbanList}) => {
    const [newTitle, setNewTitle] = useState('')
    const [newText, setNewText] = useState('')
    const cardsJsx = kanbanList.cards.map(({title, id, text, rate}) => (
        <KanbanCard
            id={id}
            key={id}
            title={title}
            text={text}
            rate={rate}
            kanbanList={kanbanList}
            leftKanbanList={leftKanbanList}
            rightKanbanList={rightKanbanList}
        />
    ))


    const calculateRate = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const handleClick = () => {
        const rate = Math.floor(calculateRate(1,5))
        const newCard = {id: uuidv4(), title: newTitle, text: newText, card_type: kanbanList.name, rate: rate}
        const newCards = [...kanbanList.cards, newCard]
        kanbanList.setCards(newCards)
        saveCards(kanbanList.name, newCards)
        setNewTitle('')
        setNewText('')
    }

    const handleChange = event => {
        setNewTitle(event.target.value)
    }

    const countOfItems = ()=>{
        return kanbanList.cards.length
    }

    return (
        <div className='kanban-list' style={{width: '100%'}}>
            <div style={{paddingBottom: 8, backgroundColor: '#0000'}}>
                <div style={{
                    backgroundColor: kanbanList.titleBackgroundColor,
                    height: 50,
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center',
                    boxShadow: '0px 4px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
                    zIndex: 1100
                }}>
                <div className="element">
                   <span className="badge">{countOfItems()}</span>
                </div>
                    {kanbanList.name}
                </div>
            </div>
            {cardsJsx}
            {kanbanList.name == 'Todo' &&
                <div style={{backgroundColor: 'white', paddingLeft: 8, paddingRight: 8}}>
                <TextField
                    label="Card Title"
                    required
                    id="standard-required"
                    placeholder="Enter Title"
                    margin="normal"
                    onChange={handleChange}
                    value={newTitle}
                    fullWidth
                    required
                />
                <TextField
                    label="Card Details"
                    placeholder="Enter Details"
                    margin="normal"
                    onChange={e => setNewText(e.target.value)}
                    value={newText}
                    fullWidth
                    required
                />

                <div style={{display: 'flex'}}>
                    <Button
                        style={{
                            marginLeft: 'auto',
                            marginRight: 8,
                            marginBottom: 8,
                            backgroundColor: kanbanList.titleBackgroundColor,
                            color: 'black'
                        }}
                        color="primary"
                        onClick={handleClick}
                        startIcon={<AddIcon />}
                        variant="contained"
                        size="medium"
                    >
                        New Task
                    </Button>
                </div>
                </div>
            }
        </div>
    )
}

export default KanbanList
