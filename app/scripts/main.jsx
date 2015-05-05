var React = require('react/addons');

module.exports = React.createClass({
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <PropertyTable />
                    </div>
                </div>
            </div>
        );
    }
});

var PropertyTable = React.createClass({
    getInitialState() {
        return { 
            seen: {},
            properties: [(<Property key={0} onChange={this.addProperty.bind(this, 0)} />)] 
        };
    },
    addProperty(id) {
        if (!this.state.seen[id]) {
            var newSeen = {};
            newSeen[id] = true;
            this.setState({ seen: newSeen });

            var key = this.state.properties.length;
            var newProperties = React.addons.update(this.state.properties, 
                { $push: [(<Property key={key} onChange={this.addProperty.bind(this, key)} />)] });
            this.setState({ properties: newProperties });
        }
    },
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center">Name</th>
                            <th className="text-center">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.properties}
                    </tbody>
                </table>
            </div>
        );
    }
});

var Property = React.createClass({
    render() {
        return (
            <tr>
                <td>
                    <input type="text" className="form-control" onChange={this.props.onChange} />
                </td>
                <td>
                    <select className="form-control">
                        <option>String</option>
                        <option>Number</option>
                    </select>
                </td>
            </tr>
        );
    }
});