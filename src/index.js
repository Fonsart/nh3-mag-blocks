import blockArchiveImage from './blocks/archive-photo';

// Required components
const { registerBlockType } = wp.blocks;

const NAMESPACE = 'nh3';

[
  { name: 'archive-photo', definition: blockArchiveImage }
].forEach(block => {
  registerBlockType(`${NAMESPACE}/${block.name}`, block.definition);
});
