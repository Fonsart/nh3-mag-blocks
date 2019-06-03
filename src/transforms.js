/**
 * Exports the transforms function/objects used in the register blocks
 * @see {@link .blocks/audio-document.js}
 * @see {@link .blocks/video-document.js}
 * @see {@link .blocks/photo-document.js}
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Object that can be used in a block registrration to indicate that it can be transformed to a `video-document` block
 */
export const toVideo = transformBlock('video');
/**
 * Object that can be used in a block registrration to indicate that it can be transformed to a `video-document` block
 */
export const toPhoto = transformBlock('photo');
/**
 * Object that can be used in a block registrration to indicate that it can be transformed to a `video-document` block
 */
export const toAudio = transformBlock('audio');

/**
 * Factory that generates a transform object indicating to which `block` the `video-document` block could transform.
 * @param {string} block The prefix of the target document block
 * @returns {Object}
 */
export function fromVideoTo(block) {
  return transformBlock('video', block);
}

/**
 * Factory that generates a transform object indicating to which `block` the `audio-document` block could transform.
 * @param {string} block The prefix of the target document block
 * @returns {Object}
 */
export function fromAudioTo(block) {
  return transformBlock('audio', block);
}

/**
 * Factory that generates a transform object indicating to which `block` the `photo-document` block could transform.
 * @param {string} block The prefix of the target document block
 * @returns {Object}
 */
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
    blocks: [ `nh3/${trigger}-document` ],
    transform: ({ hash }) => {
      return createBlock(`nh3/${create ? create : trigger}-document`, { hash })
    }
  }
}
