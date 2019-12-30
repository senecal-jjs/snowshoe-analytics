import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Chevron from "./Chevron"
import Card from "./Card"
import {getAverageOdds, decimalOddsToProbability, timeConverter} from './Utils'

import "./css/accordion.css"
import "./css/card.css"
import "./css/table.css"


function Accordion({title, text, teams, sites, alpha, commenceTime}) {
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");
    const [setAverage, setAverageState] = useState(getAverageOdds(sites))

    useEffect(() => {
      setAverageState(getAverageOdds(sites))
    }, [sites]);
  
    const content = useRef(null);
  
    function toggleAccordion() {
      setActiveState(setActive === "" ? "active" : "");
      setHeightState(
        setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
      );
      setRotateState(
        setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
      );
    }
  
    return (
      <div className="accordion__section">
        <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
          <p className="accordion__title">{title} {<span class="dot"></span>} {timeConverter(commenceTime)}</p>
          <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
        </button>
        <div
          ref={content}
          style={{ maxHeight: `${setHeight}` }}
          className="accordion__content"
        >
          <div
            className="accordion__text"
          >
            <h2 align="center">Average odds from surveyed betting houses.</h2>
            <table>
                <tbody>
                    <tr>
                        <th>{"Team"}</th>
                        <th>{"Odds"}</th>
                        <th>{"Probability (Sum > 100% due to bookmaker edge)"}</th>
                    </tr>
                    <tr>
                        <th>{teams[0]}</th>
                        <th>{setAverage[0].toFixed(3)}</th>
                        <th>{decimalOddsToProbability(setAverage[0]).toFixed(3) + " %"}</th>
                    </tr>
                    <tr>
                        <th>{teams[1]}</th>
                        <th>{setAverage[1].toFixed(3)}</th>
                        <th>{decimalOddsToProbability(setAverage[1]).toFixed(3) + " %"}</th>
                    </tr>
                    {
                      setAverage[2] > 0 &&
                      <tr>
                        <th>{"Draw"}</th>
                        <th>{setAverage[2].toFixed(3)}</th>
                        <th>{decimalOddsToProbability(setAverage[2]).toFixed(3) + " %"}</th>
                      </tr>
                    }
                </tbody>
            </table>
            <h2 align="center">Odds for individual betting houses.</h2>
          </div>

          <div className="cards">
            {sites.map((site, key) => (
                <Card key={key} header={site.site_nice} site={site} teams={teams} consensus={setAverage} alpha={alpha} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Accordion;
  