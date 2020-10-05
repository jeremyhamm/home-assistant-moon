# Moon Card 🌙
Custom card for displaying the current phase of the moon in [Home Assistant](https://www.home-assistant.io). This card uses the [Sun Entity](https://www.home-assistant.io/integrations/sun/) to determine the background color of the card.

---
## Installation

#### Step 1
Install moon-card by copying `moon.js` and `images` from this repo to `<config directory>/www/moon-phases` on your Home Assistant instance.

#### Step 2
Link rmv-card inside you ui-lovelace.yaml.

    resources:
    - url: /local/moon-phases/moon.js
      type: js

---
## Config
Name | Type | Default | Description
------------ | ------------- | ------------- | -------------
type | string | **Required** | `custom:moon-phases`
entity | string | **Required** | `sun.sun`

#### Example
    type: 'custom:moon-phases'
    entity: sun.sun

---
## Examples

#### When sun is above horizon
![Day example](/example/moon-day-example.png)

#### When sun is below horizon
![Night example](/example/moon-night-example.png)
