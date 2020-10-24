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
            return  'New Moon';
        case 'waxing_crescent':
            return 'Waxing Crescent Moon';
        case 'first_quarter':
            return 'First Quarter Moon';
        case 'waxing_gibbous':
            return 'Waxing Gibbous Moon';
        case 'full_moon':
            return 'Full Moon';
        case 'waning_gibbous':
            return 'Waning Gibbous Moon';
        case 'last_quarter':
            return 'Last Quarter Moon';
        case 'waning_crescent':
            return 'Waning Crescent Moon';
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
                    <img src="/local/moon-phases/images/${phase}.png" class="img">
                    <span class="name">${phase}</span>
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
