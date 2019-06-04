# NH3 Mag - Archive Image Block

This plugin extends and tailors the WordPress Gutenberg editor to the needs of the NH3 Mag site.

# Installation

To install this plugin, download the latest [release], and uncompress it in your `wp-content/plugins` folder (or use the **Plugins > Add New** menu entry and click on the **Upload Plugin** button).

Then, go to your WordPress admin and navigate to **Plugins > Installed Plugins** and activate the **NH3 Mag - Blocks** plugin.

# Updates

## Manual update

To manually update the plugin, you'll need to download the new [release], uncompress it somwhere, and replace all the files in your `wp-content/plugins/nh3-mag-blocks` folder by the one contained in the compressed downloaded file.

## Automatic update

To automatically push the new updates on the server, configure a webhook on the `push` events. Then, on your server, detect changes on the `master` branch and execute a script that moves the required files in the `wp-content/wp-plugins/nh3-mag-blocks` folder.

> You'll find a list of the required files blobs in the [gulpfile]

# What does it do ?

When installed and activated, this plugin do the following:

* Adds three new "document" blocks (photo, audio and video), that allows editors to "embed" NH3 documents directly from the platforms in their posts, so they don't have to upload it on the WordPress site
* Add a new blocks "On the topic" to add related NH3 links at the end of a post
  * Two new sub-blocks, to help structure those related links
* Heavily limit the allowed blocks in a post (see [Allowed Blocks](#allowed-blocks))
* Completely replace the "Featured image" document settings so that editors can only use embed NH3 photo document as featured image (instead of uploaded photo file)
* Limit the actions available on some of the core blocks, to avoid messing up with the theme rendering

# Usage

> Documentaiton on how to use some of this plugins's features can be found on the [NH3 Mag - User Guide][guide] site.

* Photo, Audio and Video document blocks : https://fonsart.github.io/nh3-mag-user-guide/blocks/integration/
* On Topic block : https://fonsart.github.io/nh3-mag-user-guide/blocks/on-topic/
* Featured Image setting : https://fonsart.github.io/nh3-mag-user-guide/posts/new-post/#ajouter-une-image-mise-en-avant

## Allowed Blocks

Activating this plugin will limit the number of available blocks in the editor.

Here's the list of all available blocks _(see [the code][whitelist])_

* Code blocks
  * `core/paragraph`
  * `core/heading`
  * `core/list`
  * `core/quote`
* NH3 Blocks
  * `nh3/photo-document`
  * `nh3/video-document`
  * `nh3/audio-document`
  * `nh3/on-topic-section`
  * `nh3/on-topic-nh3-links`
  * `nh3/on-topic-ssr-links`

Additionaly, the core blocks have been tweeked so that some of their actions are not available anymore.

> All those limitation are done using [some CSS][css-hack] to hide the buttons from the UI.
>
> This is unfortunately the only way to do this, since it's not possible to alter the behavior of core paragraphs without replacing them with a custom block

* `core/paragraph` and `core/quote`
  * Removed the toolbar for bold/italic/strike actions
  * Removed the toolbar for the alignment and tabulation actions
* `core/heading`
  * Removed the toolbar for bold/italic/strike actions
* `core/paragraph` actually provides two blocks: the classic paragraph and an "inline image" block. This one has been hidden from the block selector (using CSS) since it's not supported by the NH3 Mag Theme.

# Development

## Requirements

* PHP >=7.1.X
* Node >= 10.X.X along with NPM
* [Composer] installed and in the PATH
* A local instance of WordPress >= 5.1.X

## Setup

* Clone this repository on your local machine using `git clone`
  > We suggest cloning this repo directly in your WordPress instance's `wp-content/wp-plugins` directory
* In the freshly cloned directory, install the dependencies with:
  ```
  $> npm install
  $> composer install
  ```
* Start the development script with:
  ```
  $> npm start
  ```

## Environment file

To be able to build the plugin in different environment, you'll need to create an environment file for each of them.

To do so, head to `./src/env/` folder, and make a copy of the `sample.json` file for each environment, and rename them with the environment name.

There's two environment already supported by the build scripts: `development` and `production`. Thus, you'll need at least a `development.json` and `production.json` files.

Once the filed are created, open them and replace the value with your own.

The environment file describes an object, whose properties are named according to a language slug (`fr`, `it` and `rm` for French, Italian and Rumansch respectively) and whose values are objects containing each platform configuration. All these configuration object have the same properties:

* `siteUrl` - The URL pointing to the platform site ; without the trailing slash (so, `site.com` instead of `site.com/`).
* `proxyUrl` - **Remove this property in a production environment file!** The URL pointing to the proxy for this platform site ; without the trailing slash (so, `localhost:123` instead of `localhost:123/`).
* `apiPath` - The path added to the `siteUrl` that points to the API entrypoint ; MUST start with a leading slash (so `/api/v1` instead of `api/v1`).
* `apiToken` - A token that grants at least reading rights for this platform API.

> To support a new NH platform, simply add a new property with the language slug (for example `de`), whose value is an object as describe above.

## Platform URLs

The platform URLs are defined in several places, meaning that changing an URL somewhere implies changing this URL everywhere it's used.

You'll find those URLs in:
* ENV files ; as the `siteUrl` property of each platform
* `bootstrap.php` file ; in the `NH3_BLOCKS_SITE_URLS` that is used to generate the link to an NH document when rendering it on its template
* `package.json` file ; in the `proxy:xx` scripts as the proxied URL for a platform

### Proxy

To use a proxy for the platform URLs, you'll need to add a `proxyUrl` property for each platform in the development environment file.

Do not remove the `siteUrl` though, as it is used to validate the URls pasted in the document and links blocks.

If a `proxyUrl` is present in the ENV, it will be used instead of the `siteUrl` when fetching the document or links.

> The `npm start` script already generates proxies for the three default platform. Check the proxy URLs in the [package.json](./package.json#L12) file.

## Scripts

The repo provides you with several scripts:

### NPM Scripts

| Script                  | Description                                                                                                                                                                    |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm start`             | Starts the `wp-scripts` dev script, the platform proxies, compile the CSS, the POT file, opens the site in the browser, and wait for changes to rebuild and reload the browser |
| `npm run dist`          | Builds the JS, CSS and POT and zip the plugin                                                                                                                                  |
| `npm run build`         | Builds the JS with the `wp-scripts` build script, the CSS and the POT                                                                                                          |
| `npm run proxy`         | Starts the three proxies                                                                                                                                                       |
| `npm run proxy:fr`      | Starts a proxy on `localhost:666` that proxies request on the `notrehistoire.ch` platform                                                                                      |
| `npm run proxy:it`      | Starts a proxy on `localhost:667` that proxies request on the `lanostrastoria.ch` platform                                                                                     |
| `npm run proxy:rm`      | Starts a proxy on `localhost:666` that proxies request on the `nossaistorgia.ch` platform                                                                                      |
| `npm run version:major` | Update the plugin version number using `composer release major`, the run the `npm run dist` task                                                                               |
| `npm run version:minor` | Update the plugin version number using `composer release minor`, the run the `npm run dist` task                                                                               |
| `npm run version:patch` | Update the plugin version number using `composer release patch`, the run the `npm run dist` task                                                                               |

### Composer Scripts

| Script                    | Description                                                                                                                                                                  |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `composer lint`           | Runs the PHP linter with the WordPress guidelines                                                                                                                            |
| `composer lint:fix`       | Runs the PHP linter and fixes all fixable errors                                                                                                                             |
| `composer release <type>` | Update the version number depending on the `type` param (`major`, `minor` or `patch`), regenerate the plugin header file, commit all changes, create a tag and push all that |
| `composer plugin-header`  | Regenerates the plugin header file, based on the value in the `package.json` file                                                                                            |

[guide]: https://fonsart.github.io/nh3-mag-user-guide
[gulpfile]: ./gulpfile.js#L13
[release]: https://github.com/Fonsart/nh3-mag-blocks/releases
[whitelist]: ./classes/class-nh3-blocks-plugin.php#L133
[css-hack]: ./src/css/general.scss#L24
[composer]: https://getcomposer.org
