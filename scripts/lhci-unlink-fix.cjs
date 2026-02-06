const fs = require('fs');

const originalUnlinkSync = fs.unlinkSync;

fs.unlinkSync = function patchedUnlinkSync(targetPath, ...rest) {
  try {
    return originalUnlinkSync.call(fs, targetPath, ...rest);
  } catch (error) {
    const isLhciPath = typeof targetPath === 'string' && targetPath.includes('.lighthouseci/');
    const isFlagsFile =
      typeof targetPath === 'string' &&
      targetPath.includes('.lighthouseci/flags-') &&
      targetPath.endsWith('.json');
    // LHCI can race on cleanup and attempt to unlink files that were already removed.
    if (error && error.code === 'ENOENT' && isLhciPath) {
      return;
    }
    if (error && error.code === 'EPERM' && isFlagsFile) {
      return;
    }
    throw error;
  }
};
