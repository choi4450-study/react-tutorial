class Codelab extends React.Component {
	render() {
		let text = '안녕하신가!';
		let style = {
			backgroundColor: 'yellow'
		}
		return (
			<div>
				<h1 style={style}>Hello {this.props.name}!</h1>
				<h2>{this.props.number}</h2>
				<div>{text}</div>
				<div>{this.props.children}</div>
			</div>
		)
	}
}

Codelab.propTypes = {
	name: React.PropTypes.string,
	number: React.PropTypes.number.isRequired
}

Codelab.defaultProps = {
	name: '최규민'
}

class App extends React.Component {
	render() {
		return (
			<Codelab name={this.props.name} number={this.props.number}>{this.props.children}</Codelab>
		);
	}
}

ReactDOM.render(
	<App number={1234}>디스 프롭 칠드런</App>,
	document.getElementById('wrapper')
);
