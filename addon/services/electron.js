import Ember from 'ember';
import UiServiceMixin from 'torii/mixins/ui-service-mixin';
import ParseQueryString from 'torii/lib/parse-query-string';
const { BrowserWindow } = requireNode( 'electron' ).remote;
const { createServer }  = requireNode( 'http' );
const URL               = requireNode( 'url' );
const { Evented, RSVP, set, run } = Ember;


function parseMessage(url, keys){
  var parser = ParseQueryString.create({url: url, keys: keys});
  var data = parser.parse();
  return data;
}

export default Ember.Object.extend( Evented, UiServiceMixin, {


  'remote': null,


  'server': null,


  openRemote( url ) {
    const remote = this.remote = new BrowserWindow({
      'width': 400,
      'height': 600,
      'show': false,
    });

    remote.loadURL( url );
    remote.show();

    return remote;
  },


  closeRemote() {
    if( this.remote ) {
      this.remote.close();
    }
  },


  open( url, keys, options ) {
    const lastRemote = this.remote;
    const port       = 4200;

    return new RSVP.Promise( ( resolve, reject ) => {
      const server = this.server = createServer( ( req, res ) => {
        return res.end( 'Authenticated' );
      });

      server.listen( port, ( error ) => {
        if ( error ) {
          return console.log('something bad happened', error);
        }
        const remote = this.openRemote( url );

        remote.on(             'closed', reject         );
        remote.webContents.on( 'did-fail-load', reject  );
        remote.webContents.on( 'crashed',       reject  );
        remote.webContents.on( 'will-navigate', resolve );
        remote.webContents.on( 'did-navigate',  resolve );
      });
    })
    .then( event => {
      const remoteUrl = event.sender.getURL();
      const parsedUrl = URL.parse( remoteUrl );
      debugger;
    })
    .finally(() => {
      this.close();
    });
  },


  close() {
    if( this.remote ) {
      this.closeRemote();
      this.remote = null;
      this.trigger( 'didClose' );
    }

    if( this.server ) {
      this.server.close();
    }
  }


});
