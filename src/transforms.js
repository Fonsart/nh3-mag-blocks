const { createBlock } = wp.blocks;

export const toVideo = transformBlock('video');
export const toPhoto = transformBlock('photo');
export const toAudio = transformBlock('audio');

export function fromVideoTo(block) {
  return transformBlock('video', block);
}

export function fromAudioTo(block) {
  return transformBlock('audio', block);
}

export function fromPhotoTo(block) {
  return transformBlock('photo', block);
}

/**
 * Generates a transform object using the given trigger and create blocks.
 * The resulting block can thus be used either for "from" or "to" transformations.
 * @param {string} trigger The block suffix used in the `blocks` property array
 * @param {string} create The block suffix used in the `createBlock` function
 * @returns {Object}
 */
function transformBlock(trigger, create = null) {
  return {
    type: 'block',
    blocks: [ `nh3/archive-${trigger}` ],
    transform: ({ hash }) => {
      console.log(hash);
      return createBlock(`nh3/archive-${create ? create : trigger}`, { hash })
    }
  }
}
