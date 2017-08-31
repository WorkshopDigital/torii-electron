import Ember from 'ember';
import UiServiceMixin from 'torii/mixins/ui-service-mixin';
const { BrowserWindow } = requireNode( 'electron' ).remote;
const { Evented, RSVP, set } = Ember;


export default Ember.Object.extend( Evented, UiServiceMixin, {


  'remote': null,


  'currentUrl': null,


  openRemote( url, pendingRequestKey, options ) {
    const remote = new BrowserWindow({
      'width': 400,
      'height': 600,
      'show': false,
    });

    this.remote = remote;

    remote.loadURL( url );

    remote.once( 'ready-to-show', () => {
      return remote.show();
    });

    remote.webContents.on( 'will-navigate', ( event, url ) => {
      return set( this, 'currentUrl', url );
    });

  },


  closeRemote() {
    if( this.remote ) {
      this.remote.close();
    }
  },


  pollRemote() {


  },


  open( url, keys, options ) {
    const lastRemote = this.remote;

    return new RSVP.Promise( ( resolve, reject ) => {
      if( lastRemote ) {
        this.close();
      }

      this.openRemote( url, options );
      debugger;

    });
  },


  close() {
    if( this.remote ) {
      this.closeRemote();
      this.remote = null;
      this.trigger( 'didClose' );
    }
  }


});
