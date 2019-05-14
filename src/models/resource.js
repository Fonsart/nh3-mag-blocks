/**
 * Class that represents the content of an "On the same topic" link.
 * Those objects are used in the LinkCard component
 */
export class Resource {

  /**
   * Creates a new Resource object.
   * @param {string} title The resource title
   * @param {string} cover The resource cover's URL
   * @param {Object} user The user that published the resource
   * @param {string} user.avater_url The user's avatar URL
   * @param {string} user.name The user's complete name
   * @param {string} user.username The user's username (will only be used if no user.name exists)
   * @param {string} type The resource's type
   * @returns {Resrouce}
   */
  constructor(title, cover, { avatar_url, name, username }, type) {
    this.type = type;
    this.title = title || __('Untitled');
    this.cover = cover || "https://via.placeholder.com/360";
    this.user = {
      avatar: avatar_url || "https://via.placeholder.com/36",
      name: name || username
    };
  }

}
