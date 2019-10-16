import * as React from 'react';
import {List, Checkbox} from 'react-native-paper';

class AccordionList extends React.Component {
    state = {
        expanded: true
    };

    foodHouses = [
        {name: 'Fakta', location: 'FOEWP', food: [{name: 'apple', amount: 20}, {name: 'orange', amount: 20}]},
        {name: 'Netto', location: 'FOEWP', food: [{name: 'apple', amount: 20}]},
        {name: 'Netto', location: 'FOEWP', food: [{name: 'apple', amount: 20}]},
        {name: 'Netto', location: 'FOEWP', food: [{name: 'apple', amount: 20}, {name: 'Bananas', amount: 20}]},
        {name: 'Fakta', location: 'FOEWP', food: [{name: 'apple', amount: 20}, {name: 'Chickens', amount: 20}]}];

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
        });

    render() {
        return (
            <List.Section title="Food Houses">
                {this.foodHouses.map((foodHouse, index) => {
                    return (<List.Accordion
                        key={`${foodHouse.name}-${index}`}
                        title={foodHouse.name}
                        description={`Location: ${foodHouse.location}`}
                        left={props => <List.Icon {...props} icon="home"/>}>
                        {
                            foodHouse.food.map((food, index) =>
                                <List.Item
                                    key={`${food.name}-${index}`}
                                    title={food.name}
                                    description={`Amount : ${food.amount}`}
                                />)
                        }
                    </List.Accordion>)
                })}
            </List.Section>
        );
    }
}


export default function FoodList() {
    return (
        <AccordionList></AccordionList>
    )
}
