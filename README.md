# Home Assistant Moon 🌙

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Custom card for displaying the current phase of the moon in [Home Assistant](https://www.home-assistant.io). This card uses the [Sun Entity](https://www.home-assistant.io/integrations/sun/) to determine the background color of the card.

#### When sun is above horizon
![Day example](/example/moon-day-example.png)

#### When sun is below horizon
![Night example](/example/moon-night-example.png)

## Installation

#### Step 1
Enable the [moon integration](https://www.home-assistant.io/integrations/moon/) by adding the following to `configuration.yaml`:
    
    sensor:
    - platform: moon

#### Step 2
Install moon-card by copying `moon.js` and `images` from this repo to `<config directory>/www/moon-phases` on your Home Assistant instance.

#### Step 3
Link `moon-card` inside your ui-lovelace.yaml.

    resources:
    - url: /local/moon-phases/moon.js
      type: module

## Config
Name | Type | Default | Reference | Description
------------ | ------------- | ------------- | ------------- | -------------
type | string | **Required** | `custom:moon-phases` | Card reference
entity | string | **Required** | `sensor.moon` | Moon entity
entity | string | Optional | `sun.sun` | Include if you would like the card to use light mode while sun is up

#### Example
    type: 'custom:moon-phases'
    entities: 
    - sensor.moon
    - sun.sun
