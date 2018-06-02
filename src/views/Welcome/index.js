/*

Note that this file is linted on its own, it does not break eslint - but
it does report an eslint error because it tries to find `webpack.config.js`
in the wrong directory.

*/

import Thing from './Thing' // doesn't exist

export default Thing

// Replace the above with this to get it working:
// import Welcome from './Welcome'

// export default Welcome
