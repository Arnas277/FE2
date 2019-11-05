import React from 'react';

class Menu extends React.Component {

    render() {
        const {
            data: {
                id,
                name,
            },
        } = this.props;

        return (
            <div className="genre" onClick={() => this.props.updateFilmus(id)}>
                {name}
            </div>
        );
    }
}

export default Menu;