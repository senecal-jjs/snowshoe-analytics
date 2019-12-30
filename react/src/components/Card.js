import React from 'react'
import PropTypes from 'prop-types'
import { decimalOddsToProbability } from './Utils'

import "./css/card.css"

const spanStyle = {
    color: 'rgb(187, 46, 31)'
};

function isFavorableBet(consensus, bookie, alpha) {
    return (bookie > (1 / (decimalOddsToProbability(consensus) / 100 - alpha)))
}

export default function Card ({ header, subheader, site, teams, consensus, alpha }) {
    const firstTeamFavorable = isFavorableBet(consensus[0], site.odds.h2h[0], alpha)
    const secondTeamFavorable = isFavorableBet(consensus[1], site.odds.h2h[1], alpha)

    return (
        <div className='card bg-light'>
            <h4 className='header-lg center-text'>
                {"Book Maker: " + header}
            </h4>
            {subheader && (
                <h4 className='center-text'>
                subheader}
                </h4>
            )}
                <h5>
                    <span>{teams[0] + " at "}</span>
                    <span>{site.odds.h2h[0]}</span>
                    { firstTeamFavorable ? <span style={spanStyle}>{" Favorable Bet"}</span> : null }
                </h5>
                <h5>
                    <span>{teams[1] + " at "}</span>
                    <span>{site.odds.h2h[1]}</span> 
                    { secondTeamFavorable ? <span style={spanStyle}>{" Favorable Bet"}</span> : null }   
                </h5>
        </div>
    )
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string
}