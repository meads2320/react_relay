import React from "react";
import API from '../API'
import LinkStore from '../stores/LinkStore';

let _getAppState = () => {
    return{ links : LinkStore.getAll()};
}
export default class Main extends React.Component {
 
  constructor(props) {
      super(props);
      this.state = _getAppState();
      this.onChange = this.onChange.bind(this);
  }
  
   componentWillMount() {

  }
   componentWillUnmount() {
    LinkStore.removeListener('change', this.onChange);
  }
  componentDidMount() {
      API.fetchLinks();
      LinkStore.on('change', this.onChange);
  }
  onChange() { 
      console.log("4: In the browser");
      this.setState(_getAppState())
  }
  render() {

    let content = this.state.links.slice(0,this.props.limit).map(link => {
        return ( 
            <li key={link._id}><a target="_blank" href={link.url}>{link.title}</a></li>
        );
    });
    return (
        <div>
            <h3>Links</h3>
                <ul>
                    {content}
                </ul>
        </div>
    );
  }
}

Main.propTypes = {
    limit: React.PropTypes.number
}

Main.defaultProps = {
    limit: 1
}

