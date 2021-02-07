import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import React, {Fragment, useState} from 'react'
import 'typeface-roboto'
import uuidv4 from 'uuid/v4'
import KanbanList from './KanbanList'
import {saveCards} from '../lib/card-stoarage.js'

const HomeContainer = props => {

  const loadCards = (name) => {
        const defaultCards = [
            {id: uuidv4(), title: 'An amazing feature', text: 'This feature is super amazing because of reasons.'},
            {id: uuidv4(), title: 'Very important stuff', text: 'This feature is super amazing because of reasons.'}
        ]
        const json = localStorage.getItem(name) || JSON.stringify({cards: defaultCards})
        return JSON.parse(json).cards
    }

    const useCards = listName => {
        const [cards, setCardsPlain] = useState(loadCards(listName))
        const setCards = newCards => {
            setCardsPlain(newCards)
            saveCards(listName, newCards)
        }
        return [cards, setCards]
    }

    const useKanbanList = (name, titleBackgroundColor) => {
        const [cards, setCards] = useCards(name)

        return {
            name,
            titleBackgroundColor,
            cards,
            setCards
        }
    }

    const kanbanLists = [
         useKanbanList('Todo', '#ffff'),
         useKanbanList('In Progress', "#ffff"),
         useKanbanList('Done', "#ffff")
    ]

    const kanbanListsJsx = kanbanLists.map((kanbanList, i) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <KanbanList
                kanbanList={kanbanList}
                leftKanbanList={i >= 1 ? kanbanLists[i - 1] : undefined}
                rightKanbanList={i < kanbanLists.length - 1 ? kanbanLists[i + 1] : undefined}
            />
        </Grid>
    ))

  return (
    <main className="home">
      <Fragment>
            <div className='kanban'>
                <Grid container spacing={3}>
                    {kanbanListsJsx}
                </Grid>
            </div>
        </Fragment>
    </main>
  );
}

HomeContainer.contextTypes = {
  store: PropTypes.object
};

export default HomeContainer;
