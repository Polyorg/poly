import React from 'react';

/**
 * When enabled, patches React to notify about renders that could have been avoided
 *
 * https://github.com/welldone-software/why-did-you-render
 */
if (process.env.ENABLE_WDYR === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');

  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
