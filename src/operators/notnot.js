import truthy from '../helpers/truthy';

import preapply_args from '../helpers/preapply_args';

export default preapply_args(a => {
  return truthy(a);
});
