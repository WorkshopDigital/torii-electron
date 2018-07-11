import Ember from 'ember';
import layout from '../templates/components/x-google-oauth2-code';
const { Component, inject, get, set } = Ember;

export default Component.extend({


  layout,


  'torii': inject.service(),


  'accessCode': null,


  'error': null,


  'actions': {

    connect() {
      const component = this;
      const torii     = get( this, 'torii' );

      torii.open( 'google-oauth2-bearer-v2' )
      .then( auth => {
        debugger;
        // return set( this, 'accessCode', auth.authorizationCode );
      })
      .catch( console.error );
    }

  }
});
