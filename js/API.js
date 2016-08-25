import {get, post} from 'jquery';
import ServerActions from './actions/ServerActions';
let API = {
    fetchLinks() { 
        console.log('1: Fetching links from API using GraphQL');
        // get('/data/links').done(resp => { 
        //     ServerActions.receiveLinks(resp);
        // })
        post('/graphql',
        { query : `query{ links{ _id, title, url } }`
        }).done(resp => { 
            ServerActions.receiveLinks(resp.data.links);
        })
    }
}

export default API;