# Pathfinder Encounter Manager

The Pathfinder Encounter Manager is a tool intended to assist GMs manage skill checks, initiative rolls, HP tracking and effect tracking.

## Alpha

All current versions of PEM are alpha versions. As such, they are all unstable. Changes are likely to be incompatible with previous saves.

## Instructions

### Characters
This page is for managing characters and making skill checks. A JSON string with an array of character objects can be pasted into "Edit / export" in order to import characters. The characters can also be edited directly using the JSON representation in this text field.

### Monsters
The monsters here are use when creating new encounters. Use the "Edit / export" field to import, edit, or export a set of monsters.

### Encounters
This page is for managing encounters. When creating a new encounter, the system rolls initiative for all characters and monsters. Use the "misc" field to track effects like buffs and debuffs (future versions will automatically track remaining turns of effects). Use the "End turn" button to cycle through the participants in the encounter. Use the "Edit / export" field to import, edit, or export an encounter. The JSON representation of the encounter encodes the current turn order.

### Tools
This page is for auxilliary tools. Currently, the only tool here is a character JSON creator tool. In future versions, we intend to include tools for converting exported data to new formats.

### Creator
Andreas Nakkerud
