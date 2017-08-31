import ElectronService from 'torii-electron/services/electron';


export function initialize( application ) {
  application.register( 'torii-service:electron', ElectronService );
}

export default {
  name: 'torii-electron',
  initialize
};
