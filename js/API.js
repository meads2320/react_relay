import {get} from 'jquery';
import ServerActions from './actions/ServerActions'
let API = {
    fetchLinks() { 
        console.log('1: Fetching links from API');
        get('/data/links').done(resp => { 
            ServerActions.receiveLinks(resp);
        })
    }
}

export default API;