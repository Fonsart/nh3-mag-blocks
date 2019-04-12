

function edit({ className, attributes, setAttributes }) {
  console.log('Triggering Edit method', attributes);

  const documentUrl = attributes.hash ? `${BASE_URL}/${attributes.hash}` : null

  validateUrl(url) {
    return true;
  }


  function onChangeId(content) {
    setAttributes({ id: content })
  }

  function onChangePath(content) {
    setAttributes({ path: content })
  }

  async function onChangeDocumentUrl(newUrl) {
    if (!this.validateUrl(newUrl)) {
      setAttributes({ errorMessage: "Invalid URL" });
    } else {
      const hash = newUrl.split('/').pop();
      setAttributes({
        errorMessage: null,
        documentUrl: newUrl,
        hash
      });
      getEntry(hash)
        .then(entry => console.log(entry.data[ 0 ].media))
        .catch(error => console.log(error))
    }
  }

  return (
    <div id="block-dynamic-box"> {/* You have to have a wrapper tag when your markup has more than 1 tag */}
      {attributes.errorMessage && <p class="nh3-mag-archive-image-error-message">{attributes.errorMessage}</p>}
      <TextControl
        label={__('Input a complete ourHistory document page URL')}
        value={documentUrl}
        placeholder={`${BASE_URL}/[${__('hash_value')}]`}
        onChange={onChangeDocumentUrl}
      />
      {/* <PlainText
        className={className} // Automatic class: gutenberg-blocks-sample-block-editable
        onChange={onChangeUrl} // onChange event callback
        value={documentUrl} // Binding
        placeholder="Coller l'URL de la page contenant l'image à intégrer"
      /> */}
    </div>
  )
