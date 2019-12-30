import React from 'react'
import styled from 'styled-components';
import SportingEvent from './SportingEvent'


export const H1 = styled.h1`
    font-family:'Play', sans-serif;
`;

function SportsNav ({selected, onUpdateSport}) {
    const sports = ['NBA', 'NFL', 'Premier League']
    return (
        <ul className='flex-center'>
            { sports.map((sport) => (
                <li key={sport}>
                    <button 
                        className='btn-clear nav-link'
                        style={sport === selected ? {color: 'rgb(187, 46, 31)'} : null}
                        onClick={() => onUpdateSport(sport)}>
                        {sport}
                    </button>
                </li>
            )) }
        </ul>
    )
}

export default class Sport extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedSport: 'NBA'
        }

        this.updateSport = this.updateSport.bind(this)
    }

    updateSport(selectedSport) {
        this.setState({
            selectedSport: selectedSport
        })
    }

    render() {
        const {selectedSport} = this.state 

        return (
            <React.Fragment>
                <div>
                    <H1>Snowshoe Analytics</H1>
                </div>
                <SportsNav selected={selectedSport} onUpdateSport={this.updateSport} />
                <SportingEvent selectedSport={this.state.selectedSport} />
            </React.Fragment>
        )
    }
}

// The key is to consider a betting opportunity valuable when the probability assessed 
// for an outcome is higher than the implied probability estimated by the bookmaker. 