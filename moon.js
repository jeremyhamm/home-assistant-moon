/**
 * Normalize moon phase number
 * 
 * @param {String} phase
 * 
 * @return {String}
 */
const getMoonPhase = (phase) => {
    switch(phase) {
        case 'new_moon':
            return  {
                name: 'New Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/new-moon.html'
            };
        case 'waxing_crescent':
            return {
                name: 'Waxing Crescent Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/waxing-crescent.html'
            };
        case 'first_quarter':
            return {
                name: 'First Quarter Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/first-quarter.html'
            };
        case 'waxing_gibbous':
            return {
                name: 'Waxing Gibbous Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/waxing-gibbous.html'
            };
        case 'full_moon':
            return {
                name: 'Full Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/full-moon.html'
            };
        case 'waning_gibbous':
            return {
                name: 'Waning Gibbous Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/waning-gibbous.html'
            };
        case 'last_quarter':
            return {
                name: 'Last Quarter Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/third-quarter.html'
            };
        case 'waning_crescent':
            return {
                name: 'Waning Crescent Moon',
                link: 'https://www.timeanddate.com/astronomy/moon/waning-crescent.html'
            };
    }
}

/**
 * Phases of the moon custom lovelace UI card
 */
class MoonPhasesCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            
            // Get current date
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            
            // Get current moon phase w/moon entity
            const entities = this.config.entities;
            const moonState = hass.states[entities[0]].state;
            const phase = getMoonPhase(moonState);
            const sunState = hass.states[entities[1]].state;
            
            console.log(`Current phase - ${phase} 🌙`);
            
            // Render card
            let card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.style.padding = '0 16px 16px';
            card.appendChild(this.content);
            this.appendChild(card);
            
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
                .content a {
                    color: #FAFAFA;
                    text-decoration: none;
                }
                .img, .name {
                    padding: 0 1em;
                }
            `;
            card.appendChild(style);
            
            // Toggle background based on sun above/below horizon
            const backgroundColor = (sunState === 'above_horizon' ? '#87CEFA' : '#39006c');
            card.style['background-color'] = backgroundColor;
            
            // DOM
            this.content.innerHTML = `
                <div class="header">
                    <div class="title">CURRENT PHASE</div>
                    <div class="date">${month}/${day}/${year}</div>
                </div>
                <div class="content">
                    <img src="/local/moon-phases/images/${phase.name}.png" class="img">
                    <span class="name"><a href="${phase.link}" target="_blank">${phase.name}</a></span>
                </div>
            `;
        }
    }
    
    setConfig(config) {
        if (!config.entities) {
            throw new Error('You need to define an entity');
        }
        if (!config.entities[0].includes('moon')) {
            throw new Error('Moon entity must be included first');
        }
        this.config = config;
    }
}

customElements.define('moon-phases', MoonPhasesCard);
