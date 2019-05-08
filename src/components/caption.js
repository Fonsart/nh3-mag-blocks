const { __ } = wp.i18n;
const { TextControl } = wp.components;

export function Caption({ onChange, value, type = 'document' }) {
  const placeholder = __(`Write a caption for this ${type}`);
  return (
    <TextControl class="nh3-mag-archive-blocks-caption" {...{ onChange, placeholder, value }} />
  )
}
