const Table = ({orderList, topLevelAssy, desiredQty}) => {
    const tableDisplay = orderList.map(
        (obj) => {
            return (
                <tr>
                    <td>{obj.Child_pn}</td>
                    <td>{obj.RequiredQty}</td>
                    <td>{parseInt(obj.RequiredQty) * desiredQty}</td>
                </tr>
            )
        }
    )

    return (
        <div>
            <h3>Product {topLevelAssy}, Quantity {desiredQty}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Quantity Per</th>
                        <th>Order Quantity</th>
                    </tr>
                </thead>
                <tbody>{tableDisplay}</tbody>
            </table>
        </div>
    )
}

export default Table