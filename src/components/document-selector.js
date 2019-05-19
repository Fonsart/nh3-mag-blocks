import { TextControl } from "@wordpress/components";
import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import capitalize from 'lodash.capitalize';
import { ENV } from '../env';
import { ENTRY_PATH, fetchEntryByHash, fetchEntryByMediaId } from "../service/entries";
import { parseUrl } from "../utils/link-management";
import { fromUrl, print } from "../utils/misc";
import { Alert } from "./alert";
import { Spinner } from "./spinner";

/**
 * This component displays a text input that expect an NH3 entry URL.
 * If the given URL does match an existing document, this document is displayed,
 * and two new text input appears, one for the caption, the other for the credit.
 */
export class DocumentSelector extends Component {

  /**
   * Creates a new component with the given properties.
   * @param {Object} props Component's properties
   * @param {string} props.className Additionnal classes that will be applied to the root div element
   * @param {string} props.type The type of document to select (see ..models/resources.js)
   * @param {Function} props.processor A callback to which is given an API entry object. Should return a mapped object
   * @param {Object} props.document An object with initial document values
   * @param {string} [props.document.hash] An API entry hash
   * @param {string} [props.document.platform] A platform slug (see the environment json file)
   * @param {Function} props.setDocumentState A callback to which is given the document state
   * @param {Function} props.onError A callback that is called when the component is in an error state.
   */
  constructor({ className, type, processor, document, setDocumentState, onError }) {
    super({ className, type, processor, document, setDocumentState, onError });

    this.state = {
      documentUrl: this.constructUrl(),
      fileUrl: null,
      loading: null,
      error: null
    };

    this.init();
    print(this);
  }

  /**
   * When receiving props, try and update the document URL.
   * @param {Object} newProps The received props
   * @param {Object} newProps.document The document data
   */
  componentWillReceiveProps({ document }) {
    document && this.setState({
      documentUrl: this.constructUrl(document.platform, document.hash)
    });
  }

  /**
   * If an id and platform properties exist in the document prop,
   * fetch the corresponding media entry on the platform API and update the relevant data.
   */
  async init() {
    if (this.props.document.id && this.props.document.platform) {
      this.isLoading();
      const entry = await fetchEntryByMediaId(this.props.document.id, this.props.document.platform, this.props.type);
      const mappedEntry = this.props.processor(entry);
      this.setState({
        documentUrl: this.constructUrl(this.props.document.platform, entry.hash_id),
        fileUrl: mappedEntry.fileUrl,
      });
      this.props.setDocumentState(mappedEntry);
      this.hasLoaded();
    }
  }

  /**
   * When the document URL is updated, validate this URL against the platforms URLs.
   * Set the component in an "error" state if the URL is not valid,
   * otherwise, fecth the URL from the platform and display it.
   * @param {string} documentUrl The new document URL
   */
  async onUrlChange(documentUrl) {
    this.setState({ documentUrl });
    const validation = this.validateUrl(documentUrl);

    if (validation.error) {
      this.isErrored(validation.error);
    } else {
      this.isFixed()
      this.isLoading();

      const hash = fromUrl(documentUrl);
      const entry = await fetchEntryByHash(hash, validation.platform, this.props.type);

      if (!entry) {
        this.isErrored(__('No existing %s document for this URL').replace('%s', this.props.type));
      } else {
        const mappedEntry = this.props.processor(entry);
        this.setState({ fileUrl: mappedEntry.fileUrl });
        this.props.setDocumentState({
          hash,
          platform: validation.platform,
          ...mappedEntry
        });
      }
      this.hasLoaded();
    }
  }

  /**
   * Construct the adequate document URL using the given platform and hash value.
   * The platform URL is retrieved from the ENV file.
   * If either the platform or the hash is not provided, use the value in the document prop, if any.
   * @param {string} platform A platform slug (see the environment json file)
   * @param {string} hash The document hash
   */
  constructUrl(platform = null, hash = null) {
    platform = platform || this.props.document.platform;
    hash = hash || this.props.document.hash;
    if (hash && platform) {
      return `${ENV.config[ platform ].siteUrl}${ENTRY_PATH}/${hash}`;
    }
  }

  /**
   * Validate the given URL and return either an object with `hash` and `platform` properties,
   * or an `error` property, if the URL is invalid.
   * @param {string} url The URL
   * @return {Object}
   */
  validateUrl(url) {
    if (!url) {
      return { error: __('Empty URL') };
    }
    const urlProps = parseUrl(url);
    // `type` is only present if the URL has been successfully parsed
    if (!urlProps.type) {
      return { error: __('Invalid URL') };
    }
    return urlProps;
  }

  /**
   * Set the component in an error state, and call the `onError` prop.
   * @param {string} msg The error message
   */
  isErrored(msg) {
    this.setState({
      error: msg,
      documentUrl: null
    });
    this.props.onError();
  }

  /**
   * Set the component in a fixed state
   */
  isFixed() { this.setState({ error: undefined }); }

  /**
   * Set the component in a loading state
   */
  isLoading() { this.setState({ loading: true }); }

  /**
   * Release the component from its loading state
   */
  hasLoaded() { this.setState({ loading: false }); }

  /**
   * Render the component
   */
  render() {
    return (
      <div class={`nh3-mag-blocks-document-selector ${this.props.className || ''}`}>
        {/* TextControl */}
        <TextControl
          className={`nh3-mag-blocks-document-selector-url-input ${this.state.error ? 'errored' : ''}`}
          label={__('%s Entry URL').replace('%s', capitalize(this.props.type))}
          placeholder={__('https://[platform-url]/entries/[id]')}
          value={this.state.documentUrl}
          onChange={value => this.onUrlChange(value)}
        />
        {/* Spinner */}
        {this.state.loading && <Spinner classes={this.props.type} />}
        {/* Alert */}
        {this.state.error && <Alert content={this.state.error} />}
        {/* Display the document */}
        {!this.state.loading && this.props.children}
      </div>
    );
  }

}
