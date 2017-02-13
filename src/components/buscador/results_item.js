import React, { PropTypes } from 'react';

const ResulstItem = ({ item }) => (
    <tr>
        <td>{ item.name }</td>
        <td>{  item.actor }</td>
        <td className="center">{ item.seasons.join(', ') }</td>
        <td className="center">{ item.alive ? 'Si' : 'No' }</td>
    </tr>
)

export default ResulstItem;