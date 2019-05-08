import blockArchiveImage from './blocks/archive-photo';
import blockArchiveAudio from './blocks/archive-audio';
import blockArchiveVideo from './blocks/archive-video';

// Required components
const { registerBlockType } = wp.blocks;

const NAMESPACE = 'nh3';

[
  { name: 'archive-photo', definition: blockArchiveImage },
  { name: 'archive-audio', definition: blockArchiveAudio },
  { name: 'archive-video', definition: blockArchiveVideo },
].forEach(block => {
  registerBlockType(`${NAMESPACE}/${block.name}`, block.definition);
});
