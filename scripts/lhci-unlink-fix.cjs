const fs = require('fs');

const originalUnlinkSync = fs.unlinkSync;

fs.unlinkSync = function patchedUnlinkSync(targetPath, ...rest) {
  try {
    return originalUnlinkSync.call(fs, targetPath, ...rest);
  } catch (error) {
    const isFlagsFile =
      typeof targetPath === 'string' &&
      targetPath.includes('.lighthouseci/flags-') &&
      targetPath.endsWith('.json');
    if (error && error.code === 'EPERM' && isFlagsFile) {
      return;
    }
    throw error;
  }
};
