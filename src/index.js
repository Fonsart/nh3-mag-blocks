import blockArchiveImage from './blocks/archive-image';

// Required components
const { registerBlockType } = wp.blocks;

const NAMESPACE = 'nh3';

[
  { name: 'archive-image', definition: blockArchiveImage }
].forEach(block => {
  registerBlockType(`${NAMESPACE}/${block.name}`, block.definition);
});
