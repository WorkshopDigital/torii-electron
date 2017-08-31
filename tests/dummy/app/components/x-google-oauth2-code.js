import Ember from 'ember';
import layout from '../templates/components/x-google-oauth2-code';
const { Component, inject, get } = Ember;

export default Component.extend({


  layout,


  'torii': inject.service(),


  'actions': {

    connect() {
      const torii = get( this, 'torii' );

      torii.open( 'google-oauth2' )
      .then( auth => {
        debugger;
      },
      error => {
        debugger;
      });
    }

  },


});
