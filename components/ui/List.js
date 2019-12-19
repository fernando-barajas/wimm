import React from 'react'
import { ListItem } from 'react-native-elements'

function List(props) {
  const { items, onTapItem } = props

  return items.map((item, i) => (
    <ListItem
      key={i}
      friction={90} //
      activeScale={0.95} //
      linearGradientProps={{
        colors: ["#FF9800", "#F44336"],
        start: [1, 0],
        end: [0.2, 0]
      }}
      leftAvatar={{ rounded: true, source: { uri: "" } }}
      title="Chris Jackson"
      titleStyle={{ color: "white", fontWeight: "bold" }}
      subtitleStyle={{ color: "white" }}
      subtitle="Vice Chairman"
      chevron={{ color: "white" }}
    />
  ));
}

export default List
