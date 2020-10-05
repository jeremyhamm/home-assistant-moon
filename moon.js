/**
 * Normalize moon phase number
 * 
 * @param {String} phase
 * 
 * @return {String}
 */
const normalizeMoonPhase = (phase) => {
    switch(phase) {
        case 0:
            return {
                id: 'new-moon',
                name: 'New Moon',
            };
        case 1:
            return {
                id: 'waxing-crescent-moon',
                name:'Waxing Crescent Moon',
            };
        case 2:
            return {
                id: 'first-quarter-moon',
                name: 'First Quarter Moon',
            };
        case 3:
            return {
                id: 'waxing-gibbous-moon',
                name: 'Waxing Gibbous Moon',
            };
        case 4:
            return {
                id: 'full-moon',
                name: 'Full Moon',
            };
        case 5:
            return {
                id: 'waning-gibbous-moon',
                name: 'Waning Gibbous Moon',
            };
        case 6:
            return {
                id: 'last-quarter-moon',
                name: 'Last Quarter Moon'
            };
        case 7:
            return {
                id: 'waning-crescent-moon',
                name:'Waning Crescent Moon'
            };
    }
}

/**
 * Get current moon phase
 * Thanks https://gist.github.com/endel/dfe6bb2fbe679781948c
 * 
 * @param {Number} year
 * @param {Number} month
 * @param {Number} day
 * 
 * @return {String}
 */
const getMoonPhase = (year, month, day) => {
    let c, e, jd, b = 0;
    if ( month < 3 ) {
        year--;
        month += 12;
    }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; //jd is total days elapsed
    jd /= 29.5305882; //divide by the moon cycle
    b = parseInt(jd); //int(jd) -> b, take integer part of jd
    jd -= b; //subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); //scale fraction from 0-8 and round
    if ( b >= 8 ) {
        b = 0; //0 and 8 are the same so turn 8 into 0
    }

    return normalizeMoonPhase(b);
}

/**
 * Phases of the moon custom lovelace UI card
 */
class MoonPhasesCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            // Get current moon phase
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const phase = getMoonPhase(year, month, day);
            
            console.log(`Current phase - ${phase.name} 🌙`);
            
            // Render card
            let card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.style.padding = '0 16px 16px';
            card.appendChild(this.content);
            this.appendChild(card);
            
            // Sun entity
            const entityId = this.config.entity;
            const state = hass.states[entityId];
            
            // Styles
            let style = document.createElement("style");
            style.textContent = `
                ha-card {
                    color: #FAFAFA;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    padding: 1em 0;
                    font-weight: bold;
                }
                .title, .date {
                    font-size: 1em;
                }
                .content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 1em;
                    font-weight: bold;
                }
                .img, .name {
                    padding: 0 1em;
                }
            `;
            card.appendChild(style);
            
            // Toggle background based on sun above/below horizon
            const backgroundColor = (state.state === 'above_horizon' ? '#87CEFA' : '#39006c');
            card.style['background-color'] = backgroundColor;
            
            // DOM
            this.content.innerHTML = `
                <div class="header">
                    <div class="title">CURRENT PHASE</div>
                    <div class="date">${month}/${day}/${year}</div>
                </div>
                <div class="content">
                    <img src="/local/moon-phases/images/${phase.id}.png" class="img">
                    <span class="name">${phase.name}</span>
                </div>
            `;
        }
    }

    setConfig(config) {
        this.config = config;
    }
}

customElements.define('moon-phases', MoonPhasesCard);
