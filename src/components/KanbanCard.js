import {Card} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { green, purple } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import React from 'react'
import './KanbanCard.css'
import Timer from './Timer'
import { Component, useRef } from "react";
import { createMuiTheme } from '@material-ui/core/styles';


const KanbanCard = ({id, title, text, rate, kanbanList, leftKanbanList, rightKanbanList}) => {
    const childRef = useRef();
    const moveLeft = () => {
        const existingCard = kanbanList.cards.find(card => card.id === id)
        const newCards = kanbanList.cards.filter(card => card.id !== id)
        kanbanList.setCards(newCards)
        leftKanbanList.setCards([...leftKanbanList.cards, existingCard])
    }
    const callChildMethod = () => {
        this.refs.timer.childMethod();
    }
    const moveRight = () => {
        const existingCard = kanbanList.cards.find(card => card.id === id)
        const newCards = kanbanList.cards.filter(card => card.id !== id)
        kanbanList.setCards(newCards)
        rightKanbanList.setCards([...rightKanbanList.cards, existingCard])
    }
    const removeCard = () => {
        const newCards = kanbanList.cards.filter(card => card.id !== id)
        kanbanList.setCards(newCards)
    }

    const conditionalButtonText = () => {
       switch(kanbanList.name) {
          case 'Todo':
            return { name: 'Start', color: 'primary' };
          case 'In Progress':
            return { name: 'Resolve', color: 'secondary' };
          default:
            return '';
        }
    }

    const taskButton = () => {
        const buttonValues = conditionalButtonText();
        let btn = <Button size="small" variant="contained" color={buttonValues.color} onClick={moveRight}>{buttonValues.name}</Button>

        return btn;
    }

    return (
        <Card className='card'>
            <CardHeader
                action={
                    <Typography onClick={removeCard} color="textSecondary">
                        <i className="material-icons" style={{textAlign: 'right', marginRight: 8, marginTop: 8}}>
                            x
                        </i>
                    </Typography>
                }
                title={
                    <Typography color="textSecondary" style={{marginLeft: 24}}>
                        {title}
                    </Typography>
                }
            />
            <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                <Typography variant="body2" component="p">
                    {text}
                </Typography>
            </CardContent>
            {kanbanList.name == 'Done' &&
            <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                <Typography variant="body2" component="p">
                    ${rate}
                </Typography>
            </CardContent>


            }
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs>
                        {rightKanbanList && taskButton()}
                    </Grid>
                    <Grid item xs={6}>
                    {kanbanList.name == 'In Progress' &&
                        <Timer/>
                    }
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default KanbanCard
